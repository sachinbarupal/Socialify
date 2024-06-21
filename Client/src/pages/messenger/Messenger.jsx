import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../chatOnline/ChatOnline";
export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              className="chatMenuInput"
              placeholder="Search for Friends..."
            />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {/* <Message /> */}
              <Message />
              <Message own />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write a Message..."
              />
              <button className="chatSubmitBtn">Send</button>
            </div>
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
      ;
    </>
  );
}
