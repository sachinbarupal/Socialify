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
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="assets/person/2.jpeg"
              alt=""
            />
            <span className="sidebarFriendName">John Doe</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="assets/person/2.jpeg"
              alt=""
            />
            <span className="sidebarFriendName">John Doe</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="assets/person/2.jpeg"
              alt=""
            />
            <span className="sidebarFriendName">John Doe</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="assets/person/2.jpeg"
              alt=""
            />
            <span className="sidebarFriendName">John Doe</span>
          </li>
          <li className="sidebarFriend">
            <img
              className="sidebarFriendImg"
              src="assets/person/2.jpeg"
              alt=""
            />
            <span className="sidebarFriendName">John Doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
