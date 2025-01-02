import { useState, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/card";
import TodoInput from "./components/todoInput";
import { BASE_URL, TOKEN } from "./constants";

interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: boolean;
  user_id?: number;
}

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState("");

  // fetch todos from the server
  const handleFetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      });
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // create a new todo item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateTodo = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          title: title,
          description: description,
        })
      });
      const data = await response.json();
      setTitle("");
      setDescription("");
      setTodos([...todos, data]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(error?.message || "Unknown error");
    }
  };

  // fetch todos on page load
  useEffect(() => {
    handleFetchTodos();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form action="post" onSubmit={handleCreateTodo}>
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
          {todos?.map((todo) => (
            <Card
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              status={todo.status}
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
