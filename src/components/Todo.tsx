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
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

const Todo = () =>{
  const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
  const totalTasks: number = todos.length;
  const completedTask: number = todos.filter(t => t.completed).length;
  const activeTask:  number = totalTasks - completedTask

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])

  const handleClearAll = () => {
    dispatch({type: "CLEAR"})
  }

  return (
    <>
      <div className="max-w-sm mx-auto p-6">
        <h1 className="text-center text-2xl mb-4">To-Do List</h1>
        <TodoForm dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch} />

        {todos.length > 0 && (
            <>
              <div className="justify-between flex border-t mt-4 pt-2">
                <span>Total: {totalTasks}</span>
                <span>Active: {activeTask}</span>
                <span>Completed: {completedTask}</span>
              </div>
              <div className="text-end mt-4">
                <button
                    onClick={handleClearAll}
                    className="bg-cf-dark-red text-white py-2 px-4 rounded">Clear All</button>
              </div>
            </>
        )
        }

      </div>
    </>
  )
};

export default Todo;
