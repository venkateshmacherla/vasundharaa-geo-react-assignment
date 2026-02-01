import React, { useState } from 'react';
import { Search } from 'lucide-react';

const NAMES = [
  "React Developer", "Frontend Intern", "JavaScript Logic", 
  "Tailwind CSS", "Web Optimization", "Software Engineer", "Creative Design",
  "Component Modularity", "State Management", "User Experience"
];

export default function SearchList() {
  const [query, setQuery] = useState('');

  // Filtering
  const filteredNames = NAMES.filter(name => 
    name.toLowerCase().includes(query.toLowerCase())
  );

  // Highlight Logic
  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    // Split text by the search query (captured in group)
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="bg-yellow-200 text-gray-900 font-semibold rounded px-0.5">{part}</span> 
            : part
        ))}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔍 Task 5: Live Highlight</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full pl-10 p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <div className="absolute right-3 top-3.5 text-xs text-gray-400 font-medium">
          {filteredNames.length} Matches
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto flex-1 max-h-[250px] pr-1 custom-scrollbar">
        {filteredNames.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-8">No matching results.</p>
        ) : (
          filteredNames.map((name, index) => (
            <div key={index} className="p-3 border-b border-gray-50 last:border-0 hover:bg-blue-50 rounded-lg transition-colors">
              {getHighlightedText(name, query)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}