import "@styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="menu-container">
        {/* <!-- burger menu --> */}
        <input type="checkbox" aria-label="Toggle menu" />
        <Link to="/" className="menu-logo">
          <img
            src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png"
            alt=""
          />
        </Link>

        {/* <!-- menu items --> */}
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
