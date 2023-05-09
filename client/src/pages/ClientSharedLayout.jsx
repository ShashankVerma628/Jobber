import { useState } from "react";
import { useAppContext } from "../context/appContext";

import { Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar } from "../components";
import { clientNavLinks } from "../assets/NavLinks";
import { FaBars } from "react-icons/fa";

const ClientSharedLayout = () => {
  const [active, setSidebarActive] = useState(true);

  return (
    <div className="wrapper">
      <SmallSidebar
        active={active}
        navlinks={clientNavLinks}
        setSidebarActive={setSidebarActive}
      />
      <button
        type="button"
        className="sidebar-btn"
        onClick={() => setSidebarActive(!active)}
      >
        <FaBars />
      </button>
      <div className="page-container client-page-container">
        <BigSidebar active={active} navlinks={clientNavLinks} />
        <div className="page-right-wrapper client-right-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientSharedLayout;
