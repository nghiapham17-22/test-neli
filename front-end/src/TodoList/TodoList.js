import React from "react";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList({ todos, setTodos, onDelete, onToggle }) {
  const handleEditTodo = (id, text) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodos.find((todo) => todo.id === id)),
    });
  };
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={handleEditTodo}
        />
      ))}
    </ul>
  );
}
