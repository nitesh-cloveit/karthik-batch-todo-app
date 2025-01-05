import { NavLink } from "react-router";

export default function Login() {
  const login = () => {
    try {
      // API call to /auth/login
      localStorage.setItem("token", token);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <NavLink to="/register">Go to Register</NavLink>
    </div>
  );
}
