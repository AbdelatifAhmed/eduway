import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import CourseGradesTable from "../../Components/course-grades-table";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
export default function CourseGrades() {
  const [changeActive, setChangeActive] = useState(true);
  const axios = useAxiosPrivate()
  const [courseGrades,setCourseGrades] = useState([])
  const [studentName,setStudentName] = useState()
  const getStudentGrades = ()=>{
    axios.get(`api/student/result`)
    .then(res=>{
      setCourseGrades(res?.data?.data?.studentResultDeltiels)
      setStudentName(res?.data?.data?.studentName)
    })
  }

  useEffect(()=>{
    getStudentGrades()
  },[])
  return (
    <div
      className="course-grade"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div className="page">
        <Sidebar changeActive={changeActive} setChangeActive={setChangeActive}/>
        {/* <!-- Main content --> */}
        <div className={changeActive ? "main" : "main active"}>
          {/* <!-- Top Bar (Naigation bar) --> */}
          <Navbar
            changeActive={changeActive}
            setChangeActive={setChangeActive}
          />
          {/* Conent */}
          {courseGrades ? courseGrades?.map((item,index)=>(
            <CourseGradesTable key={index} studentName={studentName} data={item}/>
          )):
          "NO Data"
          }
        </div>
      </div>
    </div>
  );
}
