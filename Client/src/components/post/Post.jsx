import "./post.css";
import {
  Cancel,
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
  ShareOutlined,
  TextsmsOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import getConfig from "../../config";
import Comments from "../comments/Comments";
const { SERVER_URI } = getConfig();

export default function Post({ Post }) {
  const [likes, setLikes] = useState(Post.likes.length);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsliked] = useState(Post.likes.includes(user._id));
  const [postUser, setPostUser] = useState({});
  const { Image, description, createdAt, userId } = Post;
  const [comments, setComments] = useState(Post.comments);
  const PF = `${SERVER_URI}/Images/`;
  const [showComments, setShowComments] = useState(false);
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
          userImage={
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
          setShowComments={setShowComments}
          likes={likes}
          isLiked={isLiked}
          comments={comments}
          likeHandler={likeHandler}
        />
        {showComments && <hr style={{ margin: "10px 0px" }} />}
        {showComments && (
          <Comments
            comments={comments}
            postId={Post._id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
}

export function PostTop({ date, username, userImage }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="user">
      {/* Top Left */}
      <div className="userInfo">
        <Link to={`/profile/${username}`}>
          <img src={userImage} className="userImage" />
        </Link>
        <div className="userDetails">
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${username}`}
          >
            <span className="userName">{username}</span>
          </Link>
          <span className="date">{date}</span>
        </div>
      </div>
      <MoreVert />
    </div>
  );
}
export function PostCenter({ postImage, postText }) {
  return (
    <div className="postContent">
      <p className="postText">{postText}</p>
      {postImage && <img className="postImg" src={postImage} alt="postImage" />}
    </div>
  );
}
export function PostBottom({
  setShowComments,
  comments,
  isLiked,
  likes,
  likeHandler,
}) {
  return (
    <div className="postBottom">
      <div className="item">
        <div onClick={likeHandler} style={{ cursor: "pointer" }}>
          {isLiked ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </div>
        <span className="postLikes">{likes} Likes</span>
      </div>

      <div className="item">
        <TextsmsOutlined
          onClick={() => setShowComments((state) => !state)}
          sx={{ cursor: "pointer" }}
        />
        <span className="postComments">{comments.length} Comments</span>
      </div>

      <div className="item">
        <ShareOutlined sx={{ cursor: "pointer" }} />
        Share
      </div>
    </div>
  );
}
