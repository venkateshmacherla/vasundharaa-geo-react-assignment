import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';
import { Plus } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage('todo_list', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setInputValue('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📝 Task 1: Enhanced Todo</h2>
      
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
        </button>
      </form>

      <FilterControls filter={filter} setFilter={setFilter} />

      <ul className="space-y-1 overflow-y-auto flex-1 max-h-[300px] pr-1 custom-scrollbar">
        {filteredTodos.length === 0 && (
          <p className="text-gray-400 text-center py-8 italic">No tasks found.</p>
        )}
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo} 
          />
        ))}
      </ul>
    </div>
  );
}