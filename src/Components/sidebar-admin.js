import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function SidebarAdmin(props) {
  const logout = useLogout();
  const signout = async () => {
    await logout();
  };

  const { Auth } = useAuth();
  const roles = Auth?.dataDetails?.roles || [];

  const roleRoutes = {
    Administration: [
      { to: "/admin/faculty", icon: "fa-school", label: "Faculty" },
      { to: "/admin/students", icon: "fa-user-tie", label: "Students" },
      { to: "/admin/courses", icon: "fa-book", label: "Courses" },
      { to: "/admin/staff", icon: "fa-users", label: "Staff" },
      { to: "/admin/control", icon: "fa-sliders", label: "Control" },
      { to: "/admin/scheduler", icon: "fa-calendar-days", label: "scheduler" },
      { to: "/admin/reports", icon: "fa-folder-open", label: "Reports" },

    ],
    Teacher: [
      { to: "/admin/course-grades", icon: "fa-file-import", label: "Enter Grades" },
      { to: "/admin/notes", icon: "fa-file-import", label: "Notes" },
      { to: "/admin/timeTable", icon: "fa-user-tie", label: "TimeTable" }
    ],
    Staff: [
      { to: "/admin/students", icon: "fa-user-tie", label: "Students" }
    ],
    TeacherAssistant: [
      { to: "/admin/student-section", icon: "fa-user-tie", label: "Student Section" },
      { to: "/admin/timeTable", icon: "fa-user-tie", label: "TimeTable" }
    ],
    ControlMembers: [
      { to: "/admin/course-grades", icon: "fa-file-import", label: "Enter Grades" },
      { to: "/admin/final-grades", icon: "fa-file-circle-plus", label: "Enter Final Grades" },
      { to: "/admin/monitor-grades", icon: "fa-file-circle-check", label: "Monitor Grades" },
      { to: "/admin/reports", icon: "fa-folder-open", label: "Reports" },
    ]
  };

  // Set to store unique routes based on their 'to' property
  const uniqueRoutes = new Set();

  // Add routes for each role the user has
  roles.forEach(role => {
    if (roleRoutes[role]) {
      roleRoutes[role].forEach(route => uniqueRoutes.add(JSON.stringify(route)));
    }
  });

  const routeArray = Array.from(uniqueRoutes).map(route => JSON.parse(route));
    const toggle = () => {
      props.setChangeActive(!props.changeActive);
    };

  return (
    <div className={props.changeActive ? "sidebar" : "sidebar active"}>
      <div className={props.changeActive ? "logo-info" : "logo-info active"}>
        <h3 className="mt-0">
          <div>Edu<span>Way</span></div>
          <div className="inside-back-btn">
          <div className="" onClick={toggle} style={{color:"white",fontSize:"30px"}}>
              <i
                className={`fa-solid fa-circle-chevron-left`}
              ></i>
            </div>
          </div>
        </h3>
      </div>
      <ul className="list">
        <li>
          <NavLink to="/admin/basic">
            <i className="fa-solid fa-address-card fa-fw"></i>
            <span>Basic</span>
          </NavLink>
        </li>
        {routeArray.map((route, index) => (
          <li key={index}>
            <NavLink to={route.to}>
              <i className={`fa-solid ${route.icon} fa-fw`}></i>
              <span>{route.label}</span>
            </NavLink>
          </li>
        ))}
        <li className={props.changeActive ? "logout" : "logout active-1"}>
          <NavLink to='/' onClick={signout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
