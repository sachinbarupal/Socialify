import "./comments.css";
import getConfig from "../../config";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import axios from "axios";
const { SERVER_URI } = getConfig();

function Comments({ comments, setComments, postId }) {
  const PF = `${SERVER_URI}/Images/`;

  const { user } = useContext(AuthContext);
  const comment = useRef();
  const handleComment = async () => {
    try {
      if (comment.current.value === "") {
        alert("kuch comment to likh");
        return;
      }
      const res = await axios.put(`${SERVER_URI}/api/posts/comment/` + postId, {
        _id: user._id,
        comment: comment.current.value,
      });

      comment.current.value = "";
      setComments(res.data);
    } catch (err) {
      alert("Comment krte fasa");
      console.log(err);
    }
  };
  return (
    <div className="comments">
      <div className="commentInputContainer">
        <img className="commentUserImage" src={PF + user.profilePicture} />
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
        <div className="comment">
          <img
            className="commentUserImage"
            src={PF + comment.userImage}
            alt=""
          />
          <div className="info">
            <span className="username">{comment.username}</span>
            <p className="commentText">{comment.comment}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span className="date">{format(comment.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
