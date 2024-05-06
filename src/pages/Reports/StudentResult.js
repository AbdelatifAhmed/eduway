import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";


export default function StudentResult() {
  const axios = useAxiosPrivate()
  const StudentId = useParams();
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios(`api/Control/SISR/${StudentId.studentId}`)
      .then((res) => {
        setStudentData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigator = useNavigate();
  const goBack = () => {
    navigator(-1);
  };
  const showCourses = studentData ? (
    studentData?.studentCourseDetiles?.map((course, index) => (
      <tr key={index} style={{ fontWeight: "bold" }}>
        <td>{index + 1}</td>
        <td>{course.courseCode}</td>
        <td>{course.courseName}</td>
        <td>{course.courseDegree}</td>
        <td>{course.courseChar}</td>
        <td>{course.numberOfPoints}</td>
        <td>{course.courseStatus}</td>
        <td>
          {course?.courseDegreeDetiles.map((deg,index_d) => (
            <div key={index_d} style = {{whiteSpace:'nowrap'}}>
              {deg.assessMethodsName} : 
              <span
                style={
                  deg.degree === "Waiting"
                    ? { color: "orange" }
                    : { color: "black" }
                }
              >
                {deg.degree}
              </span>
            </div>
          ))}
        </td>
      </tr>
    ))
  ) : (
    <tr >
      <td
        colSpan={8}
        style={{ fontSize: "20px", textAlign: "center", color: "red" }}
      >
        No Data{" "}
      </td>
    </tr>
  );
  return (
    <div className="result pad">
      <div className="mb-2">
        <Button onClick={goBack}>
        <FaArrowLeft />
        </Button>
      </div>
      <header className="para">
        <div className="item-1">
          <span>
            student name : <span>{studentData?.studentName || ""}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            student code : <span>{studentData?.studentCode}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            Status :{" "}
            <span
              style={
                studentData?.studentSemesterStatus === "Succeed"
                  ? { color: "green" }
                  : studentData?.studentSemesterStatus === "Waiting"
                  ? { color: "yellow" }
                  : { color: "red" }
              }
            >
              {studentData?.studentSemesterStatus}
            </span>
          </span>
        </div>
        <div className="item">
          <span>
            Semester Percentage :{" "}
            <span>{studentData?.studentSemesterPercentage}</span>
          </span>
        </div>
        <div className="item">
          <span>
            Semester Char : <span>{studentData?.studentSemesterChar}</span>
          </span>
        </div>
        <div className="item">
          <span>
            Cumulative Percentage :{" "}
            <span>{studentData?.studentCumulativePercentage}</span>
          </span>
        </div>
        <div className="item">
          <span>
            Cumulative Char : <span>{studentData?.studentCumulativeChar}</span>
          </span>
        </div>
      </header>
      <hr />
     <div className="table-content" >
     <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course code
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course name
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Degree
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Char
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              number of points
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Status
            </th>
            <th style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Degree Details
            </th>
          </tr>
        </thead>
        <tbody>{showCourses}</tbody>
      </table>
     </div>
    </div>
  );
}
