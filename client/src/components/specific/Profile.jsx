import CalendarIcon from "@mui/icons-material/CalendarMonth";
import FaceIcon from "@mui/icons-material/Face";
import UserNameIcon from "@mui/icons-material/Person";
import { Avatar, Paper, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  const theme = useTheme();

  return (
    <Stack
      spacing={3}
      direction="column"
      alignItems="center"
      sx={{
        padding: "2rem 1rem",
        backgroundColor:
          theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
        borderRadius: "1.5rem",
        boxShadow: theme.shadows[3],
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 160,
          height: 160,
          objectFit: "cover",
          border: "4px solid #fff",
          boxShadow: "0 0 12px rgba(0,0,0,0.15)",
        }}
      />

      <ProfileCard heading="About" text={user?.bio} />
      <ProfileCard heading="Username" text={user?.username} Icon={<UserNameIcon />} />
      <ProfileCard heading="Name" text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading="Joined"
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        padding: "1rem",
        borderRadius: "1rem",
        bgcolor: theme.palette.mode === "dark" ? "#2b2b2b" : "#ffffff",
      }}
    >
      {Icon && (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 36,
            height: 36,
          }}
        >
          {Icon}
        </Avatar>
      )}

      <Stack>
        <Typography variant="body1" fontWeight={500}>
          {text || "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {heading}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Profile;