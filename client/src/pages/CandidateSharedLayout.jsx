import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar } from "../components";
import { candidateNavLinks } from "../assets/NavLinks";
import { FaBars } from "react-icons/fa";

const CandidateSharedLayout = () => {
  const [active, setSidebarActive] = useState(true);

  return (
    <div className="wrapper">
      <SmallSidebar
        active={active}
        navlinks={candidateNavLinks}
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
        <BigSidebar active={active} navlinks={candidateNavLinks} />
        <div className="page-right-wrapper client-right-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CandidateSharedLayout;
