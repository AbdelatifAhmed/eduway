import React from "react";
import { useState } from "react";
import SidebarAdmin from "../../Components/sidebar-admin";
import MyNavbar from "../../Components/navbar";
import { Outlet } from "react-router-dom";
export default function Admin() {
  const [changeActive, setChangeActive] = useState(true);

  return (
    <>
      <div className="page">
        <SidebarAdmin changeActive={changeActive}  setChangeActive={setChangeActive}/>
        {/* <!-- Main content --> */}
        <div className={changeActive ? "main" : "main active"}>
          {/* <!-- Top Bar (Naigation bar) --> */}
          <MyNavbar
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
