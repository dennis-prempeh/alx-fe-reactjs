import React from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery(["posts"], fetchPosts, {
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Fetching…" : "Refetch"}
        </button>
        <small style={{ color: "#666" }}>Posts cached for 2 minutes</small>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {posts.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: 12,
              borderRadius: 6,
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>{p.title}</h3>
            <p style={{ margin: 0, color: "#444" }}>{p.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
