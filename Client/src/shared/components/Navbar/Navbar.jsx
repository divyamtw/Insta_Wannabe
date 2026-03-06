import { Link, useNavigate } from "react-router";
import style from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <h1 className={style.logo}>
        <Link className={style.link} to={`/`}>
          RootNet
        </Link>
      </h1>
      <button
        className={style.button}
        onClick={() => {
          navigate("/create-post");
        }}
      >
        Create Post
      </button>
    </div>
  );
};

export default Navbar;
