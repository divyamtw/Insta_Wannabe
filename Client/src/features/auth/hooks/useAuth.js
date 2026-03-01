import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(email, password);
      setUser(response.user);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    firstname,
    lastname,
    username,
    email,
    password,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(
        firstname,
        lastname,
        username,
        email,
        password,
      );
      setUser(response.user);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleLogin, handleRegister };
};

export { useAuth };
