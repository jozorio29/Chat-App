export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Roberto Perez",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Juan Perez",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "Roberto Perez",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    _id: "2",
    name: "Juan Perez",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
];

export const sampleNotifications = [
  {
    _id: "1",
    sender: {
      name: "Roberto Perez",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    },
  },
  {
    _id: "2",
    sender: {
      name: "Juan Perez",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    },
  },
];

export const sampleMessages = [
  {
    attachments: [],
    content: "L*uda ka Message hai",
    _id: "sfnsdjkfsdnfkjsbnd",
    sender: {
      _id: "user._id",
      name: "Chaman ",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: " L*uda 2 ka Message hai",
    _id: "sfnsdjkfsdnfkdddjsbnd",
    sender: {
      _id: "dfasfgfasd",
      name: "Chaman  2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "Roberto Perez",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "roberto_perez",
      friends: 20,
      groups: 10,
    },
    {
      name: "Juan Perez",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "juan_perez",
      friends: 40,
      groups: 60,
    },
  ],
  chats: [
    {
      name: "Paddel Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Roberto Perez",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Kitchen Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Juan Perez",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: " L*uda 2 ka Message hai",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman  2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};
