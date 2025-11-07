import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}
      >
        Home
      </Link>
      <Link
        to="/about"
        style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}
      >
        About
      </Link>
      <Link
        to="/services"
        style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}
      >
        Services
      </Link>
      <Link
        to="/contact"
        style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}
      >
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
