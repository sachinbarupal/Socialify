import { MoreVert } from "@mui/icons-material";
import "./post.css";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <PostTop />
        <PostCenter />
        <PostBottom />
      </div>
    </div>
  );
}

export function PostTop() {
  return (
    <div className="postTop">
      {/* Top Left */}
      <div className="postTopLeft">
        <img
          className="postProfileImg"
          src="assets/person/2.jpeg"
          alt="profilePic"
        />
        <span className="postUsername">Sachin</span>
        <span className="postDate">5 mins ago</span>
      </div>

      {/* Top  Right */}
      <div className="postTopRight">
        <MoreVert />
      </div>
    </div>
  );
}
export function PostCenter() {
  return (
    <div className="postCenter">
      <span className="postText">Hii Me Ninja Hattori</span>
      <img className="postImg" src="assets/post/1(1).jpeg" alt="postImage" />
    </div>
  );
}
export function PostBottom() {
  return (
    <div className="postBottom">
      <div className="postBottomLeft">
        <img className="likeIcon" src="assets/like.png" alt="like" />
        <img className="likeIcon" src="assets/heart.png" alt="liked" />
        <span className="postLikeCounter">32 people like it</span>
      </div>

      <div className="postBottomRight">
        <span className="postCommentText">9 Comments</span>
      </div>
    </div>
  );
}
