import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt="profile"
          className="topBarImg"
        />
      </div>
    </div>
  );
}
