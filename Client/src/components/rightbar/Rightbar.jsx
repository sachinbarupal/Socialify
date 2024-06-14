import "./rightbar.css";
import { Users } from "../../DummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user, isProfile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
        alert("Right Bar Me fasa");
      }
    };
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
        {Users.map((user) => (
          <OnlineFriend key={user.id} user={user} />
        ))}
      </ul>
    </>
  );

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/users/unfollow/" + user._id, {
          _id: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/follow/" + user._id, {
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

  const ProfileRightBar = () => (
    <>
      {user.username !== currentUser.username && (
        <button onClick={followHandler} className="rightbarFollowButton">
          {followed ? "Unfollow" : "Follow"} {followed ? <Remove /> : <Add />}
        </button>
      )}
      {user.username === currentUser.username && (
        <button onClick={logoutHandler} className="rightbarLogoutButton">
          LogOut
        </button>
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
        {friends.map((friend) => (
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
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {isProfile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export function OnlineFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarFriendImgContainer">
        <img
          className="rightbarFriendImg"
          src={PF + user.profilePicture}
          alt="friend"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
