import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.word(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < users.length; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        // Ensure the same user is not added twice
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.word(1),
        members,
        creator: members[0],
      });
      chatsPromise.push(chat);
    }
    await Promise.all(chatsPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagesPromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const message = Message.create({
        sender: randomUser,
        chat: randomChat,
        content: faker.lorem.sentence(),
      });
      messagesPromise.push(message);
    }
    await Promise.all(messagesPromise);
    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createMessagesInChats = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagesPromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      messagesPromise.push(
        Message.create({
          sender: randomUser,
          chat: chatId,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagesPromise);
    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export {
  createGroupChats,
  createMessages,
  createMessagesInChats,
  createSingleChats,
};
