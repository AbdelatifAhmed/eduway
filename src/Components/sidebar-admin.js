import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

export default function SidebarAdmin(props) {
  const logout = useLogout()
  const signout = async ()=>{
    await logout();
  }
  const {Auth} = useAuth();
  const role = Auth?.dataDetails?.roles;
  return (
    <div className={props.changeActive ? "sidebar" : "sidebar active"}>
      <div className={props.changeActive ? "logo-info" : "logo-info active"}>
        <h3 className="mt-0">
          Edu<span>Way</span>
        </h3>
      </div>
      <ul className="list">
      <li>
          <NavLink to="/admin/basic">
            <i className="fa-solid fa-address-card fa-fw"></i>
            <span>Basic</span>
          </NavLink>
        </li>
        { role &&  role[0] === "Administration" ? 
        <>
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
        <li>
          <NavLink to="/admin/reports">
            <i className="fa-solid fa-folder-open fa-fw"></i>
            <span>Reports</span>
          </NavLink>
        </li>
        </> :role && role[0] === "Teacher"  ? 
        <>
        <li>
          <NavLink to="/admin/course-grades">
            <i className="fa-solid fa-file-import fa-fw"></i>
            <span>Enter Grades</span>
          </NavLink>
        </li>
        <li>
         <NavLink to="/admin/notes">
           <i className="fa-solid fa-file-import fa-fw"></i>
           <span>Notes</span>
         </NavLink>
       </li>
        </> : role && role[0] === "Staff" ? 
        <>
        <li>
          <NavLink to="/admin/students">
            <i className="fa-solid fa-user-tie fa-fw"></i>
            <span>Students</span>
          </NavLink>
        </li>
        </> : role && role[0] === "TeacherAssistant" ?
       <>
       <li>
         <NavLink to="/admin/course-grades">
           <i className="fa-solid fa-file-import fa-fw"></i>
           <span>Enter Grades</span>
         </NavLink>
       </li>
       <li>
         <NavLink to="/admin/notes">
           <i className="fa-solid fa-file-import fa-fw"></i>
           <span>Notes</span>
         </NavLink>
       </li>
       </>
        :
        <>
        <li>
          <NavLink to="/admin/final-grades">
            <i className="fa-solid fa-file-circle-plus fa-fw"></i>
            <span>Enter Final Grades</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/monitor-grades">
            <i className="fa-solid fa-file-circle-check fa-fw"></i>
            <span>Monitor Grades</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports">
            <i className="fa-solid fa-folder-open fa-fw"></i>
            <span>Reports</span>
          </NavLink>
        </li>
        </> }
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
