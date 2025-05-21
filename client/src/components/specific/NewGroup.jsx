import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, error, isLoading, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Select at least one member");

    newGroup("Creating new group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant="h5">
          New group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            size="large"
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
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            size="large"
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
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
