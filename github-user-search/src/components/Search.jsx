import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = (e.target.elements.username.value || "").trim();
    if (!name) return;

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const data = await fetchUserData(name);
      setUsers([data]);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && users.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {users.map((user) => (
            <div key={user.id ?? user.login} style={{ marginBottom: 16 }}>
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                style={{ width: 96, borderRadius: 8 }}
              />
              <h3>{user.login}</h3>
              <p>{user.name}</p>
              <p>{user.bio}</p>
              {user.location && <p>Location: {user.location}</p>}
              {user.html_url && (
                <p>
                  <a href={user.html_url} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && !error && users.length === 0 && query.trim() !== "" && (
        <p>Looks like we cant find the user</p>
      )}
    </div>
  );
};

export default Search;
