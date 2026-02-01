import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ITEMS = [
  'React Developer',
  'Frontend Intern',
  'JavaScript Logic',
  'Tailwind CSS',
  'Web Optimization',
  'Software Engineer',
  'Creative Design',
  'Component Modularity',
  'State Management',
  'User Experience',
];

export default function SearchList() {
  const [searchText, setSearchText] = useState('');

  // Filter items based on input
  const results = ITEMS.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  // Highlight matched text
  const renderHighlighted = (value, term) => {
    if (!term.trim()) return value;

    const matcher = new RegExp(`(${term})`, 'gi');
    const segments = value.split(matcher);

    return (
      <span>
        {segments.map((seg, idx) =>
          seg.toLowerCase() === term.toLowerCase() ? (
            <span
              key={idx}
              className="rounded bg-yellow-200 px-0.5 font-semibold text-gray-900"
            >
              {seg}
            </span>
          ) : (
            seg
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        🔍 Task 5: Live Search & Highlight
      </h2>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Type to search..."
          className="w-full rounded-lg border border-gray-200 p-2.5 pl-10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span className="absolute right-3 top-3.5 text-xs font-medium text-gray-400">
          {results.length} Matches
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 max-h-[250px] custom-scrollbar">
        {results.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-400">
            No matching results.
          </p>
        ) : (
          results.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border-b border-gray-50 p-3 transition-colors hover:bg-blue-50 last:border-0"
            >
              {renderHighlighted(item, searchText)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
