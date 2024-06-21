import "./chatOnline.css";
export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="/assets/noAvatar.png"
            alt="user"
            loading="lazy"
          />
          <div className="chatOnlineBadge"></div>
        </div>

        <span className="chatOnlineName">Sachin</span>
      </div>
    </div>
  );
}
