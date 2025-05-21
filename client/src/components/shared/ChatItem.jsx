import { Badge, Box, Stack, styled, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const theme = useTheme();

  return (
    <Link
      sx={{ padding: 0, textDecoration: "none" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          borderRadius: "1rem",
          transition: "all 0.2s ease",
          backgroundColor: sameSender
            ? theme.palette.mode === "dark"
              ? "#333"
              : "#e3f2fd"
            : "transparent",
          color: sameSender ? theme.palette.text.primary : "inherit",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
          },
        }}
      >
        {isOnline ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <AvatarCard avatar={avatar} />
          </StyledBadge>
        ) : (
          <AvatarCard avatar={avatar} />
        )}

        <Stack width="100%" spacing={0.5}>
          <Typography fontWeight={500} fontSize="1rem" noWrap>
            {name}
          </Typography>

          {newMessageAlert?.count > 0 && (
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 && "s"}
            </Typography>
          )}
        </Stack>
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
