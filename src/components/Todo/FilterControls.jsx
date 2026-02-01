export default function FilterControls({ filter, setFilter }) {
  const filterOptions = ['all', 'active', 'completed'];

  return (
    <div className="mb-4 flex gap-2 text-sm">
      {filterOptions.map(option => {
        const isSelected = filter === option;

        return (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-1.5 capitalize transition-colors ${
              isSelected
                ? 'bg-blue-100 font-bold text-blue-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
