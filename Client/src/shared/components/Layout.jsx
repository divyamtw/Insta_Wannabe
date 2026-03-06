import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="mainContent">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
