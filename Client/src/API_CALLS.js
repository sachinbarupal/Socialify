import axios from "axios";
export const login = async (userCredentials, dispatch) => {
  // console.log(userCredentials);
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
