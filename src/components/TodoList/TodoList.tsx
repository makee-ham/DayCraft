import { useReducer, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import Plus from "@/assets/icons/Plus";
import Bin from "@/assets/icons/Bin";
import Edit from "@/assets/icons/Edit";
import Drag from "@/assets/icons/Drag";

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
      return action.payload;
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(todos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    const updated = reordered.map((todo, idx) => ({
      ...todo,
      order: idx,
    }));

    dispatch({ type: "SET_ALL", payload: updated });
  };

  return (
    <section className="relative max-w-sm p-4 border border-base-300 bg-base-100 rounded-box space-y-4">
      <h2 className="text-2xl font-bold text-primary text-center">
        TO DO LIST
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="grid grid-cols-[1fr_auto] items-center bg-base-200 rounded-lg px-3 py-2 shadow-sm gap-2"
                    >
                      {editingId === todo.id ? (
                        <form
                          onSubmit={handleSubmitEdit}
                          className="flex gap-1 w-full"
                        >
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="input input-sm input-bordered flex-1"
                          />
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                          >
                            Save
                          </button>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() =>
                                dispatch({ type: "TOGGLE", payload: todo.id })
                              }
                              className="checkbox checkbox-sm checkbox-primary"
                            />
                            <span
                              className="flex-1 text-base-content break-words"
                              style={{
                                textDecoration: todo.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {todo.text}
                            </span>
                          </div>
                          <div className="ml-auto flex gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(todo.id);
                                setEditText(todo.text);
                              }}
                              className="btn btn-xs btn-ghost btn-circle text-primary"
                            >
                              <Edit />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({ type: "DELETE", payload: todo.id })
                              }
                              className="btn btn-xs btn-ghost btn-circle text-error"
                            >
                              <Bin />
                            </button>
                            <button
                              type="button"
                              {...provided.dragHandleProps}
                              className="text-neutral"
                            >
                              <Drag />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        type="button"
        onClick={handleClickAddBtn}
        className="absolute -bottom-4 -right-1 z-10 btn btn-circle btn-primary shadow-lg"
      >
        <Plus />
      </button>
    </section>
  );
}
