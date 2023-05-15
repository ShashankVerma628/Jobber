import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
  const { user, logoutUser } = useAppContext();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    setIsActive(!isActive);
    logoutUser();
  };

  return (
    <div className="profile-container">
      <div
        className="profile"
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        <span className="profile-name">{user?.name.charAt(0)}</span>
        <span className="profile-full-name">{user?.name}</span>
        {isActive ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      <div className={isActive ? "profile-body active" : "profile-body"}>
        <ul className="profile-body-list">
          <li className="profile-body-list-item">
            {user?.userRole === "candidate" && (
              <Link
                className="profile-body-link"
                to="/dashboard"
                onClick={() => setIsActive(!isActive)}
              >
                Dashboard
              </Link>
            )}
            {user?.userRole === "client" && (
              <Link
                to="/client/dashboard"
                className="profile-body-link"
                onClick={() => setIsActive(!isActive)}
              >
                Dashboard
              </Link>
            )}
          </li>
          <li className="profile-body-list-item">
            {user?.userRole === "candidate" && (
              <Link
                className="profile-body-link"
                to="/dashboard/profile"
                onClick={() => setIsActive(!isActive)}
              >
                Profile
              </Link>
            )}
            {user?.userRole === "client" && (
              <Link
                to="/client/profile"
                className="profile-body-link"
                onClick={() => setIsActive(!isActive)}
              >
                Profile
              </Link>
            )}
          </li>
          <li className="profile-body-list-item">
            <button onClick={handleLogout} className="profile-body-link">
              {" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
      <li className="profile-body-list-item"></li>
    </div>
  );
};

export default Profile;
