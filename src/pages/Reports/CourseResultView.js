import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import Swal from "sweetalert2";

export default function StudentResult() {
  const axios = useAxiosPrivate()
  const navigate = useNavigate()
  const { semesterId, academicYearId, courseId } = useParams();
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    axios(`api/Control/SISC/${semesterId}/${academicYearId}/${courseId}`)
      .then((res) => {
        setCourseData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        if(err?.response?.status === 403)
          {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success mx-2",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons
            .fire({
              title: `Forbidden`,
              text: "you have no access for this page",
              icon: "error",
              confirmButtonText: "Go Back",
              reverseButtons: true,
              backdrop:"rgba(0,0,0,0.34)"
            })
            .then((result) => {
              if (result.isConfirmed) {
                navigate(-1);
                  }})
          }
      });
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const navigator = useNavigate();
  const goBack = () => {
    navigator(-1);
  };

  const showCourses = courseData ? (
    courseData?.courseStudentCourseDetiles
      ?.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
      .map((course, index) => (
        <tr key={index} style={{ fontWeight: "bold" }}>
          <td>{index + 1}</td>
          <td>{course.studentCode}</td>
          <td>{course.studentName}</td>
          <td>{course.courseDegree}</td>
          <td>{course.courseChar}</td>
          <td
            style={
              course.courseStatus === "Succeed"
                ? { color: "green" }
                : course.courseStatus === "Waiting"
                ? { color: "orange" }
                : { color: "red" }
            }
          >
            {course.courseStatus}
          </td>
          <td>
            {course?.courseDegreeDetiles.map((deg, index_d) => (
              <div key={index_d} style={{ whiteSpace: "nowrap" }}>
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
    <div className="result pad">
      <div className="mb-2">
        <Button onClick={goBack}>
          <FaArrowLeft />
        </Button>
      </div>
      <header className="para">
        <div className="item-1">
          <span>
            Course Name : <span>{courseData?.courseName || ""}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            Course Code : <span>{courseData?.courseCode}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            Number Of Points :
            <span> {courseData?.numberOfPoints}</span>
          </span>
        </div>
      </header>
      <hr />
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th></th>
              <th style={{ fontWeight: "bold", fontSize: "18px" }}>
                Student Code
              </th>
              <th style={{ fontWeight: "bold", fontSize: "18px" }}>
                student Name
              </th>
              <th style={{ fontWeight: "bold", fontSize: "18px" }}>
                Course Degree
              </th>
              <th style={{ fontWeight: "bold", fontSize: "18px" }}>
                Course Char
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
      <Pagination
        nPages={Math.ceil(
          (courseData?.courseStudentCourseDetiles || []).length / recordsPerPage
        )}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
