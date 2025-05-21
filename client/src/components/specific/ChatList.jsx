import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { motion } from "framer-motion"; // si querés animaciones suaves

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      spacing={1.2}
      padding={1}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
        borderRadius: "1rem",
      }}
    >
      {chats.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
          >
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default ChatList;