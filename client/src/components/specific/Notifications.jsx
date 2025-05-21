import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const fiendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={fiendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}> 0 notifications </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
        >
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#f44336",
              borderRadius: "0.75rem",
              padding: "0.35rem 1rem",
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#2196f3",
              borderRadius: "0.75rem",
              padding: "0.35rem 1rem",
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
