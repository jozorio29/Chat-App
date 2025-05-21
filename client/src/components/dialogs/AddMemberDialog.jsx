import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isAddMember } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useAvailableFriendsQuery(chatId);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding members...", {
      chatId,
      members: selectedMembers,
    });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  console.log(data);

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
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
            onClick={closeHandler}
          >
            Cancel
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
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
