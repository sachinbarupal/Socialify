import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    // NAV BAR
    <div className="topbarContainer">
      {/*LEFT  */}
      <div className="topbarLeft">
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socialify</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="topbarCenter">
        {/* SEARCH  */}
        <div className="searchBarDiv">
          <Search className="searchIcon" />
          <input className="searchInput" placeholder="Search" />
        </div>
      </div>

      {/* RIGHT  */}
      <div className="topbarRight">
        {/* LINKS */}
        <div className="topBarLinks">
          <span className="topBarLink">HomePage</span>
          <span className="topBarLink">TimeLine</span>
        </div>

        {/* ICONS */}
        <div className="topBarIcons">
          {/* PERSON */}
          <div className="topBarIcon">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          {/* CHAT */}
          <div className="topBarIcon">
            <Chat />
            <span className="topBarIconBadge">2</span>
          </div>
          {/* NOTIFICATION */}
          <div className="topBarIcon">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>

        {/* PROFILE PIC */}
        <img src="/assets/person/1.jpeg" alt="profile" className="topBarImg" />
      </div>
    </div>
  );
}
