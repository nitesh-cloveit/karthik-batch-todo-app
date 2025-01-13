import { useState, useEffect } from "react";
import Card from "../components/card";
import Header from "../components/header";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router";
import { withFetch } from "../hoc/withFetch";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTodosThunk } from "../redux/slices/todoSlice";

interface TodoItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  user_id?: number;
}

function Todo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector((state) => state.todo)

  // fetch todos on page load
  useEffect(() => {
   dispatch(fetchTodosThunk())
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  console.log({error})

  const completedTodos = todos?.filter((todo) => todo.isCompleted) || [];

  return (
    <div className="app">
      <Header />
      <button onClick={() => navigate("add")}>Add Task</button>
      <button onClick={() => {
        dispatch({ type: "todos/filterTodos" })
      }}>Filter</button>
      <div className="container">
        <div>
          <h1>Todo List</h1>
          {todos
            ?.filter((todo) => !todo.isCompleted)
            .sort((a, b) => a.id - b.id)
            .map((todo) => (
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
              />
            ))}
        </div>

        {completedTodos.length > 0 && (
          <div>
            <h1>Completed Todo List</h1>
            {completedTodos.map((todo) => (
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const TodoWithFetch = withFetch(Todo, `${BASE_URL}/todos`);

export {TodoWithFetch};
