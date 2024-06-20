const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const FOLLOW = "FOLLOW";
const UPDATE_PROFILE = "UPDATE_PROFILE";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.removeItem("state");
      return {
        user: null,
        token: null,
      };
    case FOLLOW:
      if (state.user.following.includes(action.payload))
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter(
              (id) => id !== action.payload
            ),
          },
        };
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

export default AuthReducer;
