import { useEffect, useState } from "react";
import axios from "../../Api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";


export default function StudentResult() {
  const StudentId = useParams();
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios(`api/Control/SISR${StudentId.studentId}`)
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
          {course?.courseDegreeDetiles.map((deg) => (
            <div>
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
    <tr>
      <td
        colSpan={8}
        style={{ fontSize: "20px", textAlign: "center", color: "red" }}
      >
        No Data{" "}
      </td>
    </tr>
  );
  return (
    <div className="student-result pad">
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
      <table style={{ overflow: "scroll" }}>
        <thead>
          <tr>
            <td></td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course code
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course name
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Degree
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Char
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              number of points
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Status
            </td>
            <td style={{ fontWeight: "bold", fontSize: "18px" }}>
              Course Degree Details
            </td>
          </tr>
        </thead>
        <tbody>{showCourses}</tbody>
      </table>
    </div>
  );
}
