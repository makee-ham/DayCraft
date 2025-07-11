import { useReducer, useState } from "react";

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
    const newTodo: Todo = {
      id: Date.now(),
      text: "New Task",
      completed: false,
      order: todos.length,
    };
    dispatch({ type: "ADD", payload: newTodo });
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch({ type: "UPDATE", payload: { id: editingId, text: editText } });
      setEditingId(null);
    }
  };

  return (
    <section>
      <h2>TO DO LIST</h2>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {editingId === todo.id ? (
              <form onSubmit={handleSubmitEdit}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <input type="checkbox" />
                <span
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
                >
                  Edit
                </button>
                <button type="button">Delete</button>
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleClickAddBtn}
          className="btn btn-circle btn-secondary"
        >
          +
        </button>
      </div>
    </section>
  );
}
