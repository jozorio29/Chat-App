import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import {
  deleteFilesFromCloudinary,
  emitEvent,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    members: allMembers,
    groupChat: true,
    creator: req.user,
  });
  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(201).json({
    success: true,
    message: "Group created",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
  }).populate("members", "name avatar");
  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMembers = getOtherMember(members, req.user);
    return {
      _id,
      groupChat,
      name: groupChat ? name : otherMembers.name,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMembers.avatar.url],
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });
  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");
  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));
  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to add members to this chat", 403)
    );
  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
  const allNewMembers = await Promise.all(allNewMembersPromise);
  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);
  chat.members.push(...uniqueMembers);
  if (chat.members.length > 100)
    return next(new ErrorHandler("Too many members", 400));
  await chat.save();
  const allUsersName = allNewMembers.map((i) => i.name).join(", ");
  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added in the group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    members: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to add members to this chat", 403)
    );
  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));
  const allChatMembers = chat.members.map((i) => i.toString());
  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );
  await chat.save();
  emitEvent(req, ALERT, chat.members, {
    message: `${userThatWillBeRemoved.name} has been removed from the group`,
    chatId,
  });
  emitEvent(req, REFETCH_CHATS, allChatMembers);
  return res.status(200).json({
    success: true,
    members: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));
  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomElement];
    chat.creator = newCreator;
  }
  chat.members = remainingMembers;
  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);
  emitEvent(req, ALERT, chat.members, {
    chatId,
    message: `User ${user.name} has left the group`,
  });
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    members: "Leave group successfully",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];
  if (files.length < 1)
    return next(new ErrorHandler("Please upload attachments", 400));
  if (files.length > 5)
    return next(new ErrorHandler("Files can't be more than 5", 400));
  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (files.length < 1)
    return next(new ErrorHandler("Please provide attachments", 400));
  // Upload files here
  const attachments = await uploadFilesToCloudinary(files);

  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };
  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };
  const message = await Message.create(messageForDB);
  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });
  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));
    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to rename this chat", 403)
    );
  chat.name = name;
  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  const members = chat.members;
  if (chat.groupChat && chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to delete this chat", 403)
    );
  if (!chat.groupChat && !chat.members.includes(req.user.toString()))
    // Esta línea verifica si el usuario actual es miembro del chat.
    return next(
      new ErrorHandler("You are not allowed to delete this chat", 403)
    );
  // Here we have to delete all messages as well as attachments or files from cloudinary
  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });
  const public_ids = [];
  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => public_ids.push(public_id));
  });
  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.members.includes(req.user.toString()))
    return next(
      new ErrorHandler("You are not allowed to access this chat", 403)
    );

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip)
      .lean()
      .populate("sender", "name avatar"),
    Message.countDocuments({ chat: chatId }),
  ]);
  const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;
  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
};
