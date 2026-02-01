import React, { useState } from 'react';

export default function MultiProgressBar() {
  const [progressItems, setProgressItems] = useState([
    { label: 'HTML', val: 90 },
    { label: 'CSS', val: 60 },
    { label: 'JavaScript', val: 30 },
    { label: 'React', val: 45 },
  ]);

  const updateValue = (idx, value) => {
    setProgressItems(list => {
      const updated = [...list];
      updated[idx] = { ...updated[idx], val: Number(value) };
      return updated;
    });
  };

  // Compute average score
  const totalScore = progressItems.reduce((sum, item) => sum + item.val, 0);
  const avgScore = Math.round(totalScore / progressItems.length);

  // 🎨 Updated Color Logic (Modern UI)
  const resolveColor = (score) => {
    if (score < 40) return 'bg-blue-400 shadow-blue-200';
    if (score < 70) return 'bg-indigo-500 shadow-indigo-200';
    return 'bg-violet-600 shadow-violet-300';
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        📊 Task 3: Skill Progress Overview
      </h2>

      {/* Overall Progress */}
      <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-semibold text-gray-700">
            Total Score
          </span>
          <span className="text-sm font-bold text-gray-900">
            {avgScore}%
          </span>
        </div>

        <div className="h-5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full shadow-[0_0_10px] transition-all duration-500 ease-out ${resolveColor(
              avgScore
            )}`}
            style={{ width: `${avgScore}%` }}
          />
        </div>
      </div>

      {/* Individual Sliders */}
      <div className="space-y-5">
        {progressItems.map((entry, idx) => (
          <div key={idx}>
            <div className="mb-1.5 flex justify-between text-xs font-medium text-gray-500">
              <span>{entry.label}</span>
              <span>{entry.val}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={entry.val}
              onChange={(e) => updateValue(idx, e.target.value)}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-100 accent-indigo-600 hover:accent-indigo-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
