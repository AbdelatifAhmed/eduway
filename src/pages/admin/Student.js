import { FaSort } from "react-icons/fa";
import Pagination from "../../Components/Pagination";
import { useContext, useEffect, useState } from "react";
import axios from "../../Api/axios";
import { AuthContext } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import {Button, Col, FormLabel, FormSelect, Row} from "react-bootstrap"
import Swal from "sweetalert2";
export default function Student(props) {
  const [students, setStudent] = useState([]);
  const context = useContext(AuthContext);
  // const token = context?.Auth?.token;
  // console.log(token);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage ,  setRecordsPerPage] = useState(10);

  useEffect(() => {
      getStudents()
  }, []);

  const getStudents = () =>{
    axios
      .get("/api/Student/GetAllStudents", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      })
      .then((res) => setStudent(res.data.data))
      .catch((err) => console.log(err));
  }

  const handelDelete = (std)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${std.studentNameEnglish}?`,
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
            .delete(`api/Student/student${std.studentId}`)
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Student has been Deleted.",
                icon: "success",
              });
              getStudents()
              })
            .catch(() => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "This Student Is Registed in Semester",
                icon: "eroor",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Student is safe :)",
            icon: "error",
          });
        }
      });
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students && students?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = students && Math.ceil(students.length / recordsPerPage);

  const showStudents = students ? currentRecords.map((student) => (
    <tr key={student.studentId}>
      <td>{student.studentNameArbic}</td>
      <td>{student.studentNameEnglish}</td>
      <td>{student.email}</td>
      <td>{student.gender}</td>
      <td>{student.nationality}</td>
      <td>{student.religion}</td>
      <td className="d-flex gap-2">
        <Button variant="danger" onClick={()=>handelDelete(student)}>Delete</Button>
        <Link to={`student/${student.studentId}`} className="btn btn-warning text-dark">view</Link>
      </td>
    </tr>
  )): <tr>
    <td colSpan={6} style={{textAlign:"center" , fontSize:"20px", fontWeight:"bold" , color:"red"}}>No Data</td>
  </tr>
  return (
    <div className="pad">
      <header className="d-flex justify-content-between ">
        <div>
        <Link
          to="/admin/add-student"
          className="btn btn-info btn-lg"
          style={{ color: "white" }}
        >
          + Add New Student
        </Link>
        </div>
        <div style={{ width: "200px" }}>
              <Row>
                <Col className="d-flex justify-content-end ">
                  <FormLabel style={{ fontSize: "25px" }}>Display</FormLabel>
                </Col>
                <Col>
                  <FormSelect
                    onChange={(e) => setRecordsPerPage(e.target.value)}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </FormSelect>
                </Col>
              </Row>
            </div>
        <div></div>
      </header>
      <div className="table-content">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Name Arabic</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Name English</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Email</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Gender</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Nationality</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Religion</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Operations</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{showStudents}</tbody>
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
