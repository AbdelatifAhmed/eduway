import { FaSort } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import {  useContext, useEffect, useState } from "react";
import axios from "../Api/axios";
import { AuthContext } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function Courses(props) {
  const [courses, setCourses] = useState([]);
  const context = useContext(AuthContext);
  const token = context?.Auth?.token;
  // console.log(token);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getCourses()
  }, []);

 const  getCourses = () =>{
    axios
      .get("/api/Course", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));
  }

  const handelDelete = (course)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${course.name}?`,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`api/Course${course.id}`)
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Student has been Deleted.",
                icon: "success",
              });
              getCourses()
            })
            .catch(() => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "Error Occured",
                icon: "eroor",
              });
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Course is safe :)",
            icon: "error",
          });
        }
      });
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(courses.length / recordsPerPage);

  const showCourses = currentRecords.map((course) => (
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
      <td className="d-flex gap-2">
        <Button variant="danger" onClick={()=>handelDelete(course)}>Delete</Button>
        <Link to={`course/${course.id}`} className="btn btn-warning text-dark">view</Link>
      </td>
    </tr>
  ));
  return (
    <div className="pad">
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
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Operations</span>
                  <span>
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
