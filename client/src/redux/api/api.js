import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (build) => ({
    myChats: build.query({
      query: () => ({
        url: "chat/my",
        credentials: "include", // esto es una funcion de cors
      }),
      providesTags: ["Chat"],
    }),
    searchUser: build.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: build.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: build.query({
      query: () => ({
        url: `user/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: build.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: build.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) {
          url += "?populate=true";
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: build.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),

      keepUnusedDataFor: 0,
    }),
    sendAttachments: build.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    myGroups: build.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include", // esto es una funcion de cors
      }),
      providesTags: ["Chat"],
    }),
    availableFriends: build.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) {
          url += `?chatId=${chatId}`;
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: build.mutation({
      query: ({ name, members }) => ({
        url: "chat/new",
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: build.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroupMember: build.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        body: { chatId, userId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMembers: build.mutation({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        body: { members, chatId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: build.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: build.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;
