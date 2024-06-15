import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();

export default function Post({ Post }) {
  const [likes, setLikes] = useState(Post.likes.length);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsliked] = useState(Post.likes.includes(user._id));
  const [postUser, setPostUser] = useState({});
  const { Image, description, createdAt, userId } = Post;
  const PF = `${SERVER_URI}/Images/`;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `${SERVER_URI}/api/users?userId=${userId}`
      );
      setPostUser(response.data);
    };
    fetchUser();
  }, [userId]);

  const likeHandler = async () => {
    try {
      await axios.put(`${SERVER_URI}/api/posts/like/${Post._id}`, {
        userId: user._id,
      });
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

      setIsliked(!isLiked);
    } catch (err) {
      alert("Post me fasa");
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <PostTop
          date={format(createdAt)}
          username={postUser.username}
          userPofile={
            postUser.profilePicture
              ? PF + postUser.profilePicture
              : PF + "person/noAvatar.png"
          }
        />
        <PostCenter
          postImage={Image ? PF + Image : null}
          postText={description}
        />
        <PostBottom
          // comments={comment}
          likes={likes}
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
    <div style={{ margin: postText ? "20px 0" : "0" }}>
      {postText && <span className="postText">{postText}</span>}
      {postImage && <img className="postImg" src={postImage} alt="postImage" />}
    </div>
  );
}
export function PostBottom({ comments, likes, likeHandler }) {
  const PF = `${SERVER_URI}/Images/`;
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
