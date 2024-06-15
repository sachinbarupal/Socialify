import axios from "axios";
import getConfig from "./config";
const { SERVER_URI } = getConfig();
export const login = async (userCredentials, dispatch) => {
  // console.log(userCredentials);
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${SERVER_URI}/api/auth/login`,
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
