import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/create-post");
        }}
      >
        create post
      </button>
    </div>
  );
};

export default Navbar;
