import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack alignItems="center" spacing={4} textAlign="center">
        <ErrorIcon sx={{ fontSize: 120, color: "error.main" }} />
        <Typography variant="h2" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Sorry, the page you’re looking for doesn’t exist.
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            ← Go back home
          </Typography>
        </Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
