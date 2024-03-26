import { FaSort } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "../Api/axios";
import { User } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
export default function Student(props) {
  const [students, setStudent] = useState([]);
  const context = useContext(User);
  // const token = context?.Auth?.token;
  // console.log(token);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/Student/GetAllStudents", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      })
      .then((res) => setStudent(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(students);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(students.length / recordsPerPage);

  const showStudents = students.map((student) => (
    <tr key={student.studentId}>
      <td>{student.studentNameArbic}</td>
      <td>{student.studentNameEnglish}</td>
      <td>{student.email}</td>
      <td>{student.gender}</td>
      <td>{student.nationality}</td>
      <td>{student.religion}</td>
    </tr>
  ));
  return (
    <div className="Student-admin">
      <header>
        <Link
          to="/admin/add-student"
          className="btn btn-info btn-lg"
          style={{ color: "white" }}
        >
          + Add New Student
        </Link>
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
