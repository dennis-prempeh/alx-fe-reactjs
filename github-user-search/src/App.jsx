import React from 'react';
import './App.css';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">GitHub User Search</h1>
      </header>
      <main className="container mx-auto p-6">
        <p className="text-lg">Ready for search component</p>
      </main>
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App;