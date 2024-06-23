import "./message.css";
import { useAuth } from "../../context/AuthContext";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
export default function Message({ message, user }) {
  const { sender, text } = message;
  // console.log(message);
  const { user: currentUser } = useAuth();
  const own = currentUser._id === sender;
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    return () => setShowDate(false);
  }, []);

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
        <p
          className="messageText"
          onClick={() => setShowDate((showDate) => !showDate)}
        >
          {text}
        </p>
      </div>

      {showDate && (
        <div className="messageBottom">{format(message.createdAt)}</div>
      )}
    </div>
  );
}
