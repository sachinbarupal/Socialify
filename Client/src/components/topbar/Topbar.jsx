import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Topbar = memo(function () {
  const { user } = useAuth();

  return (
    // NAV BAR
    <div className="topbarContainer">
      {/*LEFT  */}
      <div className="topbarLeft">
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            className="logoImg"
            loading="lazy"
            src={"/assets/logo.png"}
            alt="logo"
          />
        </Link>
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
          <span className="topBarLink">Home</span>
          <span className="topBarLink">Timeline</span>
        </div>

        {/* ICONS */}
        <div className="topBarIcons">
          {/* PERSON */}
          <div className="topBarIcon">
            <Person />
            {/* <span className="topBarIconBadge">1</span> */}
          </div>
          {/* CHAT */}
          <Link
            to="/messenger"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="topBarIcon">
              <Chat />
              <span className="topBarIconBadge">2</span>
            </div>
          </Link>
          {/* NOTIFICATION */}
          <div className="topBarIcon">
            <Notifications />
            {/* <span className="topBarIconBadge">1</span> */}
          </div>
        </div>

        {/* PROFILE PIC */}
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture}
            alt="profile"
            loading="lazy"
            className="topBarImg"
          />
        </Link>
      </div>
    </div>
  );
});

export default Topbar;
