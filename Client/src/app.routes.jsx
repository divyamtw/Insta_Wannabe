import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "./features/auth/pages/index.js";

export const router = createBrowserRouter([
  { path: `/`, element: <div>Home</div> },
  {
    path: `/login`,
    element: <Login />,
  },
  {
    path: `/register`,
    element: <Register />,
  },
]);
