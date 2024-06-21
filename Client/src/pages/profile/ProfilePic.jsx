import "./profile.css";
import { Clear, Done, PhotoCamera } from "@mui/icons-material";
import React, { useState } from "react";
import getConfig from "../../config";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const { SERVER_URI } = getConfig();

export default function ProfilePic({ profilePicture }) {
  const [profileImg, setProfileImg] = useState(null);
  const { token, updateUser } = useAuth();

  const handleUpload = async () => {
    try {
      const data = new FormData();
      const imageName = Date.now() + profileImg.name;
      data.append("name", imageName);
      data.append("folder", "Users/Profiles");
      data.append("imageFile", profileImg);

      const res = await axios.post(`${SERVER_URI}/api/upload`, data);

      await axios.put(
        `${SERVER_URI}/api/users/update`,
        { profilePicture: res.data.image },
        {
          headers: { Authorization: token },
        }
      );

      setProfileImg(null);
      updateUser({ profilePicture: res.data.image });
      window.location.reload();
    } catch (err) {
      alert("Error in Image Uploading");
      console.log("Error in Image Uploading", ErrorEvent);
    }
  };

  return (
    <>
      {profileImg ? (
        <img
          className="profileUserImg"
          src={URL.createObjectURL(profileImg)}
          alt="upload"
          loading="lazy"
        />
      ) : (
        <img
          src={profilePicture}
          className="profileUserImg"
          alt="cover"
          loading="lazy"
        />
      )}
      <div className="cameraIcon">
        <label htmlFor="picProfile">
          <PhotoCamera
            sx={{
              cursor: "pointer",
              color: "white",
              backgroundColor: "black",
              fontSize: "30px",
              borderRadius: "50%",
              padding: "2px",
            }}
          />
          <input
            type="file"
            id="picProfile"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              if (e.target.files[0].size > 10 * 1024 * 1024)
                return alert("File size exceeds 10MB");
              setProfileImg(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />
        </label>
        {profileImg && (
          <div onClick={handleUpload}>
            <Done
              sx={{
                cursor: "pointer",
                color: "green",
                border: "1px solid green",
                borderRadius: "50%",
                marginLeft: "5px",
              }}
            />
          </div>
        )}
        {profileImg && (
          <div onClick={() => setProfileImg(null)}>
            <Clear
              sx={{
                cursor: "pointer",
                color: "red",
                border: "1px solid red",
                borderRadius: "50%",
                marginLeft: "5px",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
