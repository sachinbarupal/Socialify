import "./rightbar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import getConfig from "../../config";
import axios from "axios";
import { Skeleton } from "@mui/material";

const { SERVER_URI } = getConfig();
const PF = `${SERVER_URI}/Images/`;

const HomeRightBar = () => {
  const { user, token } = useAuth();
  const { username } = user;

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={`${PF}gift.png`}
            alt="gift"
            loading="lazy"
          />
          <span className="birthdayText">
            <b>Mohit</b> and <b>3 other friends</b> have birthday today.
          </span>
        </div>

        <img
          className="rightbarAd"
          src={`${PF}meme.gif`}
          alt="ad"
          loading="lazy"
        />

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
      </div>
    </div>
  );
};

export default HomeRightBar;

function OnlineFriend({ friend }) {
  const { username, profilePicture } = friend;
  return (
    <li className="rightbarFriend">
      <div className="rightbarFriendImgContainer">
        <Link to={`/profile/${username}`}>
          <img
            className="rightbarFriendImg"
            src={
              profilePicture ? PF + profilePicture : PF + "person/noAvatar.png"
            }
            alt="friend"
            loading="lazy"
          />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{username}</span>
    </li>
  );
}
