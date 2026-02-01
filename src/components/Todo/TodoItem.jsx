import React from 'react';
import { Trash2, Check, Circle } from 'lucide-react';

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  const isDone = todo.completed;

  return (
    <li className="flex justify-between items-center p-3 rounded-lg border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50 group">
      
      <div
        className="flex items-center gap-3 flex-1 cursor-pointer"
        onClick={() => toggleComplete(todo.id)}
      >
        {isDone ? (
          <Check size={20} className="text-green-500" />
        ) : (
          <Circle size={20} className="text-gray-300" />
        )}

        <p className={isDone ? 'line-through text-gray-400' : 'text-gray-700'}>
          {todo.text}
        </p>
      </div>

      <button
        type="button"
        aria-label="Remove task"
        onClick={() => deleteTodo(todo.id)}
        className="p-1 text-red-400 opacity-0 group-hover:opacity-100 transition hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>

    </li>
  );
}
