import { Users } from "../../DummyData";
import "./rightbar.css";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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

  const ProfileRightBar = () => (
    <>
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
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src={`${PF}person/2.jpeg`}
            alt="userImage"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src={`${PF}person/2.jpeg`}
            alt="userImage"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src={`${PF}person/2.jpeg`}
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
        {user ? <ProfileRightBar /> : <HomeRightBar />}
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
