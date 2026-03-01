import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  firstname: z
    .string()
    .min(3, {
      message: "First Name should be atleast 3 characters long.",
    })
    .max(20),
  lastname: z
    .string()
    .min(3, {
      message: "Last Name should be atleast 3 characters long.",
    })
    .max(20),
  username: z.string().min(3, { message: "Username must be unique." }),
  email: z.email({ message: "Enter valid email." }),
  password: z.string().min(4, {
    message: "Password should be atleast 4 characters long.",
  }),
});

const Register = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  function submitForm(data) {
    console.log(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;
