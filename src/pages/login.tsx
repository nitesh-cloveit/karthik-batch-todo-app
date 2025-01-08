import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const {setToken} = useContext(AuthContext)
  const login = () => {
    try {
      // API call to /auth/login
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MzU4MTI0NjUsImV4cCI6MTczNzEwODQ2NX0.Ea6dqWA5c5AzKUIi5ySGaK_mtIkep2qNgfz9YckkxWM";
      localStorage.setItem("token", token);
      setToken(token)
      navigate("/todo");

    } catch (err) {
      console.log(err);
    }
  };
  const {theme, toggleTheme} = useContext(ThemeContext)


  return (
    <div>
      <h1 className={theme === "light" ? "light-header" : "dark-header"}>Login</h1>
      <button onClick={login}>Login</button>
      <NavLink to="/register">Go to Register</NavLink>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
