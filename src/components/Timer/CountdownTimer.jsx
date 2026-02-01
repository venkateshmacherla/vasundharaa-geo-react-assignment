import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [minutesInput, setMinutesInput] = useState(5);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedEnd = localStorage.getItem('timer_end_time');
    const savedStatus = localStorage.getItem('timer_status');
    const savedRemaining = localStorage.getItem('timer_remaining');

    if (savedStatus === 'running' && savedEnd) {
      const remaining = Math.max(
        0,
        Math.ceil((Number(savedEnd) - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);
      setRunning(true);
    } else if (savedStatus === 'paused' && savedRemaining) {
      setSecondsLeft(Number(savedRemaining));
      setRunning(false);
    } else {
      setSecondsLeft(minutesInput * 60);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!running && secondsLeft === 0) {
      setSecondsLeft(minutesInput * 60);
    }
  }, [minutesInput, running, hydrated]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;

    if (!localStorage.getItem('timer_end_time')) {
      localStorage.setItem(
        'timer_end_time',
        Date.now() + secondsLeft * 1000
      );
    }

    localStorage.setItem('timer_status', 'running');

    const interval = setInterval(() => {
      const endTime = Number(localStorage.getItem('timer_end_time'));
      const remaining = Math.ceil((endTime - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        finishTimer();
      } else {
        setSecondsLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  // ===== ACTIONS =====
  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
    localStorage.setItem('timer_status', 'paused');
    localStorage.setItem('timer_remaining', secondsLeft);
    localStorage.removeItem('timer_end_time');
  };

  const resetTimer = () => {
    setRunning(false);
    setSecondsLeft(minutesInput * 60);
    localStorage.removeItem('timer_end_time');
    localStorage.removeItem('timer_status');
    localStorage.removeItem('timer_remaining');
  };

  const finishTimer = () => {
    setRunning(false);
    setSecondsLeft(0);
    localStorage.removeItem('timer_end_time');
    localStorage.removeItem('timer_status');
    localStorage.removeItem('timer_remaining');
  };

  const displayTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white mt-3 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      <h2 className="self-start mb-4 flex items-center gap-2 text-xl font-bold">
        <Timer size={20} /> Persistent Timer
      </h2>

      <div className="mb-8 font-mono text-6xl font-bold text-gray-800">
        {displayTime(secondsLeft)}
      </div>

      <div className="mb-6 flex gap-4">
        {!running ? (
          <button
            onClick={startTimer}
            className="rounded-full bg-green-500 p-4 text-white hover:bg-green-600 hover:scale-105 transition-all"
          >
            <Play size={24} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="rounded-full bg-yellow-500 p-4 text-white hover:bg-yellow-600 hover:scale-105 transition-all"
          >
            <Pause size={24} fill="currentColor" />
          </button>
        )}

        <button
          onClick={resetTimer}
          className="rounded-full bg-gray-100 p-4 text-gray-600 hover:bg-gray-200 hover:scale-105 transition-all"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {!running && (
        <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Set Minutes:</span>
            <input
              type="number"
              min="1"
              max="60"
              value={minutesInput}
              onChange={(e) => setMinutesInput(Number(e.target.value))}
              className="w-16 rounded border p-1 text-center"
            />
          </div>

          <div className="flex gap-2">
            {[5, 10, 15, 25].map(min => (
              <button
                key={min}
                onClick={() => {
                  setMinutesInput(min);
                  setSecondsLeft(min * 60);
                }}
                className="rounded-md border px-3 py-1 text-xs hover:bg-gray-100 transition"
              >
                {min} min
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
