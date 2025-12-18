import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGitHubUser } from "../services/githubService";

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);

    fetchGitHubUser(username)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message || "Fetch error"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error)
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <Link to="/">Back</Link>
      </div>
    );

  if (!user)
    return (
      <div style={{ padding: 20 }}>
        <p>User not found.</p>
        <Link to="/">Back</Link>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back</Link>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <img
          src={user.avatar_url}
          alt="avatar"
          style={{ width: 120, height: 120, borderRadius: 8 }}
        />
        <div>
          <h2>{user.name || user.login}</h2>
          <p style={{ marginTop: 4 }}>{user.bio}</p>
          <p style={{ marginTop: 8 }}>
            <strong>Followers:</strong> {user.followers} &nbsp;{" "}
            <strong>Following:</strong> {user.following}
          </p>
          <p style={{ marginTop: 8 }}>
            <a href={user.html_url} target="_blank">
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
