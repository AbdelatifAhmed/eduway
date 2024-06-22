import { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Offcanvas,
  Row,
  Table,
} from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdCloudUpload, MdCloudDownload } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useAuth from "../../hooks/useAuth";
import useFaculty from "../../hooks/useFaculty";
import Uploader from "../../Components/Uploader";

export default function AddCourseGrades() {
  const axios = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [studentData, setStudentData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [displayCourses, setDisplayCourses] = useState(false);
  const { Auth } = useAuth();

  useEffect(() => {
    if (Auth?.dataDetails?.roles[0] === "Teacher") {
      axios
        .get(`/api/Staff/Css`)
        .then((res) => setCourses(res?.data?.data))
        .catch((err) => console.log(err));
    }
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
            `api/Course/GetStudentSemesterAssessMethodsBySpecificCourse/${selectedCourse?.courseId}`
          );
          const data = res?.data?.data;
          const processedData = data.studentDtos.map((student) => ({
            ...student,
            isDisabled: true,
          }));
          setStudentData(processedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [selectedCourse, axios]);

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

        // Track changes
        const studentId = updatedStudentData[studentIndex].studentCode;
        const methodId =
          updatedStudentData[studentIndex].assesstMethodDtos[assessIndex]
            .studentSemesterAssessMethodId;

        setEditedData((prevEditedData) => ({
          ...prevEditedData,
          [studentId]: {
            ...prevEditedData[studentId],
            [methodId]: {
              studentSemesterAssessMethodId: methodId,
              courseId: selectedCourse.courseId,
              assessmentMethodId:
                updatedStudentData[studentIndex].assesstMethodDtos[assessIndex]
                  .assessmentMethodId,
              degree: +newValue,
            },
          },
        }));
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
      </div>
    </th>
  ));
  const tableRows =
    studentData.length > 0 ? (
      currentRecords.map((student, index) => (
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
                    handleAssessmentDegreeChange(
                      index,
                      assessIndex,
                      e.target.value
                    )
                  }
                  style={{ border: "none", outline: "none", width: "100%" }}
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

  const [currentSemesterId, setCurrentSemesterId] = useState();
  const [currentSemesters, setCurrentSemesters] = useState([]);
  const { globalFaculty } = useFaculty();
  const [courses2, setCourses2] = useState([]);

  useEffect(() => {
    if (globalFaculty) {
      axios
        .get(`api/Control/GetAllSemester/${globalFaculty}`)
        .then((res) => setCurrentSemesters(res?.data?.data))
        .catch((err) => console.log(err));
    }
  }, [globalFaculty]);
  const showCurrentSemesters =
    currentSemesters && currentSemesters?.semesterName?.length > 0 ? (
      currentSemesters?.semesterName?.map((element) => (
        <option key={element.id} value={element.id}>
          {element.name}
        </option>
      ))
    ) : (
      <tr disabled className="text-danger">
        <td className="text-danger" style={{ fontSize: "20px" }}>
          No Current Semester Exists
        </td>
      </tr>
    );

  useEffect(() => {
    if (currentSemesterId) {
      axios
        .get(`/api/Control/GetAllCourse/${currentSemesterId}`)
        .then((res) => setCourses2(res?.data?.data))
        .catch((err) => console.log(err));
    }
  }, [currentSemesterId, axios]);

  const showCourses2 = courses2 ? (
    courses2?.map((course, index) => (
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [excelDl, setExcelDl] = useState(false);
  const [excelUl, setExcelUl] = useState(false);
  const [isTrue, setIsTrue] = useState(false)
  const handelExcelDownload = async()=> {

    try {
      const response = await axios.get(
        `api/Course/GetExcelFileForSpecificCourse/${selectedCourse?.courseId}/${isTrue}`,
        {
          responseType: 'blob', // Important to handle the file as a Blob
        }
      );
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'EduWay-AssessmentMethods.xlsx'); // Set default file name
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }
     catch (error) {
      console.error("Error downloading the file:", error);
    }

  } 

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
          <div className="d-flex justify-content-between align-items-center">
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
            <div>
              <RiFileExcel2Fill
                size={"50px"}
                style={{
                  background: "green",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleShow}
              />
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add Grades </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ButtonGroup
                  aria-label="Basic example"
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="success"
                    value={excelUl}
                    onClick={() => {
                      setExcelDl(false);
                      setExcelUl(true);
                    }}
                  >
                    <MdCloudUpload size={"30px"}/>
                  </Button>
                  <Button
                    variant="success"
                    value={excelDl}
                    onClick={() => {
                      setExcelUl(false);
                      setExcelDl(true);
                    }}
                  >
                    <MdCloudDownload size={"30px"}/>
                  </Button>
                </ButtonGroup>

                {excelUl === true && selectedCourse? (
                  <div>
                    <hr />
                    <Uploader  selectedCourse={selectedCourse?.courseId}/>
                  </div>
                ) : excelDl === true && selectedCourse ? (
                  <div>
                    <Form className="mt-2">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Old data"
                        value={isTrue}
                        onChange={()=>setIsTrue(!isTrue)}
                      />
                      <div className="d-grid gap-2 mt-2">
                        <Button variant="primary" size="lg" onClick={handelExcelDownload} className="d-flex gap-2 justify-content-center align-items-center">
                        <i class="fa-solid fa-file-pen"></i>
                        <span>Download</span>
                        </Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  "Select Course "
                )}
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
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
              {Auth?.dataDetails?.roles[0] === "Teacher" ? (
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
              ) : (
                <>
                  <FormGroup
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <FormLabel style={{ fontSize: "20px" }}>
                      Semester Name
                    </FormLabel>
                    <FormSelect
                      onChange={(e) => setCurrentSemesterId(e.target.value)}
                    >
                      <option hidden defaultValue>
                        Select a Semester
                      </option>
                      {showCurrentSemesters}
                    </FormSelect>
                  </FormGroup>
                  <Table hover>
                    <thead>
                      <tr className="border-bottom border-warning">
                        <th></th>
                        <th>Code</th>
                        <th>Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{showCourses2}</tbody>
                  </Table>
                </>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </header>
        <div className="table-content">
          <Table className="table table-striped table-bordered border border-dark">
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
                    <span className="th-name">Student Name</span>
                  </div>
                </th>
                <th
                  scope="col"
                  style={{ background: "#121431", color: "white" }}
                >
                  <div className="th-flex">
                    <span className="th-name">Student Code</span>
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
            <tbody>{tableRows}</tbody>
          </Table>
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
