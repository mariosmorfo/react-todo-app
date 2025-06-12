import { useState, useEffect, useRef } from "react";
import type { TodoFormProps } from "../types.ts";


const TodoForm = ({ dispatch }: TodoFormProps) => {

  const [text, setText] = useState("");
  const inputref = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch({type: "ADD", payload: text});
      setText("");
      inputref.current?.focus();
    }
  };

  useEffect(() => {
    inputref.current?.focus();
  }, [])

  return (
    <>
      <form
        className="flex gap-4 mb-4"
        onSubmit={handleSubmit}
      >
        <input
            ref={inputref}
          type="text"
          value={text}
          onChange={handleChange}
          className="flex-1 border p-2 rounded"
          placeholder="New task.."
        />
        <button
          type="submit"
          className="bg-cf-dark-gray text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </>
  )
};

export default TodoForm;