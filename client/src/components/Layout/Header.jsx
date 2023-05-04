import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Header = () => {
  const { user, logoutUser } = useAppContext();
  return (
    <div className="header-container">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="navigation-container">
        <div className="header-right-container">
          <Link to="/why-jobber" className="link header-link">
            Why Jobber ?
          </Link>
          <Link to="/" className="link header-link active">
            Browse Jobs
          </Link>
        </div>
        <div className="header-right-container">
          {user ? (
            <button
              onClick={() => logoutUser()}
              className="btn header-btn btn-primary"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn header-btn btn-primary">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
