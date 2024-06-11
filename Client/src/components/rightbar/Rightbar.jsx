import { Users } from "../../DummyData";
import "./rightbar.css";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="birthday" />
          <span className="birthdayText">
            <b>Mohit</b> and <b>3 other friends</b> have birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="ad" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <OnlineFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OnlineFriend({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarFriendImgContainer">
        <img
          className="rightbarFriendImg"
          src={user.profilePicture}
          alt="friend"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
