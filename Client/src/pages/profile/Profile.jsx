import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="assets/post/3(1).jpeg"
                className="profileCoverImg"
                alt="cover"
              />
              <img
                src="assets/person/1.jpeg"
                className="profileUserImg"
                alt="cover"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Sachin</h4>
              <h4 className="profileInfoDesc">Hello My Friend</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
