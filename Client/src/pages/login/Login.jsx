import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Feed from "../../components/feed/Feed";

export default function Login({ isLogin }) {
  const [login, setLogin] = useState(isLogin);
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialify</h3>
          <span className="loginDesc">Welcome To Socialify !! </span>
          <span className="loginDesc">SocialMedia for Sociopaths.</span>
        </div>
        <div className="loginRight">
          <div
            className="loginBox"
            style={{ height: login ? "300px" : "400px" }}
          >
            {!login && <input className="loginInput" placeholder="Username" />}
            <input className="loginInput" placeholder="Email" />
            <input className="loginInput" placeholder="Password" />
            {!login && (
              <input className="loginInput" placeholder="Confirm Password" />
            )}
            <button className="loginButton">
              {login ? "Log In" : "Sign Up"}
            </button>

            {login && (
              <span style={{ cursor: "pointer" }} className="loginForgot">
                Forgot Password?
              </span>
            )}
            {!login && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLogin(!login);
                  navigate("/login");
                }}
                className="loginForgot"
              >
                Already have an Account?
              </span>
            )}
            {login && (
              <button
                className="loginRegisterButton"
                onClick={() => {
                  setLogin(!login);
                  navigate("/register");
                }}
              >
                Create a New Account
              </button>
            )}
          </div>
          <Feed />
        </div>
      </div>
    </div>
  );
}
