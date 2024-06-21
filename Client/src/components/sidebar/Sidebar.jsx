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
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import getConfig from "../../config";
import { Skeleton } from "@mui/material";
const { SERVER_URI } = getConfig();

const ListItem = memo(function ({ Icon, name }) {
  return (
    <li className="sidebarListItem">
      <Icon className="sidebarIcon" />
      <span className="sidebarListItemText">{name}</span>
    </li>
  );
});

const Sidebar = memo(() => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const users = await axios.get(`${SERVER_URI}/api/users/all`, {
        headers: {
          Authorization: token,
        },
      });
      setUsers(users.data);
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchAll();
  }, [token]);

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
          {icons.map(({ Icon, name }, index) => (
            <ListItem key={index} Icon={Icon} name={name} />
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
});

export default Sidebar;

const Friend = memo(({ friend }) => {
  const { profilePicture, username } = friend;
  return (
    <li className="sidebarFriend">
      <Link style={{ textDecoration: "none" }} to={"/profile/" + username}>
        <img
          className="sidebarFriendImg"
          loading="lazy"
          src={profilePicture}
          alt="friend"
        />
      </Link>
      <span className="sidebarFriendName">{username}</span>
    </li>
  );
});
