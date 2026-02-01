import React from 'react';
import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 font-sans">
      
      {/* Page Wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* Header */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Vasundharaa Geo Technologies
          </h1>
          <p className="text-slate-600 font-medium">
            Assignment For React Developer Intern
          </p>
        </header>

        {/* ===== TOP DASHBOARD SECTION ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Left: Todo + Timer */}
          <div className="lg:col-span-2 space-y-8">
            <TodoApp />
            <section className="bg-slate-100/70 rounded-3xl p-8 shadow-inner">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserForm />
                <SearchList />
              </div>
            </section>
          </div>

          {/* Right: Progress */}
          <div className="lg:col-span-1">
            <MultiProgressBar />
            <CountdownTimer />
          </div>

        </section>

        
      </div>
    </div>
  );
}

export default App;
