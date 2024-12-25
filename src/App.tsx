import { useState } from "react";
import Header from "./components/header";
import Card from "./components/card";
import TodoInput from "./components/todoInput";

interface TodoItem {
  title: string;
  description: string;
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (e: any) => {
    e.preventDefault();
    setTodos([...todos, { title, description }]);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* <input
          type="text"
          value={title}
          name="title"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <form onSubmit={addTodo}>
          <TodoInput
            value={title}
            name="Title"
            placeholder="Enter Title"
            onChange={setTitle}
          />
          <TodoInput
            value={description}
            name="Description"
            placeholder="Enter Description"
            onChange={setDescription}
          />

          <button type="submit">Add</button>
        </form>

        <div>
          {todos.length > 0 &&
            todos.map((todo, index) => (
              <Card
                key={index}
                title={todo.title}
                description={todo.description}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
// Component based
// code reusable
// JSX
// declaritive
// virtual dom
// props
