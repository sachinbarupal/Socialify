import "./post.css";
import {
  Cancel,
  Favorite,
  FavoriteBorderOutlined,
  MoreVert,
} from "@mui/icons-material";
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
          isLiked={isLiked}
          likeHandler={likeHandler}
        />
      </div>
    </div>
  );
}

export function PostTop({ date, username, userPofile }) {
  const [showOptions, setShowOptions] = useState(false);
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
        {showOptions && <Cancel sx={{ color: "red", cursor: "pointer" }} />}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreVert />
        </div>
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
export function PostBottom({ comments, isLiked, likes, likeHandler }) {
  return (
    <div className="postBottom">
      <div className="postBottomLeft">
        <div onClick={likeHandler} style={{ cursor: "pointer" }}>
          {isLiked ? (
            <Favorite
              onclick={() => console.log("clicked")}
              sx={{ color: "red" }}
            />
          ) : (
            <FavoriteBorderOutlined onclick={() => console.log("clicked")} />
          )}
        </div>

        <span className="postLikeCounter">{likes} Likes</span>
      </div>

      <div className="postBottomRight">
        <span className="postCommentText">0 Comments</span>
      </div>
    </div>
  );
}
