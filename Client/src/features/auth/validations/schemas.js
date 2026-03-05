import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "Enter valid email." }),
  password: z
    .string()
    .min(4, { message: "Password should be atleast 4 characters long." }),
});

const registerSchema = z.object({
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
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long." }),
});

export { loginSchema, registerSchema };
