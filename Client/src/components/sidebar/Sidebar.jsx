import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export function ListItem({ Icon, name }) {
  return (
    <li className="sidebarListItem">
      <Icon className="sidebarIcon" />
      <span className="sidebarListItemText">{name}</span>
    </li>
  );
}
export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(5);
  useEffect(() => {
    const fetchAll = async () => {
      const users = await axios.get("/users/all", {
        params: { _id: user._id },
      });
      setUsers(users.data);
    };
    fetchAll();
  }, [user._id]);

  const icons = [
    { Icon: RssFeed, name: "Feed" },
    { Icon: Chat, name: "Chat" },
    { Icon: PlayCircleFilledOutlined, name: "Videos" },
    { Icon: Group, name: "Groups" },
    { Icon: Bookmark, name: "Bookmarks" },
    { Icon: HelpOutline, name: "Questions" },
    { Icon: WorkOutline, name: "Jobs" },
    { Icon: Event, name: "Events" },
    { Icon: School, name: "Courses" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {icons.map((Icon, index) => (
            <ListItem key={index} Icon={Icon.Icon} name={Icon.name} />
          ))}
        </ul>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {users.slice(0, visibleUsers).map((user) => (
            <Friend key={user._id} friend={user} />
          ))}
        </ul>
        {visibleUsers < users.length && (
          <button onClick={() => setVisibleUsers(visibleUsers + 5)}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export function Friend({ friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link
        style={{ textDecoration: "none" }}
        to={"/profile/" + friend.username}
      >
        <img
          className="sidebarFriendImg"
          src={
            friend.profilePicture
              ? PF + friend.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt="friendProfilePic"
        />
      </Link>
      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
}
