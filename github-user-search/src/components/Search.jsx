import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const response = await fetchUserData(username.trim());
      setUser(response.data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500 text-xl">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-5 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {user && (
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold text-lg"
          >
            @{user.login} → View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;