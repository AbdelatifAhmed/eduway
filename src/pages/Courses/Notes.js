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
  const axios = useAxiosPrivate()
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`/api/staff/CSS`)
      .then((res) => setCourses(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const [displayCourses, setDisplayCourses] = useState(false);
  const openCoursesDisplay = () => setDisplayCourses(true);
  const closeCoursesDisplay = () => setDisplayCourses(false);
  const handelChoosenCourse = (choosenCourse) => {
    setSelectedCourse(choosenCourse);
    closeCoursesDisplay();
  };

 

  const showCourses = courses ? (
    courses?.courseDoctorDtos?.map((course, index) => (
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

  const [notesData, setNotesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCourse) {
        try {
          await axios(`api/Course/SCInfo${selectedCourse?.courseId}`)
          .then(
            (res) => {
              setNotesData(res?.data?.data);
            }
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [selectedCourse]);

  

  const sendEditedDataToServer = async () => {
    const sendData = Data.map(item => ({
        studentSemesterCourseId: item.studentSemesterCourseId,
        notes: item.notes
      }));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    try {
      await axios.put("api/Course/UCInfo", sendData
    ).then((response) => {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: response?.data.message,
          });
        }
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };

  const [Data,setData] = useState([])
  const handleNotesChange = (studentIndex, e) => {
    const updatedNotes = [...currentRecords];
    updatedNotes[studentIndex] = {
      ...updatedNotes[studentIndex],
      notes: e.target.value,
    };
    setData(updatedNotes);
  };



  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    notesData && notesData?.studentCourseInfoDetials?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = notesData && Math.ceil(currentRecords?.length / recordsPerPage);

  const showNotesData = notesData
    ? currentRecords?.map((std, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{std.studentCode}</td>
          <td>{std.studentName}</td>
          <textarea
            style={{ width: "100%" }}
            onChange={(e) => handleNotesChange(index,e)}
          >
            {std.notes}
          </textarea>
        </tr>
      ))
    : "";

  return (
    <>
      <div className="pad">
        <header style={{ paddingRight: "15px" }}>
          <div className="d-flex justify-content-between ">
            <div>
              <Button variant="success" onClick={sendEditedDataToServer}>
                Save
              </Button>
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
            <div>
              <Button
                variant="dark"
                onClick={openCoursesDisplay}
                className="button1"
              >
                Select Course
              </Button>
            </div>
          </div>
          <hr />

          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {selectedCourse?.courseName
              ? `Course : ${selectedCourse?.courseName}`
              : "Choose a Course"}
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
          <table className="table table-striped  table-bordered border border-dark">
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name"></span>
                  </div>
                </th>
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name">Student Code</span>
                    <span>{/* <FaSort /> */}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name">Student Name</span>
                    <span>{/* <FaSort /> */}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name">Notes</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">{showNotesData}</tbody>
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
