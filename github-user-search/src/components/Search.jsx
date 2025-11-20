import { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 30;

  const buildQuery = () => {
    let q = '';
    if (query) q += `${query}`;
    if (location) q += `+location:${encodeURIComponent(location)}`;
    if (minRepos) q += `+repos:>=${minRepos}`;
    return q || 'alx'; // fallback so API never gets empty q
  };

  const handleSearch = async (newPage = 1) => {
    setLoading(true);
    setError('');
    try {
      const q = buildQuery();
      const res = await searchUsers(q, newPage, perPage);
      if (newPage === 1) {
        setUsers(res.data.items);
      } else {
        setUsers(prev => [...prev, ...res.data.items]);
      }
      setPage(newPage);
    } catch (err) {
      setError('No users found matching your criteria');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Location (e.g. Lagos)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Min repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Search Users
        </button>
      </form>

      {loading && page === 1 && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={user.avatar_url} alt={user.login} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{user.login}</h3>
              {user.location && <p className="text-gray-600 text-sm">Location: {user.location}</p>}
              <p className="text-gray-600 text-sm">Repos: {user.public_repos || 'N/A'}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-600 hover:underline font-medium"
              >
                View Profile →
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && users.length % perPage === 0 && (
        <div className="text-center mt-10">
          <button
            onClick={() => handleSearch(page + 1)}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Loading more...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;