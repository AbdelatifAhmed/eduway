import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs} from "react-bootstrap";
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const { globalFaculty } = useFaculty();

  useEffect(() => {
    if (globalFaculty) {
      getAllAdministrations();
      getAllControlMember();
      getAllStaff();
      getAllTeacher();
      getAllTeacherAssistant();
    }
  }, [globalFaculty]);

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

  const handelDelete = (index, role) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete ${index.staffNameEnglish}?`,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
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

  const renderTableRows = (data, role) =>
    data.map((item) => (
      <tr key={item.staffId}>
        <td>{item.staffNameArbic}</td>
        <td>{item.staffNameEnglish}</td>
        <td>{item.email}</td>
        <td>{item.gender}</td>
        <td>{item.nationality}</td>
        <td>{item.religion}</td>
        <td className="d-flex gap-2">
          <Button variant="danger" onClick={() => handelDelete(item, role)}>
            Delete
          </Button>
          <Link to={`${item.staffId}`} className="btn btn-warning text-dark">
            View
          </Link>
        </td>
      </tr>
    ));

  const renderNoData = () => (
    <tr>
      <td colSpan={7}>No Data</td>
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
        <Tab eventKey="administration" title="Administration">
          <StaffData
            show={
              administration
                ? renderTableRows(currentRecordsAdmin, 1)
                : renderNoData()
            }
            link={"add-administration"}
          />
          <Pagination
            nPages={nPagesForAdmin}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="teacher" title="Teacher">
          <StaffData
            show={
              teacher
                ? renderTableRows(currentRecordsTeacher, 3)
                : renderNoData()
            }
            link={"add-teacher"}
          />
          <Pagination
            nPages={nPagesForTeacher}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="teacher-assistant" title="Teacher Assistant">
          <StaffData
            show={
              teacherAssistant
                ? renderTableRows(currentRecordsTeacherAssistant, 4)
                : renderNoData()
            }
            link={"add-teacherAssistant"}
          />
          <Pagination
            nPages={nPagesForTeacherAssistant}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="staff" title="Staff">
          <StaffData
            show={
              staff ? renderTableRows(currentRecordsStaff, 2) : renderNoData()
            }
            link={"add-staff"}
          />
          <Pagination
            nPages={nPagesForStaff}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Tab>
        <Tab eventKey="control-member" title="Control Member">
          <StaffData
            show={
              controlMember
                ? renderTableRows(currentRecordsControlMember, 5)
                : renderNoData()
            }
            link={"add-control-member"}
          />
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
