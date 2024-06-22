import "./message.css";
import { useAuth } from "../../context/AuthContext";
import { format } from "timeago.js";
export default function Message({ message, user }) {
  const { sender, text } = message;
  // console.log(message);
  const { user: currentUser } = useAuth();
  const own = currentUser._id === sender;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            className="messageImg"
            alt="user"
            loading="lazy"
            src={user.profilePicture}
          />
        )}
        <p className="messageText">{text}</p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
