import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();
export default function Share() {
  const PF = `${SERVER_URI}/Images/`;

  const { user } = useContext(AuthContext);
  const description = useRef();
  const [Image, setImage] = useState(null);

  const imageUploadHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!Image && description.current.value === "") {
        alert("Kuch to likho ya Image upload kro");
        return;
      }
      const newPost = {
        userId: user._id,
        description: description.current.value,
      };

      if (Image) {
        const data = new FormData();
        const imageName = Date.now() + Image.name;
        data.append("name", imageName);
        data.append("Image", Image);

        newPost.Image = imageName;

        await axios.post(`${SERVER_URI}/api/upload`, data);
      }

      await axios.post(`${SERVER_URI}/api/posts/create`, newPost);
      window.location.reload();
    } catch (err) {
      alert("Error While Posting, Try Again After Some Time !!");
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            className="shareProfileImg"
            alt="profilePic"
          />
          <input
            placeholder={`What's In Your Mind, ${user.username}?`}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {Image && (
          <div className="shareImageContainer">
            <img
              className="shareImage"
              src={URL.createObjectURL(Image)}
              alt="upload"
            />
            <Cancel className="shareCancel" onClick={() => setImage(null)} />
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
                onChange={imageUploadHandler}
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
}
