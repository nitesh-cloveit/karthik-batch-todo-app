import { useState, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/card";
import TodoInput from "./components/todoInput";

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
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [error, setError] = useState("");

  // fetch todos from the server
  const handleFetchTodos = async () => {
    try {
      // http://localhost:3000/todos
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // create a new todo item
  const handleCreateTodo = async () => {
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

  // deletes item from the todos array
  const handleDelete = (id: number) => {
    try {
      fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        // headers: {
        //   "Authorization": `Bearer ${token}`
        // }
      });
    } catch(err) {
      console.log(err);
    }
  };

  // update todo item
  // const handleEdit = (index: number, title: string, description?: string) => {
  //   if (isTitleSame(title)) {
  //     setError("Title already exists");
  //     return;
  //   }
  //   if (todos) {
  //     const newTodos = [...todos];
  //     newTodos?.map((todo, i) => {
  //       if (i === index) {
  //         todo.title = title;
  //         if (description) {
  //           todo.description = description;
  //         }
  //       }
  //     });
  //     console.log(newTodos);
  //     setTodos(newTodos);
  //   }
  // };

  // fetch todos on page load
  useEffect(() => {
    handleFetchTodos();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form onSubmit={handleCreateTodo}>
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
              title={todo.title}
              description={todo.description}
              status={todo.status}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => {}}
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
