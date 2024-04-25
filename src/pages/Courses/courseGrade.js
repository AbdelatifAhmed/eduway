import { useContext, useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import { AuthContext } from "../../Auth/AuthContext";
import axios from "../../Api/axios";
import {
  Button,
  Col,
  FormLabel,
  FormSelect,
  Offcanvas,
  Row,
  Table,
} from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

export default function AddCourseGrades() {
  const [courses, setCourses] = useState([]);
  const context = useContext(AuthContext);
  const token = context?.Auth?.token;
  const [selectedCourse, setSelectedCourse] = useState();
  const [studentData, setStudentData] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  console.log(recordsPerPage);
  const GLOBAL_STAFF_ID = 1;
  useEffect(() => {
    if (GLOBAL_STAFF_ID) {
      axios
        .get(`/api/Staff/GetCourseStaffSemester${GLOBAL_STAFF_ID}`)
        .then((res) => 
        
        
        setCourses(res?.data?.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const [displayCourses, setDisplayCourses] = useState(false);
  const openCoursesDisplay = () => setDisplayCourses(true);
  const closeCoursesDisplay = () => setDisplayCourses(false);
  const handelChoosenCourse = (choosenCourse) => {
    setSelectedCourse(choosenCourse);
    closeCoursesDisplay();
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    studentData && studentData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = studentData && Math.ceil(studentData.length / recordsPerPage);

  const showCourses = courses ? (
    courses.map((course, index) => (
      <tr courses="border-bottom border-warning" key={index}>
        <td style={{ fontWeight: "bold" }}>{index + 1}</td>
        <td style={{ fontWeight: "bold" }}>{course.code}</td>
        <td style={{ fontWeight: "bold" }}>{course.name}</td>
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

  useEffect(() => {
    const fetchData = async () => {
      // if(selectedCourse){
      let data = null;
      try {
        // axios.get(`api/Course/GetStudentSemesterAssessMethodsBySpecificCourse${selectedCourse?.id }`)
        await axios(
          "api/Course/GetStudentSemesterAssessMethodsBySpecificCourse5"
        ).then((res) => {
          data = res?.data?.data;
        });
        const processedData = data.studentDtos.map((student) => ({
          ...student,
          isDisabled: true,
        }));
        setStudentData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // }
    };
    fetchData();
  }, [selectedCourse]);

  const handleAssessmentDegreeChange = (
    studentIndex,
    assessIndex,
    newValue
  ) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = [...prevStudentData];
      if (updatedStudentData[studentIndex]?.assesstMethodDtos[assessIndex]) {
        updatedStudentData[studentIndex].assesstMethodDtos[
          assessIndex
        ].assessDegree = newValue;
      }
      return updatedStudentData;
    });
  };

  const toggleEdit = (index) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = [...prevStudentData];
      updatedStudentData[index].isDisabled =
        !updatedStudentData[index].isDisabled;
      return updatedStudentData;
    });
  };

  const uniqueAssessNames = currentRecords.flatMap((student) =>
    student.assesstMethodDtos.map((method) => method.assessName)
  );
  const uniqueAssessNamesSet = new Set(uniqueAssessNames);
  const uniqueAssessNamesArray = Array.from(uniqueAssessNamesSet);

  const tableHeaders = uniqueAssessNamesArray.map((assessName) => (
    <th
      scope="col"
      style={{ background: "#121431", color: "white" }}
      key={assessName}
    >
      <div className="th-flex">
        <span className="th-name">{assessName}</span>
        <span>{/* <FaSort /> */}</span>
      </div>
    </th>
  ));

  const tableRows = currentRecords.map((student, index) => (
    <tr key={student.studentCode}>
      <td>{index + 1}</td>
      <td>{student.studentName}</td>
      <td>{student.studentCode}</td>
      {uniqueAssessNamesArray.map((assessName, assessIndex) => {
        const method = student.assesstMethodDtos.find(
          (method) => method.assessName === assessName
        );
        return (
          <td key={`${student.studentCode}-${assessName}`}>
            <input
              type="number"
              defaultValue={method ? method.assessDegree : ""}
              disabled={student.isDisabled}
              onChange={(e) =>
                handleAssessmentDegreeChange(index, assessIndex, e.target.value)
              }
            />
          </td>
        );
      })}
      <td>
        <Button size="sm" variant="dark" onClick={() => toggleEdit(index)}>
          {student.isDisabled ? <MdModeEditOutline /> : <IoClose />}
        </Button>
      </td>
    </tr>
  ));

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
      const editedData = studentData.flatMap((student) => {
        return student.assesstMethodDtos.map((method) => {
          return {
            studentSemesterAssessMethodId: method.studentSemesterAssessMethodId,
            degree: +method.assessDegree || 0, // Default to 0 if assessDegree is null or undefined
          };
        });
      });
      await axios.put("api/Course/EditDegree", editedData).then((response) => {
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
  return (
    <>
      <div className="pad">
        <header style={{ paddingRight: "15px" }}>
          <div className="d-flex justify-content-between ">
            <div>
              <Button variant="dark" onClick={sendEditedDataToServer}>
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
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {selectedCourse?.name
              ? `Course : ${selectedCourse?.name}`
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
                    <th>Code</th>
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

                {tableHeaders}
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name">Edit</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">{tableRows}</tbody>
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
