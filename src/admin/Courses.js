import { FaSort } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import {  useContext, useEffect, useState } from "react";
import axios from "../Api/axios";
import { User } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
export default function Courses(props) {
  const [courses, setCourses] = useState([]);
  const context = useContext(User);
  const token = context?.Auth?.token;
  // console.log(token);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/Course", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(courses.length / recordsPerPage);

  const showCourses = courses.map((course) => (
    <tr key={course.id}>
      <td>{course.name}</td>
      <td>{course.code}</td>
      <td>{course.description}</td>
      <td>{course.maxDegree}</td>
      <td>{course.minDegree}</td>
      <td>{course.type === 1 ? "اجباري" : "اختياري"}</td>
      <td>{course.numberOfPoints === null ? "N/A" : course.numberOfPoints}</td>
      <td>
        {course.numberOfCreditHours === null
          ? "N/A"
          : course.numberOfCreditHours}
      </td>
    </tr>
  ));
  return (
    <div className="Student-admin">
      <header>
        <Link
          to="/admin/add-course"
          className="btn btn-info btn-lg"
          style={{ color: "white" }}
        >
          + Add New Course
        </Link>
      </header>
      <div className="table-content">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Course Name</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Course Code</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Description</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">max Degree</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Min Degree</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Type</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Number Of Points</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Number Of Credit Hours</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{showCourses}</tbody>
        </table>
      </div>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
