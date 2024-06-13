import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import "./post.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post({ Post }) {
  const [likes, setLikes] = useState(Post.likes);
  const [isLiked, setIsliked] = useState(false);
  const [user, setUser] = useState({});
  const { Image, description, createdAt, userId } = Post;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [userId]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const likeHandler = () => {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsliked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <PostTop
          date={format(createdAt)}
          username={user.username}
          userPofile={PF + "person/noAvatar.png"}
        />
        <PostCenter postImage={PF + Image} postText={description} />
        <PostBottom
          // comments={comment}
          likes={likes.length}
          likeHandler={likeHandler}
        />
      </div>
    </div>
  );
}

export function PostTop({ date, username, userPofile }) {
  return (
    <div className="postTop">
      {/* Top Left */}
      <div className="postTopLeft">
        <Link to={`/profile/${username}`}>
          <img className="postProfileImg" src={userPofile} alt="profilePic" />
        </Link>
        <span className="postUsername">{username}</span>
        <span className="postDate">{date}</span>
      </div>

      {/* Top  Right */}
      <div className="postTopRight">
        <MoreVert />
      </div>
    </div>
  );
}
export function PostCenter({ postImage, postText }) {
  return (
    <div className="postCenter">
      <span className="postText">{postText}</span>
      <img className="postImg" src={postImage} alt="postImage" />
    </div>
  );
}
export function PostBottom({ comments, likes, likeHandler }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="postBottom">
      <div className="postBottomLeft">
        <img
          className="likeIcon"
          src={`${PF}like.png`}
          onClick={likeHandler}
          alt="like"
        />
        {/* <img className="likeIcon" src="assets/heart.png" alt="liked" /> */}
        <span className="postLikeCounter">{likes} Likes</span>
      </div>

      <div className="postBottomRight">
        <span className="postCommentText">0 Comments</span>
      </div>
    </div>
  );
}
