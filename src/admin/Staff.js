import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from "../Api/axios";
import Pagination from "../Components/Pagination";
import { FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import StaffData from "./StaffData";

export default function Staff() {
  const [administration, setAdministration] = useState([]);
  const [staff, setStaff] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [teacherAssistant, setTeacherAssistant] = useState([]);
  const [controlMember, setControlMember] = useState([]);

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

    axios
      .get("/api/Control/GetAll", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer " + token ,
        },
      })
      .then((res) => setControlMember(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  // if (!Array.isArray(administration) || administration.length === 0) {
  //   return <div style={{ padding: "20px", fontSize: "30px", color: "red" }}>No Administration found.</div>;
  // }

  // if (!Array.isArray(staff) || staff.length === 0) {
  //   return <div style={{ padding: "20px", fontSize: "30px", color: "red" }}>No Staff found.</div>;
  // }

  // if (!Array.isArray(teacher) || teacher.length === 0) {
  //   return (
  //     <div style={{ padding: "20px", fontSize: "30px", color: "red" }}>
  //       No teacher found.
  //     </div>
  //   );
  // }

  // if (!Array.isArray(teacherAssistant) || teacherAssistant.length === 0) {
  //   return (
  //     <div style={{ padding: "20px", fontSize: "30px", color: "red" }}>
  //       No Teacher Assistant found.
  //     </div>
  //   );
  // }
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
  const currentRecordsControlMember = controlMember.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPagesForAdmin = Math.ceil(administration.length / recordsPerPage);
  const nPagesForStaff = Math.ceil(staff.length / recordsPerPage);
  const nPagesForTeacher = Math.ceil(teacher.length / recordsPerPage);
  const nPagesForTeacherAssistant = Math.ceil(
    teacherAssistant.length / recordsPerPage
  );
  const nPagesForControlMember = Math.ceil(
    controlMember.length / recordsPerPage
  );

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

  const showControlMember = currentRecordsControlMember.map((teacher) => (
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
        {/* Administration  */}
        <Tab eventKey="administration" title="Administration">
          <StaffData show={showAdminstration} link={"add-administration"} />
          <Pagination
            nPages={nPagesForAdmin}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        {/*  Teacher  */}
        <Tab eventKey="teacher" title="Teacher">
          <StaffData show={showTeacher} link={"add-teacher"} />
          <Pagination
            nPages={nPagesForTeacher}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        {/*  Teacher Assistant */}
        <Tab eventKey="teacher-assistant" title="Teacher Assistant">
          <StaffData
            show={showTeacherAssistant}
            link={"add-teacherAssistant"}
          />
          <Pagination
            nPages={nPagesForTeacherAssistant}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        {/* Staaaaaff */}
        <Tab eventKey="staff" title="Staff">
          <StaffData show={showStaff} link={"add-staff"} />
          <Pagination
            nPages={nPagesForStaff}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="control-member" title="Control Member">
          <StaffData show={showControlMember} link={"add-control-member"} />
          <Pagination
            nPages={nPagesForControlMember}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
