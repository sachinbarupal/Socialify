import { memo } from "react";
import "./conversation.css";
const Conversation = memo(({ conversation }) => {
  return (
    <div className="conversation">
      <img
        className="chatUserImage"
        src={conversation.profilePicture}
        alt="user"
        loading="lazy"
      />
      <span className="chatUsername">{conversation.username}</span>
    </div>
  );
});
export default Conversation;
