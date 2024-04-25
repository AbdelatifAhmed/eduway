import React from "react";
import { useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import CourseGradesTable from "../../Components/course-grades-table";
export default function CourseGrades() {
  const [changeActive, setChangeActive] = useState(true);
  return (
    <div
      className="course-grade"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div className="page">
        <Sidebar changeActive={changeActive} />
        {/* <!-- Main content --> */}
        <div className={changeActive ? "main" : "main active"}>
          {/* <!-- Top Bar (Naigation bar) --> */}
          <Navbar
            changeActive={changeActive}
            setChangeActive={setChangeActive}
          />
          {/* Conent */}
          <CourseGradesTable/>
          <CourseGradesTable/>
        </div>
      </div>
    </div>
  );
}
