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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecordsAdmin =
    administration &&
    administration.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecordsStaff =
    staff && staff.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecordsTeacher =
    teacher && teacher.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecordsTeacherAssistant =
    teacherAssistant &&
    teacherAssistant.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentRecordsControlMember =
    controlMember && controlMember.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPagesForAdmin =
    administration && Math.ceil(administration.length / recordsPerPage);
  const nPagesForStaff = staff && Math.ceil(staff.length / recordsPerPage);
  const nPagesForTeacher =
    teacher && Math.ceil(teacher.length / recordsPerPage);
  const nPagesForTeacherAssistant =
    teacherAssistant && Math.ceil(teacherAssistant.length / recordsPerPage);
  const nPagesForControlMember =
    controlMember && Math.ceil(controlMember.length / recordsPerPage);

  const showAdminstration = administration ? (
    currentRecordsAdmin.map((admin) => (
      <tr key={admin.staffId}>
        <td>{admin.staffNameArbic}</td>
        <td>{admin.staffNameEnglish}</td>
        <td>{admin.email}</td>
        <td>{admin.gender}</td>
        <td>{admin.nationality}</td>
        <td>{admin.religion}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Data</td>
    </tr>
  );
  const showStaff = staff ? (
    currentRecordsStaff.map((admin) => (
      <tr key={admin.staffId}>
        <td>{admin.staffNameArbic}</td>
        <td>{admin.staffNameEnglish}</td>
        <td>{admin.email}</td>
        <td>{admin.gender}</td>
        <td>{admin.nationality}</td>
        <td>{admin.religion}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Data</td>
    </tr>
  );

  const showTeacher = teacher ? (
    currentRecordsTeacher.map((teacher) => (
      <tr key={teacher.staffId}>
        <td>{teacher.staffNameArbic}</td>
        <td>{teacher.staffNameEnglish}</td>
        <td>{teacher.email}</td>
        <td>{teacher.gender}</td>
        <td>{teacher.nationality}</td>
        <td>{teacher.religion}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Data</td>
    </tr>
  );

  const showTeacherAssistant = teacherAssistant ? (
    currentRecordsTeacherAssistant.map((teacher) => (
      <tr key={teacher.staffId}>
        <td>{teacher.staffNameArbic}</td>
        <td>{teacher.staffNameEnglish}</td>
        <td>{teacher.email}</td>
        <td>{teacher.gender}</td>
        <td>{teacher.nationality}</td>
        <td>{teacher.religion}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Data</td>
    </tr>
  );

  const showControlMember = controlMember ? (
    currentRecordsControlMember.map((teacher) => (
      <tr key={teacher.staffId}>
        <td>{teacher.staffNameArbic}</td>
        <td>{teacher.staffNameEnglish}</td>
        <td>{teacher.email}</td>
        <td>{teacher.gender}</td>
        <td>{teacher.nationality}</td>
        <td>{teacher.religion}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6}>No Data</td>
    </tr>
  );

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
