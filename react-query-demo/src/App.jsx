import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        <h1>React Query Posts Demo</h1>
        <p className="read-the-docs">
          This page fetches posts from JSONPlaceholder using React Query. Try
          refetching and watch how cached data keeps the UI fast.
        </p>
        <PostsComponent />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
