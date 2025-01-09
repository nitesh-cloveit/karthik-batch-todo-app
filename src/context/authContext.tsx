import { createContext, useState } from "react";
import { useNavigate } from "react-router";

interface Auth {
  token: string | null;
  setToken: (token: string) => void;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<Auth>({
  token: null,
  setToken: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState<string | null>(storedToken);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    navigate("/todo");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null)
  }


  return (
    <AuthContext.Provider value={{ token, setToken, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
