import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const userString = localStorage.getItem("trail_user");
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromStorage();
  const isAdmin = user?.isAdmin === "true";

  const handleLogout = () => {
    localStorage.removeItem("trail_user");
    navigate("/");
  };

  return (
    <ul className="navbar">
      <li className="navbar-home">
        <Link className="navbar-link" to="take-me-home">
          HOME
        </Link>
      </li>
      <li className="navbar-item dropdown">
        <span className="navbar-trails">TRAILS</span>
        <ul className="dropdown-content">
          {isAdmin && (
            <>
              <li>
                <Link className="navbar-link" to="my-trails">
                  View My Trails
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="create-trails">
                  Add a New Adventure!
                </Link>
              </li>
            </>
          )}
          <li>
            <Link className="navbar-link" to="all-trails">
              View All Trails
            </Link>
          </li>
        </ul>
      </li>
      <li className="navbar-logout">
        <button className="navbar-link logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </li>
    </ul>
  );
};
