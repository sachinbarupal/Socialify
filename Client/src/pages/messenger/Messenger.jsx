import "./messenger.css";
import { io } from "socket.io-client";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import getConfig from "../../config";
import Chat from "../../components/chat/Chat";
const { SERVER_URI, SOCKET_URI } = getConfig();
export default function Messenger() {
  const { user, token } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(SOCKET_URI);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", {
      _id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
    });
    socket.current.on("onlineUsers", (sockets) => {
      // console.log(sockets.filter((socket) => socket.user._id !== user._id));
      setOnlineUsers(sockets.filter((socket) => socket.user._id !== user._id));
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${SERVER_URI}/api/conversation/`, {
          headers: { Authorization: token },
        });
        setConversations(res.data);
      } catch (err) {
        console.log("Error in Fetching Conversations", err);
      }
    };

    getConversations();
  }, [token]);

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
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation.user} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <Chat socket={socket} chat={currentChat} />
            ) : (
              <span className="noConversationText">
                Open a conversation to start chat ....
              </span>
            )}
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {onlineUsers.map((socket) => (
              <ChatOnline key={socket.user._id} user={socket.user} />
            ))}
            {/* <ChatOnline /> */}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
