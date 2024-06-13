import { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import {
  Button,
  Col,
  FormLabel,
  FormSelect,
  Offcanvas,
  Row,
  Table,
} from "react-bootstrap";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";

export default function Notes() {
  const axios = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [notesData, setNotesData] = useState([]);
  const [noteChanges, setNoteChanges] = useState({});
  const [displayCourses, setDisplayCourses] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`/api/staff/CSS`)
      .then((res) => setCourses(res?.data?.data))
      .catch((err) => console.log(err));
  }, [axios]);

  const openCoursesDisplay = () => setDisplayCourses(true);
  const closeCoursesDisplay = () => setDisplayCourses(false);

  const handelChoosenCourse = (choosenCourse) => {
    setSelectedCourse(choosenCourse);
    closeCoursesDisplay();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCourse) {
        try {
          const res = await axios.get(`api/Course/SCInfo/${selectedCourse?.courseId}`);
          setNotesData(res?.data?.data?.studentCourseInfoDetials || []);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error?.response?.data?.message,
          });
        }
      }
    };
    fetchData();
  }, [selectedCourse, axios]);

  const handleNotesChange = (studentIndex, e) => {
    const updatedNotes = [...notesData];
    const updatedNote = e.target.value;
    updatedNotes[studentIndex].notes = updatedNote;

    // Update noteChanges with the specific student's new note
    setNoteChanges((prev) => ({
      ...prev,
      [updatedNotes[studentIndex].studentSemesterCourseId]: updatedNote,
    }));

    setNotesData(updatedNotes);
  };

  const sendEditedDataToServer = async () => {
    const Toast =Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    })
    const sendData = Object.keys(noteChanges).map((key) => ({
      studentSemesterCourseId: key,
      notes: noteChanges[key],
    }));

    if (sendData.length === 0) {
      Toast.fire({
        icon: "info",
        title: "No changes to save",
      });
      return;
    }

    try {
      const response = await axios.put("api/Course/UCInfo", sendData);
      if (response.status === 200) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "success",
          title: response?.data.message,
        });
        setNoteChanges({}); // Clear the noteChanges after successful save
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error?.response?.data?.message,
      });
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = notesData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(notesData.length / recordsPerPage);

  const showCourses = courses ? (
    courses.courseDoctorDtos?.map((course, index) => (
      <tr courses="border-bottom border-warning" key={index}>
        <td style={{ fontWeight: "bold" }}>{index + 1}</td>
        <td style={{ fontWeight: "bold" }}>{course.courseName}</td>
        <td>
          <Button variant="warning" onClick={() => handelChoosenCourse(course)}>
            Select
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="text-danger border-bottom border-danger">
        No Courses
      </td>
    </tr>
  );

  const showNotesData = currentRecords.length > 0 ? (
    currentRecords?.map((std, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{std.studentCode}</td>
        <td>{std.studentName}</td>
        <td>
          <textarea
            style={{ width: "100%" }}
            value={std.notes}
            onChange={(e) => handleNotesChange(index, e)}
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="text-danger text-center fw-bold">
        No data
      </td>
    </tr>
  );

  return (
    <>
      <div className="pad">
        <header style={{ paddingRight: "15px" }}>
          <div className="d-flex justify-content-between">
            <div>
              <Button variant="success" onClick={sendEditedDataToServer}>
                Save
              </Button>
            </div>
            <div style={{ width: "200px" }}>
              <Row>
                <Col className="d-flex justify-content-end">
                  <FormLabel style={{ fontSize: "25px" }}>Display</FormLabel>
                </Col>
                <Col>
                  <FormSelect onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </FormSelect>
                </Col>
              </Row>
            </div>
            <div>
              <Button variant="dark" onClick={openCoursesDisplay} className="button1">
                Select Course
              </Button>
            </div>
          </div>
          <hr />
          <div style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>
            {selectedCourse?.courseName ? `Course : ${selectedCourse?.courseName}` : "Choose a Course"}
          </div>
          <Offcanvas
            show={displayCourses}
            onHide={closeCoursesDisplay}
            placement="end"
            scroll={true}
            backdrop="static"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h2>Courses</h2>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Table hover>
                <thead>
                  <tr className="border-bottom border-warning">
                    <th></th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{showCourses}</tbody>
              </Table>
            </Offcanvas.Body>
          </Offcanvas>
        </header>
        <div className="table-content">
          <table className="table table-striped table-bordered border border-dark">
            <thead>
              <tr>
                <th scope="col" style={{ background: "#121431", color: "white" }}>
                  <div className="th-flex">
                    <span className="th-name"></span>
                  </div>
                </th>
                <th scope="col" style={{ background: "#121431", color: "white" }}>
                  <div className="th-flex">
                    <span className="th-name">Student Code</span>
                  </div>
                </th>
                <th scope="col" style={{ background: "#121431", color: "white" }}>
                  <div className="th-flex">
                    <span className="th-name">Student Name</span>
                  </div>
                </th>
                <th scope="col" style={{ background: "#121431", color: "white" }}>
                  <div className="th-flex">
                    <span className="th-name">Notes</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{showNotesData}</tbody>
          </table>
        </div>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
