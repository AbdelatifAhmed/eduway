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

const daysOfWeek = [
  { name: "Saturday", value: 1 },
  { name: "Sunday", value: 2 },
  { name: "Monday", value: 3 },
  { name: "Tuesday", value: 4 },
  { name: "Wednesday", value: 5 },
  { name: "Thursday", value: 6 },
  { name: "Friday", value: 7 },
];

export default function StudentSection() {
  const axios = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [studentData, setStudentData] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [studentInfo, setStudentInfo] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [displayCourses, setDisplayCourses] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/Staff/Css`)
      .then((res) => setCourses(res?.data?.data))
      .catch((err) => console.log(err));
  }, [axios]);

  const openCoursesDisplay = () => setDisplayCourses(true);
  const closeCoursesDisplay = () => setDisplayCourses(false);

  const handelChoosenCourse = (choosenCourse) => {
    setStudentData([]);
    setSelectedCourse(choosenCourse);
    closeCoursesDisplay();
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = studentData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(studentData.length / recordsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCourse) {
        try {
          const res = await axios.get(
            `api/staff/CSec/${selectedCourse?.courseId}`
          );
          const data = res?.data?.data;
          setStudentData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [selectedCourse, axios]);

  useEffect(() => {
    const fetchTimes = async () => {
      if (selectedTime) {
        try {
          const res = await axios.get(`api/schedule/se/${selectedTime}`);
          setStudentInfo(res?.data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchTimes();
  }, [selectedTime]);

  const showData =
    studentData.length > 0 ? (
      currentRecords.map((item, index) => (
        <option key={index} value={item?.sectionId}>
          {daysOfWeek.find((day) => day.value === item?.scheduleDay)?.name}
          {' '}
          {item?.sectionTiming}
        </option>
      ))
    ) : (
      <tr>
        <td
          colSpan={4}
          style={{
            fontSize: "20px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          No Data
        </td>
      </tr>
    );

  const sendEditedDataToServer = async () => {
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
      const flattenedEditedData = Object.values(editedData).flatMap((student) =>
        Object.values(student)
      );

      if (flattenedEditedData.length === 0) {
        Toast.fire({
          icon: "info",
          title: "No changes to save",
        });
        return;
      }

      const response = await axios.put(
        "api/Course/EditDegree",
        flattenedEditedData
      );
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: response?.data.message,
        });
        setEditedData({}); // Clear editedData after successful save
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error Occurred",
      });
    }
  };

  const showCourses = courses ? (
    courses?.courseDoctorDtos?.map((course, index) => (
      <tr className="border-bottom border-warning" key={index}>
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
              <Button variant="dark" onClick={openCoursesDisplay}>
                Select Course
              </Button>
            </div>
          </div>
          <hr />
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {selectedCourse
              ? `Course Name : ${selectedCourse?.courseName}`
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
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>{showCourses}</tbody>
              </Table>
            </Offcanvas.Body>
          </Offcanvas>
        </header>
        <div className="mt-1">
          <FormSelect
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedCourse} 
          >
            <option hidden defaultValue>
              Select Time
            </option>
            {showData}
          </FormSelect>

          {selectedCourse && (
            <div className="mt-2">
              {/* Your Table and other components related to studentInfo */}
              <Table>
                <thead>
                  <tr>
                    <th>Student name</th>
                    <th>Student Code</th>
                  </tr>
                </thead>
                <tbody>
                  {studentInfo && studentInfo.length > 0 ? (
                    studentInfo.map((item, i) => (
                      <tr key={i}>
                        <td>{item?.studentName}</td>
                        <td>{item?.studentCode}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-danger fw-bold text-center"
                      >
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
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
