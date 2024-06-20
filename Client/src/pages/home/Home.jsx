import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { useAuth } from "../../context/AuthContext";
import HomeRightBar from "../../components/rightbar/HomeRightBar";
export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={user.username} />
        <HomeRightBar />
      </div>
    </>
  );
}
