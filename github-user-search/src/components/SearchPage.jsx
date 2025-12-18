import { useState } from "react";
import { Link } from "react-router-dom";
import { searchUsersAdvanced } from "../services/githubService";

const PER_PAGE = 10;

const SearchPage = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasCriteria = () => {
    return (
      username.trim() !== "" || location.trim() !== "" || minRepos.trim() !== ""
    );
  };

  const buildParams = (targetPage) => {
    return {
      username: username.trim() || undefined,
      location: location.trim() || undefined,
      minRepos: minRepos.trim() || undefined,
      perPage: PER_PAGE,
      page: targetPage,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasCriteria()) {
      setError("Please enter at least one search criteria.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setPage(1);

    try {
      const data = await searchUsersAdvanced(buildParams(1));
      setResults(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await searchUsersAdvanced(buildParams(nextPage));
      setResults((prev) => [...prev, ...(data.items || [])]);
      setTotalCount(data.total_count || totalCount);
      setPage(nextPage);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const hasMore = results.length < totalCount;

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-center sm:text-left">
          GitHub User Search
        </h1>
        <p className="text-slate-300 mb-6 text-sm sm:text-base">
          Search for GitHub users by username, location, and minimum public
          repositories.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/80 rounded-xl border border-slate-700 p-4 sm:p-6 shadow-sm space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="e.g. gaearon"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 rounded-md border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="location"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Lagos"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-10 rounded-md border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="minRepos"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Min. public repos
              </label>
              <input
                id="minRepos"
                type="number"
                min={0}
                inputMode="numeric"
                placeholder="e.g. 10"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                className="h-10 rounded-md border border-slate-600 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Searching…" : "Search"}
            </button>

            <p className="text-xs text-slate-400">
              Tip: combine fields for more precise results.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-2 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-100"
            >
              {error}
            </div>
          )}
        </form>

        <section aria-label="Search results" className="mt-8 space-y-4">
          {totalCount > 0 && (
            <p className="text-sm text-slate-300">
              Found{" "}
              <span className="font-semibold">
                {totalCount.toLocaleString()}
              </span>{" "}
              users
            </p>
          )}

          {!loading && !error && results.length === 0 && totalCount === 0 && (
            <p className="text-sm text-slate-400">
              Start by entering one or more search criteria above, then hit
              Search.
            </p>
          )}

          <ul className="grid gap-4 sm:grid-cols-2">
            {results.map((user) => (
              <li
                key={user.id || user.login}
                className="rounded-lg border border-slate-700 bg-slate-800/80 p-4 text-left shadow-sm flex gap-3"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="h-14 w-14 flex-shrink-0 rounded-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">
                      {user.name || user.login}
                    </span>
                    <span className="text-xs text-slate-400">
                      @{user.login}
                    </span>
                  </div>
                  {user.location && (
                    <p className="text-xs text-slate-300">
                      Location: {user.location}
                    </p>
                  )}
                  {typeof user.public_repos === "number" && (
                    <p className="text-xs text-slate-300">
                      Public repos: {user.public_repos}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-sky-400 hover:text-sky-300"
                    >
                      View on GitHub
                    </a>
                    <Link
                      to={`/user/${user.login}`}
                      className="text-xs font-medium text-slate-300 hover:text-white"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:opacity-60"
              >
                {loading ? "Loading…" : "Load more results"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SearchPage;
