import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = `${SERVER_URI}/Images/`;
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Prevent the default link behavior
      window.location.reload(); // Reload the page
    }
  };
  return (
    // NAV BAR
    <div className="topbarContainer">
      {/*LEFT  */}
      <div className="topbarLeft">
        {/* LOGO */}
        <Link to="/" onClick={handleClick} style={{ textDecoration: "none" }}>
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
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="profile"
            className="topBarImg"
          />
        </Link>
      </div>
    </div>
  );
}
