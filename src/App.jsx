import React from 'react';
import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Vasundharaa Geo Technologies
          </h1>
          <p className="text-slate-500 font-medium">React Developer Intern Assignment</p>
        </header>

        {/* Masonry-like Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          
          {/* Column 1 */}
          <div className="space-y-6">
            <TodoApp />
            <CountdownTimer />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <UserForm />
            <SearchList />
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
             <MultiProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;