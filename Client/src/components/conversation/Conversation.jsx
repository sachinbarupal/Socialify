import getConfig from "../../config";
import "./conversation.css";
const { SERVER_URI } = getConfig();
export default function Conversation() {
  const PF = `${SERVER_URI}/Images/`;
  return (
    <div className="conversation">
      <img className="chatUserImage" src={PF + "person/noAvatar.png"} alt="" />
      <span className="username">Sachin</span>
    </div>
  );
}
