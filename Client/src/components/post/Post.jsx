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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getConfig from "../../config";
import Comments from "../comments/Comments";
const { SERVER_URI } = getConfig();

export default function Post({ post }) {
  const PF = `${SERVER_URI}/Images/`;
  const { user, token } = useAuth();

  const [postUser, setPostUser] = useState({});

  const { _id, Image, description, createdAt, userId } = post;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `${SERVER_URI}/api/users/user/${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      setPostUser(response.data);
    };
    fetchUser();
  }, [userId]);

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
          postImage={Image ? PF + Image : false}
          postText={description}
        />

        <PostBottom post={post} />
      </div>
    </div>
  );
}

function PostTop({ date, username, userImage }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="user">
      {/* Top Left */}
      <div className="userInfo">
        <Link to={`/profile/${username}`}>
          <img
            src={userImage}
            loading="lazy"
            alt="profile"
            className="userImage"
          />
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
function PostCenter({ postImage, postText }) {
  return (
    <div className="postContent">
      <p className="postText">{postText}</p>
      {postImage && (
        <img loading="lazy" className="postImg" src={postImage} alt="img" />
      )}
    </div>
  );
}
function PostBottom({ post }) {
  const { user, token } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsliked] = useState(post.likes.includes(user._id));
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  const likeHandler = async () => {
    try {
      await axios.put(
        `${SERVER_URI}/api/posts/like/${post._id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

      setIsliked(!isLiked);
    } catch (err) {
      console.log("Error in Like", err);
    }
  };

  return (
    <>
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
      {showComments && <hr style={{ margin: "10px 0px" }} />}
      {showComments && (
        <Comments
          comments={comments}
          postId={post._id}
          setComments={setComments}
        />
      )}
    </>
  );
}
