import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login isLogin={true} />,
    },
    {
      path: "/register",
      element: <Login isLogin={false} />,
    },
    {
      path: "/profile/:username",
      element: user ? <Profile /> : <Navigate to="/login" />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
