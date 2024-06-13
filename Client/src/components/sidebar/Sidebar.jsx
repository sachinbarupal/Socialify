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
import "./sidebar.css";
import { Users } from "../../DummyData";
export function ListItem({ Icon, name }) {
  return (
    <li className="sidebarListItem">
      <Icon className="sidebarIcon" />
      <span className="sidebarListItemText">{name}</span>
    </li>
  );
}
export default function Sidebar() {
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
          {Users.map((user) => (
            <Friend key={user.id} friend={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Friend({ friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={PF + friend.profilePicture}
        alt="friendProfilePic"
      />
      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
}
