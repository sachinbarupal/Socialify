import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { Users } from "../../DummyData";
import { useState } from "react";

export default function Post({ Post }) {
  const [likes, setLikes] = useState(Post.like);
  const [isLiked, setIsliked] = useState(false);
  const { photo, desc, date, comment, userId } = Post;
  const { username, profilePicture } = Users.find((user) => user.id == userId);

  const likeHandler = () => {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsliked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <PostTop date={date} username={username} userPofile={profilePicture} />
        <PostCenter postImage={photo} postText={desc} />
        <PostBottom
          comments={comment}
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
        <img className="postProfileImg" src={userPofile} alt="profilePic" />
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
  return (
    <div className="postBottom">
      <div className="postBottomLeft">
        <img
          className="likeIcon"
          src="assets/like.png"
          onClick={likeHandler}
          alt="like"
        />
        {/* <img className="likeIcon" src="assets/heart.png" alt="liked" /> */}
        <span className="postLikeCounter">{likes} Likes</span>
      </div>

      <div className="postBottomRight">
        <span className="postCommentText">{comments} Comments</span>
      </div>
    </div>
  );
}
