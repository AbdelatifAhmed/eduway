import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import StaffData from "./StaffData";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Staff() {
  const axios = useAxiosPrivate();
  const [administration, setAdministration] = useState([]);
  const [staff, setStaff] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [teacherAssistant, setTeacherAssistant] = useState([]);
  const [controlMember, setControlMember] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const { globalFaculty } = useFaculty();

  const getAllAdministrations = async () => {
    await axios
      .get(`/api/Administration/GetAllAdministration/${globalFaculty}`)
      .then((res) => setAdministration(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getAllStaff = async () => {
    await axios
      .get(`/api/Staff/GetAllStaff/${globalFaculty}`)
      .then((res) => setStaff(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const getAllTeacher = async () => {
    await axios
      .get(`/api/Teacher/GetAllTeacher/${globalFaculty}`)
      .then((res) => setTeacher(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const getAllTeacherAssistant = async () => {
    await axios
      .get(`/api/TeacherAssistant/GetAllTeacherAssistant/${globalFaculty}`)
      .then((res) => setTeacherAssistant(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const getAllControlMember = async () => {
    await axios
      .get(`/api/Control/GetAll/${globalFaculty}`)
      .then((res) => setControlMember(res?.data?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (globalFaculty) {
      getAllAdministrations();
      getAllControlMember();
      getAllStaff();
      getAllTeacher();
      getAllTeacherAssistant();
    }
  }, [globalFaculty]);

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

  const handelDeleteٍ = (index, role) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${index.staffNameEnglish}?`,
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
            .delete(`api/staff/Delete/${index.staffId}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              role === 1
                ? getAllAdministrations()
                : role === 2
                ? getAllStaff()
                : role === 3
                ? getAllTeacher()
                : role === 4
                ? getAllTeacherAssistant()
                : getAllControlMember();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const showAdminstration = administration ? (
    currentRecordsAdmin.map((admin) => (
      <tr key={admin.staffId}>
        <td>{admin.staffNameArbic}</td>
        <td>{admin.staffNameEnglish}</td>
        <td>{admin.email}</td>
        <td>{admin.gender}</td>
        <td>{admin.nationality}</td>
        <td>{admin.religion}</td>
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDeleteٍ(admin,1)}>
            Delete
          </Button>
          <Link
            to={`${admin.staffId}`}
            className="btn btn-warning text-dark">View</Link>
        </td>
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
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDeleteٍ(admin,2)}>
            Delete
          </Button>
          <Link
            to={`${admin.staffId}`}
            className="btn btn-warning text-dark">View</Link>
        </td>
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
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDeleteٍ(teacher,3)}>
            Delete
          </Button>
          <Link
            to={`${teacher.staffId}`}
            className="btn btn-warning text-dark">View</Link>
        </td>
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
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDeleteٍ(teacher,4)}>
            Delete
          </Button>
          <Link
            to={`${teacher.staffId}`}
            className="btn btn-warning text-dark">View</Link>
        </td>
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
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDeleteٍ(teacher,5)}>
            Delete
          </Button>
          <Link
            to={`${teacher.staffId}`}
            className="btn btn-warning text-dark">View</Link>
        </td>
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
