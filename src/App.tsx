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

  // const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (isTitleSame(title)) {
  //     setError("Title already exists");
  //     return;
  //   }
  //   if (todos?.length) {
  //     // todos is null initially
  //     setTodos([...todos, { title, description }]);
  //   } else {
  //     setTodos([{ title, description }]);
  //   }
  //   setTitle("");
  //   setDescription("");
  //   setError("");
  //   // }
  // };

  const isTitleSame = (title: string) => {
    return todos?.some((todo) => todo.title === title);
  };

  // fetch data from local storage
  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  //   setTodos(todos);
  // }, []); // [] means it will run only once

  /* store data in local storage */
  useEffect(() => {
    if (todos !== null) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); // it will run whenever todos changes

  // deletes item from the todos array
  const handleDelete = (index: number) => {
    if (todos) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  const handleEdit = (index: number, title: string, description?: string) => {
    if (isTitleSame(title)) {
      setError("Title already exists");
      return;
    }
    if (todos) {
      const newTodos = [...todos];
      newTodos?.map((todo, i) => {
        if (i === index) {
          todo.title = title;
          if (description) {
            todo.description = description;
          }
        }
      });
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const createTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          description: description,
          user_id: 1
        })
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      // http://localhost:3000/todos
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form onSubmit={createTodo}>
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
              onEdit={(updatedTitle, updatedDescription) =>
                handleEdit(index, updatedTitle, updatedDescription)
              }
              // isEditing={isEditing}
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
