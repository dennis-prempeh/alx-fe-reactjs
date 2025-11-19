import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center">GitHub User Search</h1>
          <p className="text-center mt-2 opacity-90">Search for GitHub users by username</p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <Search />
      </main>
    </div>
  );
}

export default App;