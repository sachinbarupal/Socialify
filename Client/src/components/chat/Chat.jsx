import "./chat.css";
import Message from "../message/Message";
import axios from "axios";
import getConfig from "../../config";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
const { SERVER_URI } = getConfig();
export default function Chat({ chat, socket }) {
  // console.log(chat.user)
  const [messages, setMessages] = useState([]);
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const newMessage = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`${SERVER_URI}/api/message/${chat._id}`, {
        headers: { Authorization: token },
      });
      setMessages(res.data);
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchMessages();
  }, [token, chat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleGetMessage = (data) => {
      // console.log("Message Aaya", data);
      if (data.sender === chat._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.current.on("getMessage", handleGetMessage);

    // Clean up the effect when the component unmounts or when chat.user._id changes
    return () => {
      socket.current.off("getMessage", handleGetMessage);
    };
  }, [chat, socket]);

  const handleMessage = async () => {
    try {
      if (newMessage.current.value === "") return alert("Type Some Message");

      const res = await axios.post(
        `${SERVER_URI}/api/message/create/${chat._id}`,
        {
          text: newMessage.current.value,
          conversationId: chat._id,
        },
        { headers: { Authorization: token } }
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: chat._id,
        text: newMessage.current.value,
        createdAt: res.data.createdAt,
        _id: res.data._id,
      });
      setMessages([...messages, res.data]);
      newMessage.current.value = "";
    } catch (err) {
      console.log("Error in Sending Message", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="chatBoxTop">
          {messages.map((message) => (
            <div key={message._id} ref={scrollRef}>
              <Message user={chat} message={message} />
            </div>
          ))}
        </div>
      )}
      <div className="chatBoxBottom">
        <textarea
          ref={newMessage}
          className="chatMessageInput"
          placeholder="Write a Message..."
        />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <button className="chatSubmitBtn" onClick={handleMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
