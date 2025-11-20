import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">GitHub User Search</h1>
          <p className="mt-2 text-xl opacity-90">Advanced search by location & repos</p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <Search />
      </main>
    </div>
  );
}

export default App;