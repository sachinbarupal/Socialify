import "./rightbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import getConfig from "../../config";
import { Skeleton } from "@mui/material";
const { SERVER_URI } = getConfig();
const PF = `${SERVER_URI}/Images/`;

export default function Rightbar({ user, isProfile }) {
  const { user: currentUser, token } = useAuth();

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${SERVER_URI}/api/users/friends/` + user.username,
          { headers: { Authorization: token } }
        );
        setFriends(friendList.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert("Right Bar Me fasa");
      }
    };
    setIsLoading(true);
    setFollowed(currentUser.following.includes(user?._id));
    getFriends();
  }, [user, currentUser.following]);

  const HomeRightBar = () => (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src={`${PF}gift.png`} alt="birthday" />
        <span className="birthdayText">
          <b>Mohit</b> and <b>3 other friends</b> have birthday today.
        </span>
      </div>
      <img className="rightbarAd" src={`${PF}ad.png`} alt="ad" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {isLoading ? (
          <div>
            <Skeleton height={50} animation="wave" />
            <Skeleton height={50} animation="wave" />
            <Skeleton height={50} animation="wave" />
            <Skeleton height={50} animation="wave" />
          </div>
        ) : (
          friends.map((friend) => (
            <OnlineFriend key={friend._id} friend={friend} />
          ))
        )}
      </ul>
    </>
  );

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`${SERVER_URI}/api/users/unfollow/` + user._id, {
          _id: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${SERVER_URI}/api/users/follow/` + user._id, {
          _id: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      alert("ERROR");
    }
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    nav("/");
  };

  const ProfileRightBar = () => {
    const [newPassword, setNewPassword] = useState(null);
    const [changePassword, setChangePassword] = useState(false);
    const handlePasswordChange = async () => {
      try {
        await axios.put(`${SERVER_URI}/api/users/update/` + user._id, {
          _id: currentUser._id,
          password: newPassword,
        });

        setNewPassword(null);
        setChangePassword(false);
      } catch (err) {
        alert("Password Change me Presanii!!");
        console.log(err);
      }
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <button onClick={followHandler} className="rightbarFollowButton">
            {followed ? "Unfriend" : "Add Friend"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username === currentUser.username && (
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
                  onClick={() => {
                    alert("Filhal Band hai Feature");
                  }}
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
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From : </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>

        <div className="rightbarFollowings">
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={118} />
          ) : (
            friends.map((friend) => (
              <Link
                style={{ textDecoration: "none" }}
                key={friend._id}
                to={"/profile/" + friend.username}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImg"
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt="userImage"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {isProfile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export function OnlineFriend({ friend }) {
  const PF = `${SERVER_URI}/Images/`;
  return (
    <li className="rightbarFriend">
      <div className="rightbarFriendImgContainer">
        <Link to={`/profile/` + friend.username}>
          <img
            className="rightbarFriendImg"
            src={
              friend.profilePicture
                ? PF + friend.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="friend"
          />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
}
