import "./message.css";
export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            className="messageImg"
            alt="user"
            loading="lazy"
            src={"/assets/noAvatar.png"}
          />
        )}
        <p className="messageText">Hello this is message</p>
      </div>

      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
