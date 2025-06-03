import {useReducer, useEffect} from 'react';
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type { TodoProps, Action} from "../types.ts"

const getInitialTodos = () => {
 const stored = localStorage.getItem("todos");
 return stored ? JSON.parse(stored) : []
}

const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        }
      ];
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);
    case "EDIT":
      return state.map( todo =>
        todo.id === action.payload.id
        ? {...todo, text: action.payload.newText}
        : todo
      );
    case "COMPLETE":
      return state.map( todo =>
        todo.id === action.payload
        ? {...todo, completed: !todo.completed}
        : todo
      );
    default:
      return state;
  }
};

const Todo = () =>{
  const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])
  return (
    <>
      <div className="max-w-sm mx-auto p-6">
        <h1 className="text-center text-2xl mb-4">To-Do List</h1>
        <TodoForm dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch} />
      </div>
    </>
  )
};

export default Todo;
