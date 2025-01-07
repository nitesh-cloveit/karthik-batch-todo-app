import { useContext } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "../context/themeContext";

export default function Login() {
  // const login = () => {
  //   try {
  //     // API call to /auth/login
  //     localStorage.setItem("token", token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const {theme, toggleTheme} = useContext(ThemeContext)
  console.log({theme})


  return (
    <div>
      <h1 className={theme === "light" ? "light-header" : "dark-header"}>Login</h1>
      <NavLink to="/register">Go to Register</NavLink>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
