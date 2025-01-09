import { useContext } from "react";
import { AuthContext } from "../context/authContext";

// component name should be in PascalCase
function Header() {
  const {handleLogout} = useContext(AuthContext)
  const appName = "Todo App"
  return(
    <header>
      <h1 className="text-lg font-bold abc">{appName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header;

// Named vs Default Exports