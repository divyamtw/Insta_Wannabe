import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "./features/auth/pages/index.js";
import { Feed, CreatePost } from "./features/post/pages/index.js";
import Post from "./features/post/components/Post/Post.jsx";
import Layout from "../src/shared/components/Layout.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/test",
        element: <Post />,
      },
    ],
  },
]);
