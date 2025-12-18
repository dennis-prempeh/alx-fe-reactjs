import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SearchPage from "./components/SearchPage";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Router>
      <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#111" }}>
          <strong>GitHub User Search</strong>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
      <footer
        style={{
          padding: 12,
          borderTop: "1px solid #eee",
          marginTop: 24,
          textAlign: "center",
        }}
      >
        Built with Vite + React
      </footer>
    </Router>
  );
}

export default App;
