import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import getConfig from "../../config";
import { CircularProgress } from "@mui/material";

const { SERVER_URI } = getConfig();
export default function Feed({ username, isProfile }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = isProfile
        ? await axios.get(`${SERVER_URI}/api/posts/user/${username}`, {
            headers: { Authorization: token },
          })
        : await axios.get(`${SERVER_URI}/api/posts/timeline`, {
            headers: { Authorization: token },
          });
      setPosts(
        response.data.sort(
          (post1, post2) =>
            new Date(post2.createdAt) - new Date(post1.createdAt)
        )
      );
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchPosts();
  }, [username, isProfile, token]);

  if (isLoading)
    return (
      <div
        className="feed"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div className="feed">
      <div className="feedWrapper">
        {username === user.username && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
