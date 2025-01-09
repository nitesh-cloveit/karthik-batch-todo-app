import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";
import { BASE_URL } from "../constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useContext(AuthContext);
  const login = async () => {
    try {
      // API call to /auth/login
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      handleLogin(data.token)
    } catch (err) {
      console.log(err);
    }
  };
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1 className={theme === "light" ? "light-header" : "dark-header"}>
        Login
      </h1>
      <button onClick={login}>Login</button>
      <NavLink to="/register">Go to Register</NavLink>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
