const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

let sockets = [];

const addUser = (user, socketId) => {
  if (!sockets.some((socket) => socket.user._id === user._id)) {
    sockets.push({ user, socketId });
  }
};
const removeUser = (socketId) => {
  sockets = sockets.filter((socket) => socket.socketId !== socketId);
};

const getUser = (userId) => {
  return sockets.find((socket) => socket.user._id === userId);
};

io.on("connection", (socket) => {
  // console.log("A User Connected !!");
  //   io.emit("welcome", "Hello Bro");.
  // Take SocketId and userIDs
  socket.on("addUser", (user) => {
    addUser(user, socket.id);
    io.emit("onlineUsers", sockets);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, createdAt, _id }) => {
    // console.log(receiverId);
    const receiver = getUser(receiverId);
    // console.log(receiver);

    if (receiver)
      io.to(receiver.socketId).emit("getMessage", {
        sender: senderId,
        text,
        createdAt,
        _id,
      });
  });

  socket.on("disconnect", () => {
    // console.log("A User Disconnected");
    removeUser(socket.id);
    io.emit("onlineUsers", sockets);
  });
});
