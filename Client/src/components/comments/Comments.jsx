import "./comments.css";
import getConfig from "../../config";
import { memo, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { format } from "timeago.js";
import axios from "axios";
const { SERVER_URI } = getConfig();
const PF = `${SERVER_URI}/Images/`;

const Comments = memo(({ comments, setComments, postId }) => {
  const { user, token } = useAuth();
  const comment = useRef();

  const handleComment = async () => {
    try {
      if (comment.current.value === "") {
        alert("kuch comment to likh");
        return;
      }
      const res = await axios.put(
        `${SERVER_URI}/api/posts/comment/` + postId,
        {
          comment: comment.current.value,
        },
        { headers: { Authorization: token } }
      );

      comment.current.value = "";
      setComments([res.data, ...comments]);
    } catch (err) {
      console.log("Error in Commenting ", err);
    }
  };

  return (
    <div className="comments">
      <div className="commentInputContainer">
        <img
          className="commentUserImage"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
        />
        <input
          className="commentInput"
          ref={comment}
          type="text"
          placeholder="write a comment"
        />
        <button onClick={handleComment} className="commentBtn">
          Send
        </button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
});

export default Comments;

const Comment = ({ comment }) => {
  const { username, userImage, createdAt } = comment;
  return (
    <div className="comment">
      <img
        className="commentUserImage"
        src={userImage ? PF + userImage : PF + "person/noAvatar.png"}
        alt="profile"
        loading="lazy"
      />
      <div className="info">
        <span className="username">{username}</span>
        <p className="commentText">{comment.comment}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span className="date">{format(createdAt)}</span>
      </div>
    </div>
  );
};
