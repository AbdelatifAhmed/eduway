import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUsersCog } from "react-icons/fa";

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
        <li>
          <NavLink to="/admin/faculty">
            <i className="fa-solid fa-school fa-fw"></i>
            <span>Faculty</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/students">
            <i className="fa-solid fa-user-tie fa-fw"></i>
            <span>Students</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/courses">
            <i className="fa-solid fa-book fa-fw"></i>
            <span>Courses</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/staff">
            <i className="fa-solid fa-users fa-fw"></i>
            <span>Staff</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/control">
            <i className="fa-solid fa-sliders fa-fw"></i>
            <span>Control</span>
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
