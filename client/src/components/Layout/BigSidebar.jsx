import { Link, NavLink } from "react-router-dom";

const BigSidebar = ({ navlinks, active }) => {
  return (
    <div className={`sidebar big-sidebar ${active ? "active" : ""}`}>
      <div className="sidebar-links-container">
        {navlinks.map((navlink) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            key={navlink?.id}
            to={navlink?.path}
          >
            {navlink?.icon}
            <span>{navlink?.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BigSidebar;
