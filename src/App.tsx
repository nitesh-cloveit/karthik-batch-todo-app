import { useState } from "react";
import Header from "./components/header";
import Card from "./components/card";
import TodoInput from "./components/todoInput";

interface TodoItem {
  title: string;
  description: string;
}

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTitleSame()) {
      setError("Title already exists");
      return;
    }
    setTodos([...todos, { title, description }]);
    setTitle("");
    setDescription("");
    setError("");
  };

  const isTitleSame = () => {
    return todos.some((todo) => todo.title === title);
  };

  /* store data in local storage */
  // useEffect(() => {
  //   if (todos.length !== 0) {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  //   }
  // },[todos]);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form onSubmit={addTodo}>
          <div className="input-container">
            <TodoInput
              value={title}
              name="Title"
              placeholder="Enter Title"
              onChange={setTitle}
            />
            <TodoInput
              required={false}
              value={description}
              name="Description"
              placeholder="Enter Description"
              onChange={setDescription}
            />
          </div>
          {error && <p className="error">Title already exists</p>}
          <button type="submit">Add</button>
        </form>

        <div>
          <h1>Todo List</h1>
          {todos.map((todo, index) => (
            <Card
              key={index}
              title={todo.title}
              description={todo.description}
            />
          ))}
        </div>
      </div>
    </div>
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
