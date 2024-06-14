import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/posts/user/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      // console.log(response.data);
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
