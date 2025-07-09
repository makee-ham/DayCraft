import { useReducer } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  order: number;
}

type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "DELETE"; payload: number }
  | { type: "TOGGLE"; payload: number }
  | { type: "SET_ALL"; payload: Todo[] };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
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

  return (
    <section>
      <h2>TO DO LIST</h2>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
