import React, { useState } from 'react';

export default function MultiProgressBar() {
  const [values, setValues] = useState([
    { label: 'HTML', val: 90 },
    { label: 'CSS', val: 60 },
    { label: 'JavaScript', val: 30 },
    { label: 'React', val: 45 },
  ]);

  const handleSlide = (index, newVal) => {
    const newValues = [...values];
    newValues[index].val = parseInt(newVal, 10);
    setValues(newValues);
  };

  // Calculate average of all sub-bars
  const total = values.reduce((acc, curr) => acc + curr.val, 0);
  const average = Math.round(total / values.length);

  // Dynamic Color Logic
  const getColor = (v) => {
    if (v < 40) return 'bg-red-500 shadow-red-200';
    if (v < 70) return 'bg-yellow-500 shadow-yellow-200';
    return 'bg-green-500 shadow-green-200';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-6">📊 Task 3: Dynamic Progress</h2>
      
      {/* Main Bar */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Total Score</span>
          <span className="text-sm font-bold text-gray-900">{average}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px] ${getColor(average)}`}
            style={{ width: `${average}%` }}
          />
        </div>
      </div>

      {/* Sub Inputs */}
      <div className="space-y-5">
        {values.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
              <span>{item.label}</span>
              <span>{item.val}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={item.val}
              onChange={(e) => handleSlide(index, e.target.value)}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}