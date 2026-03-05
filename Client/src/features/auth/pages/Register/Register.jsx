import useZodForm from "../../hooks/useZodForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import style from "./Register.module.scss";
import { registerSchema } from "../../validations/schemas";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm(registerSchema);

  const { loading, error, handleRegister } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    const { firstname, lastname, username, email, password } = data;
    const success = await handleRegister(
      firstname,
      lastname,
      username,
      email,
      password,
    );
    if (success) await navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <p className={style.error}>{error}</p>}
        <div>
          <label htmlFor="first-name">First Name: </label>
          <input id="first-name" type="text" {...register("firstname")} />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <div>
          <label htmlFor="last-name">Last Name: </label>
          <input id="last-name" type="text" {...register("lastname")} />
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
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
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </>
  );
};

export default Register;
