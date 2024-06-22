import "./chatOnline.css";
export default function ChatOnline({ user }) {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={user.profilePicture}
            alt="user"
            loading="lazy"
          />
          <div className="chatOnlineBadge"></div>
        </div>

        <span className="chatOnlineName">{user.username}</span>
      </div>
    </div>
  );
}
