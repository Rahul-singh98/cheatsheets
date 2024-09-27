import React, { useState, useCallback, useEffect } from "react";
import { ListPlus } from "lucide-react";

// Child component that receives a callback
const TodoItem = React.memo(({ todo, onToggle }) => {
  console.log(`Rendering TodoItem: ${todo.text}`);
  return (
    <li
      onClick={() => onToggle(todo.id)}
      className={`cursor-pointer p-2 mb-2 rounded ${
        todo.completed ? "bg-green-200" : "bg-gray-200"
      }`}
    >
      {todo.text}
    </li>
  );
});

// Parent component
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [count, setCount] = useState(0);

  // Callback to toggle todo completion status
  const handleToggle = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  // Effect to demonstrate re-renders
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        useCallback Example: Todo List
      </h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Add new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <ListPlus className="mr-2" /> Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
        ))}
      </ul>

      <p className="mt-4">Component re-rendered {count} times</p>
    </div>
  );
};

export default TodoList;
