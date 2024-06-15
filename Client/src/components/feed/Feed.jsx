import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import getConfig from "../../config";

const { SERVER_URI } = getConfig();
export default function Feed({ username, isProfile }) {
  console.log(SERVER_URI);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = isProfile
        ? await axios.get(`${SERVER_URI}/api/posts/user/${username}`)
        : await axios.get(`${SERVER_URI}/api/posts/timeline/${user._id}`);
      setPosts(
        response.data.sort(
          (post1, post2) =>
            new Date(post2.createdAt) - new Date(post1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {username === user.username && <Share />}
        {posts.map((post) => (
          <Post key={post._id} Post={post} />
        ))}
      </div>
    </div>
  );
}
