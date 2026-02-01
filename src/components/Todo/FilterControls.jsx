
export default function FilterControls({ filter, setFilter }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="flex gap-2 mb-4 text-sm">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1.5 rounded-full capitalize transition-colors ${
            filter === f 
              ? 'bg-blue-100 text-blue-700 font-bold' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}