import "./conversation.css";
export default function Conversation() {
  return (
    <div className="conversation">
      <img
        className="chatUserImage"
        src="/assets/noAvatar.png"
        alt="user"
        loading="lazy"
      />
      <span className="chatUsername">Sachin</span>
    </div>
  );
}
