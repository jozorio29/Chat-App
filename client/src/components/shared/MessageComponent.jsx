import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: "-20%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#DCF8C6" : "#FFFFFF",
        color: "#111",
        borderRadius: "12px",
        padding: "0.75rem 1rem",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        maxWidth: "70%",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"bold"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index} sx={{ position: "relative", "&:hover .actions": { display: "block" } }}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      {/* Attachment */}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
