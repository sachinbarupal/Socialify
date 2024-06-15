import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();

export default function Profile() {
  const PF = `${SERVER_URI}/Images/`;

  const [user, setUser] = useState(false);
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${SERVER_URI}/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  if (!user) return <Topbar />;

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
                className="profileCoverImg"
                alt="cover"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                className="profileUserImg"
                alt="cover"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.description}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} isProfile={true} />
            <Rightbar user={user} isProfile={true} />
          </div>
        </div>
      </div>
    </>
  );
}
