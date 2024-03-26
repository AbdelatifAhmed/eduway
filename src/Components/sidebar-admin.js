import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function SidebarAdmin(props) {
  const [changeActive, setChangeActive] = useState(true);
  return (
    <div className={props.changeActive ? "sidebar" : "sidebar active"}>
      <div className={props.changeActive ? "logo-info" : "logo-info active"}>
        <h3 className="mt-0">
          Edu<span>Way</span>
        </h3>
      </div>
      <ul className="list">
        <li >
          <NavLink to="/admin/faculty">
            <i className="fa-solid fa-clipboard-list fa-fw"></i>
            <span>Faculty</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/students">
            <i className="fa-solid fa-table fa-fw"></i>
            <span>Students</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/courses">
            <i className="fa-solid fa-money-check-dollar fa-fw"></i>
            <span>Courses</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/staff">
            <i className="fa-solid fa-money-check-dollar fa-fw"></i>
            <span>Staff</span>
          </NavLink>
        </li>
        <li className={props.changeActive ? "logout" : "logout active-1"}>
          <NavLink to="s">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
