import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        Invest<span>IQ</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/features">Features</Link>
        </li>

        
        <li>
          <a href="/pricing">Pricing</a>
        </li>

        <li>
          <a href="/about">About</a>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;