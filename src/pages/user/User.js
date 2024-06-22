import React, { useState } from "react";
import Sidebar from "../../Components/sidebar";
import { Outlet } from "react-router-dom";
import MyNavbar from "../../Components/navbar";


export default function User() {
  const [changeActive, setChangeActive] = useState(true);
  return (
    <div>
      <div className="page">
        <Sidebar changeActive={changeActive} setChangeActive={setChangeActive}/>
        {/* <!-- Main content --> */}
        <div className={changeActive ? "main" : "main active"}>
          {/* <!-- Top Bar (Naigation bar) --> */}
          <MyNavbar
            changeActive={changeActive}
            setChangeActive={setChangeActive}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
