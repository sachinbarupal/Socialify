import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { token } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login isLogin={true} />,
    },
    // {
    //   path: "/messenger",
    //   element: token ? <Messenger /> : <Navigate to="/login" />,
    // },
    {
      path: "/register",
      element: token ? <Navigate to="/" /> : <Login isLogin={false} />,
    },
    {
      path: "/profile/:username",
      element: token ? <Profile /> : <Navigate to="/login" />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
