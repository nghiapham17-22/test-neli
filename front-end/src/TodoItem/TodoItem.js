import React, { useState } from "react";
import "./TodoItem.css";

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(todo.id, text);
    setEditing(false);
  };

  return (
    <li>
      {editing ? (
        <form onSubmit={handleSubmit} className="todo-item">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            className="text"
          />
        </form>
      ) : (
        <div className="todo-item">
          <input
            type="checkbox"
            checked={todo.isFinished}
            onChange={() => onToggle(todo.id)}
          />
          <span className="text">{todo.text}</span>
          <button className=" button" onClick={handleDoubleClick}>
            Edit
          </button>
          <button className="  button" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
