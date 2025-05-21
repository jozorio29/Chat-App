import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { useTheme } from "@mui/material/styles";

function Home() {
  const theme = useTheme();

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor={theme.palette.background.default}
    >
      <ChatBubbleOutlineIcon
        sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }}
      />
      <Typography
        variant="h6"
        color="text.secondary"
        textAlign="center"
        px={3}
      >
        Start a conversation by selecting a friend
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);