import { useState, useEffect } from "react";
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
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [error, setError] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTitleSame()) {
      setError("Title already exists");
      return;
    }
    if (todos?.length) {
      // todos is null initially
      setTodos([...todos, { title, description }]);
    } else {
      setTodos([{ title, description }]);
    }
    setTitle("");
    setDescription("");
    setError("");
    // }
  };

  const isTitleSame = () => {
    return todos?.some((todo) => todo.title === title);
  };

  // fetch data from local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    console.log("local", todos);
    setTodos(todos);
    console.log("first render");
  }, []);

  /* store data in local storage */
  useEffect(() => {
    console.log("from state", todos);
    if (todos !== null) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    console.log("second render");
  }, [todos]);

  // deletes item from the todos array
  const handleDelete = (index: number) => {
    if (todos) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

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
          {todos?.map((todo, index) => (
            <Card
              key={index}
              title={todo.title}
              description={todo.description}
              onDelete={() => handleDelete(index)}
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
