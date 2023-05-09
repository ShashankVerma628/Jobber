import { NavLink } from "react-router-dom";

const SmallSidebar = ({ navlinks, active, setSidebarActive }) => {
  return (
    <div className={`sidebar small-sidebar ${active ? "active" : ""}`}>
      <div className="sidebar-links-container">
        {navlinks.map((navlink) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            key={navlink?.id}
            to={navlink?.path}
            onClick={() => setSidebarActive(!active)}
          >
            {navlink?.icon}
            <span>{navlink?.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SmallSidebar;
