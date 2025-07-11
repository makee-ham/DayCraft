import { useReducer, useState } from "react";
import Plus from "@assets/Plus";
import Bin from "@/assets/Bin";
import Edit from "@/assets/Edit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  order: number;
}

type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "UPDATE"; payload: { id: number; text: string } }
  | { type: "DELETE"; payload: number }
  | { type: "TOGGLE"; payload: number }
  | { type: "SET_ALL"; payload: Todo[] };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case "SET_ALL":
      return action.payload; // 드래그드롭 관련... 새 배열로 대체
    default:
      return state;
  }
}

const initialState: Todo[] = [
  { id: 1, text: "Write today’s tasks.", completed: false, order: 0 },
];

export default function TodoList() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleClickAddBtn = () => {
    if (editingId !== null && editText.trim() === "") {
      alert("Please complete the current task before adding a new one!");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: "",
      completed: false,
      order: todos.length,
    };
    dispatch({ type: "ADD", payload: newTodo });
    setEditingId(newTodo.id);
    setEditText("");
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editText.trim()) {
      alert("Please enter a task!");
      return;
    }
    if (editingId !== null) {
      dispatch({ type: "UPDATE", payload: { id: editingId, text: editText } });
      setEditingId(null);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-4 bg-base-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-primary text-center">
        TO DO LIST
      </h2>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-base-200 rounded-lg px-3 py-2 shadow-sm gap-2"
          >
            {editingId === todo.id ? (
              <form onSubmit={handleSubmitEdit} className="flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input input-sm input-bordered flex-1"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    dispatch({ type: "TOGGLE", payload: todo.id })
                  }
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span
                  className="flex-1 text-base-content"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="btn btn-xs btn-ghost text-primary"
                >
                  <Edit />
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
                  className="btn btn-xs btn-ghost text-error"
                >
                  <Bin />
                </button>
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleClickAddBtn}
          className="btn btn-circle btn-primary fixed bottom-8 right-8 shadow-lg"
        >
          <Plus />
        </button>
      </div>
    </section>
  );
}
