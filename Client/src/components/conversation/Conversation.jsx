import { useEffect, useState } from "react";
import "./conversation.css";
const Conversation = ({ socket, current, conversation }) => {
  const [pending, setPending] = useState(0);
  useEffect(() => {
    const handleGetMessage = (data) => {
      // console.log(conversation);
      if (data.sender === conversation._id && current !== conversation._id) {
        // console.log("isi ne bheja", conversation);
        setPending((pending) => pending + 1);
      }
    };
    if (current === conversation._id) setPending(0);

    socket.current.on("getMessage", handleGetMessage);

    // Clean up the effect when the component unmounts or when chat.user._id changes
    return () => {
      socket.current.off("getMessage", handleGetMessage);
    };
  }, [socket, conversation, current]);
  // console.log("render");

  return (
    <div
      className={
        current === conversation._id ? "conversation current" : "conversation"
      }
      style={{ position: "relative" }}
    >
      <img
        className="chatUserImage"
        src={conversation.profilePicture}
        alt="user"
        loading="lazy"
      />
      {pending !== 0 && (
        <span
          className="topBarIconBadge"
          style={{ zIndex: 100, padding: "5px" }}
        >
          {pending}
        </span>
      )}
      <span className="chatUsername">{conversation.username}</span>
    </div>
  );
};
export default Conversation;
