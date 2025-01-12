import { createSlice } from "@reduxjs/toolkit"

interface TodoItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  user_id?: number;
}

interface TodoState {
  todos: TodoItem[];
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  error: null
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    filterTodos: (state) => {
      state.todos = state.todos.filter(todo => todo.isCompleted === false)
    }
    // addTodo: (state, action) => {}
  }
})

export const { setTodos, filterTodos } = todoSlice.actions; // Called through dispatch

export default todoSlice.reducer;


// Redux
// 1. install @reduxjs/toolkit and react-redux
// 2. configure store
// 3. create slice with initialState and reducers
// 4. wrap App with redux provider
// 5. dispatch redux actions where required


// STORE
// SLICE
// REDUCER
// ACTION
// DISPATCH
// SELECTOR