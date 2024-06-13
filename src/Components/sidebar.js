import { NavLink } from "react-router-dom";
export default function Sidebar(props) {
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
        <li className="">
          <NavLink to="/user/Basic-info">
            <i className="fa-solid fa-clipboard-list fa-fw"></i>
            <span>Basic Data</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/time-table">
            <i className="fa-solid fa-table fa-fw"></i>
            <span>Time Table</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/tuitionfees">
            <i className="fa-solid fa-money-check-dollar fa-fw"></i>
            <span>Tuition Fees</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/examtable">
            <i className="fa-solid fa-money-check-dollar fa-fw"></i>
            <span>Exam Table</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/course-grades">
            <i className="fa-solid fa-money-check-dollar fa-fw"></i>
            <span>Course Grades</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="index">
            <i className="fa-solid fa-chart-simple fa-fw"></i>
            <span>Absence Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="ind">
            <i className="fa-solid fa-person-chalkboard fa-fw"></i>
            <span>Courses Grades</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="index.html">
            <i className="fa-solid fa-chart-pie fa-fw"></i>
            <span>Student Progress</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="index.html">
            <i className="fa-solid fa-award fa-fw"></i>
            <span>Portfolio</span>
          </NavLink>
        </li>
        <li className={props.changeActive ? "logout" : "logout active-1"}>
          <NavLink to="/">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
