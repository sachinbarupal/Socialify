import { Users } from "../../DummyData";
import "./rightbar.css";

export default function Rightbar({ profile }) {
  const HomeRightBar = () => (
    <>
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
    </>
  );

  const ProfileRightBar = () => (
    <>
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From : </span>
          <span className="rightbarInfoValue">Nadrid</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue">Mingle</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="assets/person/2.jpeg"
            alt="userImage"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="assets/person/2.jpeg"
            alt="userImage"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="assets/person/2.jpeg"
            alt="userImage"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
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
