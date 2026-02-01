import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(5); // Default start time

  useEffect(() => {
    // Check if a timer was running
    const storedEndTime = localStorage.getItem('timer_end_time');
    const storedStatus = localStorage.getItem('timer_status');
    const storedRemaining = localStorage.getItem('timer_remaining');

    if (storedEndTime && storedStatus === 'running') {
      // Calculate remaining time based on current time vs stored end time
      const remaining = Math.max(0, Math.ceil((parseInt(storedEndTime) - Date.now()) / 1000));
      setTimeLeft(remaining);
      setIsRunning(true);
    } else if (storedRemaining) {
      // If paused, load the paused state
      setTimeLeft(parseInt(storedRemaining));
      setIsRunning(false);
    }
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      // If we don't have an end time yet, set it
      if (!localStorage.getItem('timer_end_time')) {
        const endTime = Date.now() + timeLeft * 1000;
        localStorage.setItem('timer_end_time', endTime);
      }
      
      localStorage.setItem('timer_status', 'running');

      interval = setInterval(() => {
        const endTime = parseInt(localStorage.getItem('timer_end_time'));
        const secondsRemaining = Math.ceil((endTime - Date.now()) / 1000);

        if (secondsRemaining <= 0) {
          setTimeLeft(0);
          handleReset();
        } else {
          setTimeLeft(secondsRemaining);
        }
      }, 100);
    } else {
      // Cleanup on Pause/Stop
      if (!isRunning && timeLeft > 0) {
         localStorage.setItem('timer_status', 'paused');
         localStorage.setItem('timer_remaining', timeLeft);
         localStorage.removeItem('timer_end_time');
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(inputMinutes * 60);
    setIsRunning(true);
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(inputMinutes * 60);
    localStorage.removeItem('timer_end_time');
    localStorage.removeItem('timer_status');
    localStorage.removeItem('timer_remaining');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 self-start flex items-center gap-2">
        <Timer size={20}/> Task 4: Persistent Timer
      </h2>
      
      {/* Time Display */}
      <div className="text-6xl font-mono font-bold text-gray-800 mb-8 tracking-wider tabular-nums">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        {!isRunning ? (
          <button onClick={handleStart} className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all">
            <Play fill="currentColor" size={24} />
          </button>
        ) : (
          <button onClick={handlePause} className="bg-yellow-500 text-white p-4 rounded-full hover:bg-yellow-600 hover:shadow-lg hover:scale-105 transition-all">
            <Pause fill="currentColor" size={24} />
          </button>
        )}
        <button onClick={handleReset} className="bg-gray-100 text-gray-600 p-4 rounded-full hover:bg-gray-200 hover:scale-105 transition-all">
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Input Configuration */}
      {!isRunning && timeLeft === 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Set Minutes:</span>
          <input 
            type="number" 
            min="1" 
            max="60"
            value={inputMinutes}
            onChange={(e) => {
                setInputMinutes(e.target.value);
                setTimeLeft(e.target.value * 60);
            }}
            className="w-16 border rounded p-1 text-center"
          />
        </div>
      )}
    </div>
  );
}