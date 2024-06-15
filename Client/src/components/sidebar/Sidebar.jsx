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
import getConfig from "../../config";
import { Skeleton } from "@mui/material";
const { SERVER_URI } = getConfig();
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAll = async () => {
      const users = await axios.get(`${SERVER_URI}/api/users/all`, {
        params: { _id: user._id },
      });
      setUsers(users.data);
      setIsLoading(false);
    };
    setIsLoading(true);
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
          {isLoading ? (
            <div>
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
            </div>
          ) : (
            users
              .slice(0, visibleUsers)
              .map((user) => <Friend key={user._id} friend={user} />)
          )}
        </ul>
        {visibleUsers < users.length && (
          <button
            style={{ cursor: "pointer" }}
            className="sidebarButton"
            onClick={() => setVisibleUsers(visibleUsers + 5)}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export function Friend({ friend }) {
  const PF = `${SERVER_URI}/Images/`;
  return (
    <li className="sidebarFriend">
      <Link
        style={{ textDecoration: "none" }}
        to={"/profile/" + friend.username}
      >
        <img
          className="sidebarFriendImg"
          loading="lazy"
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
