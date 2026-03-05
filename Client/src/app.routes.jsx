import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "./features/auth/pages/index.js";
import { Feed, CreatePost } from "./features/post/pages/index.js";

export const router = createBrowserRouter([
  {
    path: `/`,
    element: <Feed />,
  },
  {
    path: `/login`,
    element: <Login />,
  },
  {
    path: `/register`,
    element: <Register />,
  },
  {
    path: `/create-post`,
    element: <CreatePost />,
  },
]);
