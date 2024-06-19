import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  token: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const FOLLOW = "FOLLOW";

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    AuthReducer,
    INITIAL_STATE,
    (initial) => {
      const storedState = localStorage.getItem("state");

      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return {
          user: parsedState.user || null,
          token: parsedState.token || null,
        };
      }
      return initial;
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "state",
      JSON.stringify({
        user: state.user,
        token: state.token,
      })
    );
  }, [state.user, state.token]);

  const login = (userToken) => {
    dispatch({ type: LOGIN, payload: userToken });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const followUser = (userId) => {
    dispatch({ type: FOLLOW, payload: userId });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, followUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
