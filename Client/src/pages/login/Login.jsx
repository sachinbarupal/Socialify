import "./login.css";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../API_CALLS";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();
export default function Login({ isLogin }) {
  const [isLoginPage, setIsLoginPage] = useState(isLogin);
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);

  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginPage) {
      login(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
    } else {
      if (confPassword.current.value !== password.current.value)
        return confPassword.current.setCustomValidity(
          "Passwords do not match !!"
        );

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(`${SERVER_URI}/api/auth/register`, user);
        setIsLoginPage(!isLoginPage);
        navigate("/login");
      } catch (err) {
        // console.log(err);
      }
    }
  };

  // console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialify</h3>
          <span className="loginDesc">Welcome To Socialify !! </span>
          <span className="loginDesc">SocialMedia for Sociopaths.</span>
        </div>
        <div className="loginRight">
          <form
            onSubmit={handleSubmit}
            className="loginBox"
            style={{ height: isLoginPage ? "300px" : "400px" }}
          >
            {!isLoginPage && (
              <input
                required
                className="loginInput"
                ref={username}
                placeholder="Username"
              />
            )}
            <input
              type="email"
              required
              ref={email}
              className="loginInput"
              placeholder="Email"
            />
            <input
              ref={password}
              required
              type="password"
              // minLength="8"
              className="loginInput"
              placeholder="Password"
            />
            {!isLoginPage && (
              <input
                ref={confPassword}
                required
                type="password"
                // minLength="8"
                className="loginInput"
                placeholder="Confirm Password"
              />
            )}
            <button type="submit" disabled={isFetching} className="loginButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="30px" />
              ) : isLoginPage ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </button>

            {isLoginPage && (
              <span style={{ cursor: "pointer" }} className="loginForgot">
                Forgot Password?
              </span>
            )}
            {!isLoginPage && !isFetching && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsLoginPage(!isLoginPage);
                  navigate("/login");
                }}
                className="loginForgot"
              >
                Already have an Account?
              </span>
            )}
            {isLoginPage && (
              <button
                className="loginRegisterButton"
                disabled={isFetching}
                onClick={() => {
                  setIsLoginPage(!isLoginPage);
                  navigate("/register");
                }}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="30px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
