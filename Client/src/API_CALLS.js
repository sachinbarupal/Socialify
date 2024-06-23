import axios from "axios";
import getConfig from "./config";
const { SERVER_URI } = getConfig();

export const loginCall = async (userCredentials, login) => {
  try {
    // console.log(userCredentials);
    const res = await axios.post(
      `${SERVER_URI}/api/auth/login`,
      userCredentials
    );
    login(res.data);
  } catch (err) {
    alert(err.response.data.msg);
    console.log("Error in Login Call", err);
  }
};
