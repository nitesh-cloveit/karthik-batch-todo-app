import { Route, Routes } from "react-router";
import Todo from "./pages/todo";
import Login from "./pages/login";
import Register from "./pages/register";
import AddTodo from "./pages/addTodo";

// const ProtectedRoutes = () => {
//   const token = "abc";
//   return token ? <App /> : <Login />;
// };

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/*" element={<ProtectedRoutes />}> */}
      <Route path="/todo" element={<Todo />} />
      <Route path="todo/add" element={<AddTodo />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;

/* Features of React */
// Component based
// code reusable
// JSX
// declaritive
// virtual dom
// props
