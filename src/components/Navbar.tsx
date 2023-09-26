import "@styles/Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Navbar = (state: any) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login", { state: { isLoggedIn: true } });
    window.location.reload();
  };
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
          {state?.isLoggedIn || token !== undefined ? (
            <ul>
              <li>
                <a href="/" onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
