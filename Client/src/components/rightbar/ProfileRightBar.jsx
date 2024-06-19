import "./rightbar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import getConfig from "../../config";
import { Skeleton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const { SERVER_URI } = getConfig();
const PF = `${SERVER_URI}/Images/`;

export default function ProfileRightBar({ user }) {
  const { user: currentUser, token, logout, followUser } = useAuth();
  const { _id, username, city, relationship } = user;

  const [newPassword, setNewPassword] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user._id)
  );
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${SERVER_URI}/api/users/friends/` + username,
          { headers: { Authorization: token } }
        );
        setFriends(friendList.data);
        setIsLoading(false);
      } catch (err) {
        console.log("Error in Fetching Friends", err);
      }
    };

    setIsLoading(true);
    getFriends();
  }, [username]);

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        `${SERVER_URI}/api/users/update`,
        {
          password: newPassword,
        },
        { headers: { Authorization: token } }
      );

      setNewPassword(null);
      setChangePassword(false);
    } catch (err) {
      console.log("Error in Updating Password", err);
    }
  };

  const logoutHandler = () => {
    logout();
    nav("/");
  };

  const followHandler = async () => {
    try {
      await axios.put(
        `${SERVER_URI}/api/users/follow/${_id}`,
        {},
        { headers: { Authorization: token } }
      );

      followUser(_id);
      setFollowed(!followed);
    } catch (err) {
      console.log("Error in Following/Unfollowing User", err);
    }
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {username !== currentUser.username ? (
          <button onClick={followHandler} className="rightbarFollowButton">
            {followed ? "Unfriend" : "Add Friend"}
            {followed ? <Remove /> : <Add />}
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <button onClick={logoutHandler} className="rightbarLogoutButton">
              LogOut
            </button>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setChangePassword(!changePassword);
                  setNewPassword(null);
                }}
                className="rightbarLogoutButton"
              >
                Change Password
              </button>
              {newPassword && (
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={handlePasswordChange}
                  className="rightbarLogoutButton"
                >
                  OK
                </button>
              )}
            </div>
            {changePassword && (
              <div>
                <span>New Password</span>
                <input
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  style={{ alignSelf: "center", marginLeft: "5px" }}
                  className="changePasswordInput"
                  type="text"
                />
              </div>
            )}
          </div>
        )}

        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City : </span>
            <span className="rightbarInfoValue">{city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">{relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>

        <div className="rightbarFollowings">
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={118} />
          ) : (
            friends.map(({ username, _id, profilePicture }) => (
              <Link
                style={{ textDecoration: "none" }}
                key={_id}
                to={`/profile/${username}`}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImg"
                    src={
                      profilePicture
                        ? PF + profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt="user"
                    loading="lazy"
                  />
                  <span className="rightbarFollowingName">{username}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
