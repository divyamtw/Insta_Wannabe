import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

const handleError = (error, Msg) => {
  throw new Error(error?.response?.data?.message || Msg);
};

const login = async (email, password) => {
  try {
    const { data } = await api.post("/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error, "login failed");
  }
};

const register = async (firstname, lastname, username, email, password) => {
  try {
    const { data } = await api.post("/register", {
      firstname,
      lastname,
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error, "register failed");
  }
};

export { login, register };
