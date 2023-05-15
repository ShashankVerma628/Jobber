import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Profile from "./Profile";

const Header = () => {
  const { user } = useAppContext();
  return (
    <div className="header-container">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="navigation-container">
        <div className="header-middle-container">
          <Link to="/why-jobber" className="link desktop-only header-link">
            Why Jobber ?
          </Link>
          <Link to="/" className="link header-link active">
            Browse Jobs
          </Link>
        </div>
        <div className="header-right-container">
          {user ? (
            <Profile />
          ) : (
            <Link to="/login" className="btn header-btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
