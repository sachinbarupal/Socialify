import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { memo, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();

const Share = memo(() => {
  const { user, token } = useAuth();
  const description = useRef();
  const [Image, setImage] = useState(null);

  const { username, profilePicture } = user;

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!Image && description.current.value === "") {
        alert("Put some Caption or Select an Image atleast !!");
        return;
      }

      const newPost = { description: description.current.value };

      if (Image) {
        const data = new FormData();
        const imageName = Date.now() + Image.name;
        data.append("name", imageName);
        data.append("folder", "Posts");
        data.append("imageFile", Image);

        const res = await axios.post(`${SERVER_URI}/api/upload`, data);
        newPost.Image = res.data.image;
      }

      await axios.post(`${SERVER_URI}/api/posts/create`, newPost, {
        headers: { Authorization: token },
      });

      window.location.reload();
    } catch (err) {
      alert("Error While Posting, Try Again After Some Time !!");
      console.log("Error in Posting", err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={profilePicture}
            className="shareProfileImg"
            alt="profile"
            loading="lazy"
          />
          <input
            placeholder={`What's In Your Mind, ${username}?`}
            className="shareInput"
            ref={description}
          />
        </div>

        <hr className="shareHr" />

        {Image && (
          <div className="shareImageContainer">
            <div className="shareCancel">
              <Cancel
                style={{ cursor: "pointer" }}
                onClick={() => setImage(null)}
              />
            </div>
            <img
              className="shareImage"
              src={URL.createObjectURL(Image)}
              alt="upload"
              loading="lazy"
            />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="imageUpload" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  if (e.target.files[0].size > 10 * 1024 * 1024)
                    return alert("File size exceeds 10MB");
                  setImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
});

export default Share;
