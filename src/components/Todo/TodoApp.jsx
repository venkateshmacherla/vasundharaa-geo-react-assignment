import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';
import { Plus } from 'lucide-react';

export default function TodoApp() {
  const [todoItems, setTodoItems] = useLocalStorage('todo_list', []);
  const [taskInput, setTaskInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setTodoItems(prev => [
      ...prev,
      {
        id: Date.now(),
        text: taskInput,
        completed: false,
      },
    ]);

    setTaskInput('');
  };

  const handleToggle = (taskId) => {
    setTodoItems(items =>
      items.map(item =>
        item.id === taskId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const handleDelete = (taskId) => {
    setTodoItems(items => items.filter(item => item.id !== taskId));
  };

  const visibleTodos = todoItems.filter(item => {
    if (activeFilter === 'active') return !item.completed;
    if (activeFilter === 'completed') return item.completed;
    return true;
  });

  return (
    <div className="p-6 rounded-xl border border-gray-200 shadow-sm bg-white/90 backdrop-blur flex flex-col h-small">
      
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📝 Task 1: Todo Task Manager
      </h2>

      <form onSubmit={handleAdd} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      <FilterControls filter={activeFilter} setFilter={setActiveFilter} />

      <ul className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-[300px] custom-scrollbar">
        {visibleTodos.length === 0 && (
          <p className="py-8 text-center text-gray-400 italic">
            No tasks found.
          </p>
        )}

        {visibleTodos.map(task => (
          <TodoItem
            key={task.id}
            todo={task}
            toggleComplete={handleToggle}
            deleteTodo={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
