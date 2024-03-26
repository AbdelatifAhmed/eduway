import { useState } from "react";
import avatar from '../images/avatar.jpg'
export default function Navbar(props) {
  const toggle = () => {
    props.setChangeActive(!props.changeActive);
  };
  return (
    <div className="topbar">
      <div className="toggle-search">
        <span className="toggle" onClick={toggle}>
          <i className="fa-solid fa-bars"></i>
        </span>
        <span className="search">
          <label htmlFor="">
            <input type="text" placeholder="Search Here" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
        </span>
      </div>
      <div className="user">
        <i className="fa-solid fa-circle-question fa-fw"></i>
        <i className="fa-solid fa-gear fa-fw"></i>
        <i className="fa-regular fa-bell fa-fw"></i>
        <img src={avatar} alt="Avatar" />
        {/* <!-- <p id="name">"Abdo Ahmed"</p> --> */}
      </div>
    </div>
  );
}
