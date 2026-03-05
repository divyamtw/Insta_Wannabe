import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { loginSchema } from "../../validations/schemas";
import useZodForm from "../../hooks/useZodForm";
import "./Login.scss";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm(loginSchema);
  const { loading, error, handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    const success = await handleLogin(data.email, data.password);
    if (success) await navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
