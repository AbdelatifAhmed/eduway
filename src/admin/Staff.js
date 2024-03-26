import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from "../Api/axios";
import Pagination from "../Components/Pagination";
import { FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Staff() {
  const [administration, setAdministration] = useState([]);
  const [staff, setStaff] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [teacherAssistant, setTeacherAssistant] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/Administration/GetAllAdministration", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token ,
        },
      })
      .then((res) => setAdministration(res?.data?.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/Staff/GetAllStaff", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token ,
        },
      })
      .then((res) => setStaff(res?.data?.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/Teacher/GetAllTeacher", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token ,
        },
      })
      .then((res) => setTeacher(res?.data?.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/TeacherAssistant/GetAllTeacherAssistant", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token ,
        },
      })
      .then((res) => setTeacherAssistant(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecordsAdmin = administration.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const currentRecordsStaff = staff.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const currentRecordsTeacher = teacher.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const currentRecordsTeacherAssistant = teacherAssistant.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPagesForAdmin = Math.ceil(administration.length / recordsPerPage);
  const nPagesForStaff = Math.ceil(staff.length / recordsPerPage);
  const nPagesForTeacher = Math.ceil(teacher.length / recordsPerPage);
  const nPagesForTeacherAssistant = Math.ceil(teacherAssistant.length / recordsPerPage);

  const showAdminstration = currentRecordsAdmin.map((admin) => (
    <tr key={admin.staffId}>
      <td>{admin.staffNameArbic}</td>
      <td>{admin.staffNameEnglish}</td>
      <td>{admin.email}</td>
      <td>{admin.gender}</td>
      <td>{admin.nationality}</td>
      <td>{admin.religion}</td>
    </tr>
  ));
  const showStaff = currentRecordsStaff.map((admin) => (
    <tr key={admin.staffId}>
      <td>{admin.staffNameArbic}</td>
      <td>{admin.staffNameEnglish}</td>
      <td>{admin.email}</td>
      <td>{admin.gender}</td>
      <td>{admin.nationality}</td>
      <td>{admin.religion}</td>
    </tr>
  ));
  const showTeacher = currentRecordsTeacher.map((teacher) => (
    <tr key={teacher.staffId}>
      <td>{teacher.staffNameArbic}</td>
      <td>{teacher.staffNameEnglish}</td>
      <td>{teacher.email}</td>
      <td>{teacher.gender}</td>
      <td>{teacher.nationality}</td>
      <td>{teacher.religion}</td>
    </tr>
  ));
  const showTeacherAssistant = currentRecordsTeacherAssistant.map((teacher) => (
    <tr key={teacher.staffId}>
      <td>{teacher.staffNameArbic}</td>
      <td>{teacher.staffNameEnglish}</td>
      <td>{teacher.email}</td>
      <td>{teacher.gender}</td>
      <td>{teacher.nationality}</td>
      <td>{teacher.religion}</td>
    </tr>
  ));

  return (
    <div className="p-3">
      <Tabs
        defaultActiveKey="administration"
        id="fill-tab-example"
        className="mb-3"
        justify
        variant="tabs"
      >
        <Tab eventKey="administration" title="Administration">
          <div className="table-content">
            <header>
              <Link
                to="/admin/add-Administration"
                className="btn btn-info btn-lg"
                style={{ color: "white" }}
              >
                + Add New
              </Link>
            </header>

            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in Arabic</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in English</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Mail</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Gender</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Nationality</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Religion</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{showAdminstration}</tbody>
            </table>
          </div>
          <Pagination
            nPages={nPagesForAdmin}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="teacher" title="Teacher">
          <div className="table-content">
            <header>
              <Link
                to="/admin/add-teacher"
                className="btn btn-info btn-lg"
                style={{ color: "white" }}
              >
                + Add New
              </Link>
            </header>

            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in Arabic</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in English</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Mail</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Gender</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Nationality</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Religion</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{showTeacher}</tbody>
            </table>
          </div>
          <Pagination
            nPages={nPagesForTeacher}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="teacher-assistant" title="Teacher Assistant">
          <div className="table-content">
            <header>
              <Link
                to="/admin/add-teacherAssistant"
                className="btn btn-info btn-lg"
                style={{ color: "white" }}
              >
                + Add New
              </Link>
            </header>

            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in Arabic</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in English</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Mail</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Gender</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Nationality</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Religion</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{showTeacherAssistant}</tbody>
            </table>
          </div>
          <Pagination
            nPages={nPagesForTeacherAssistant}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="staff" title="Staff">
          <div className="table-content">
            <header>
              <Link
                to="/admin/add-staff"
                className="btn btn-info btn-lg"
                style={{ color: "white" }}
              >
                + Add New
              </Link>
            </header>

            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in Arabic</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Name in English</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Mail</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Gender</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Nationality</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{ background: "#121431", color: "white" }}
                  >
                    <div className="th-flex">
                      <span className="th-name">Religion</span>
                      <span>
                        <FaSort />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{showStaff}</tbody>
            </table>
          </div>
          <Pagination
            nPages={nPagesForStaff}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="control-member" title="Control Member">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}
