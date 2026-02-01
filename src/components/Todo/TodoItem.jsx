import React from 'react';
import { Trash2, Check, Circle } from 'lucide-react';

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transition-colors border-b border-gray-100 last:border-0">
      <div 
        className="flex items-center gap-3 cursor-pointer flex-1" 
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.completed ? (
          <Check className="text-green-500" size={20} />
        ) : (
          <Circle className="text-gray-300" size={20} />
        )}
        <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {todo.text}
        </span>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)} 
        className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all p-1"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}