import React from "react";
import { useState } from "react";
import SidebarAdmin from "../../Components/sidebar-admin";
import Navbar from "../../Components/navbar";
import { Outlet } from "react-router-dom";
export default function Admin() {
  const [changeActive, setChangeActive] = useState(true);

  return (
    <>
      <div className="page">
        <SidebarAdmin changeActive={changeActive} />
        {/* <!-- Main content --> */}
        <div className={changeActive ? "main" : "main active"}>
          {/* <!-- Top Bar (Naigation bar) --> */}
          <Navbar
            changeActive={changeActive}
            setChangeActive={setChangeActive}
          />
          {/*  Contnet */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
