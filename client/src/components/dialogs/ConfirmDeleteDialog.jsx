import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#f44336",
            borderRadius: "1rem",
            padding: "0.5rem 1.25rem",
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#2196f3",
            borderRadius: "1rem",
            padding: "0.5rem 1.25rem",
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          onClick={deleteHandler}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
