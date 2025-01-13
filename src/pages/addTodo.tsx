import { useState } from "react";
import TodoInput from "../components/todoInput";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { addTodosThunk } from "../redux/slices/todoSlice";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // create a new todo item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateTodo = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(addTodosThunk({title, description}))
      setTitle("");
      setDescription("");
      navigate("/todo");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(error?.message || "Unknown error");
    }
  };
  return (
    <div>
      <h1 className="text-lg">ADD TODO</h1>
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
    </div>
  );
}
