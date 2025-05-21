import { Menu, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { LogoutRounded, DeleteOutlineRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hooks";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { useEffect } from "react";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving group...", selectedDeleteChat.chatId);
  };

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      elevation={3}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          padding: "0.75rem 1rem",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#f0f2f5",
          },
        }}
        spacing={1}
        alignItems="center"
        direction="row"
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <LogoutRounded />{" "}
            <Typography variant="body2" color="text.secondary">
              Leave group
            </Typography>
          </>
        ) : (
          <>
            <DeleteOutlineRounded /> <Typography>Delete chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
