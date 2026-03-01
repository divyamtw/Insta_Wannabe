import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import style from "./Login.module.scss";

const formSchema = z.object({
  email: z.email({ message: "Enter valid email." }),
  password: z
    .string()
    .min(4, { message: "Password should be atleast 4 characters long." }),
});

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const { loading, error, handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    const success = await handleLogin(data.email, data.password);
    if (success) await navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <p className={style.error}>{error}</p>}
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
    </>
  );
};

export default Login;
