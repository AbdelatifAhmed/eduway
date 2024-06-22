import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { Button, Row, Col, ListGroup, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import { IoMdClose } from "react-icons/io";
import Pagination from "../../Components/Pagination";
import useFaculty from "../../hooks/useFaculty";

export default function Control() {
  const axios = useAxiosPrivate();
  const { globalFaculty } = useFaculty();
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [student, setStudent] = useState([]);
  const [semester, setSemester] = useState([]);
  const [currentSemesters, setCurrentSemesters] = useState([]);
  const [department, setDepartment] = useState([]);
  const [coursesId, setCoursesId] = useState();
  const [facultyId, setFacultyId] = useState();
  const [studentId, setStudentId] = useState();
  const [semesterId, setSemesterId] = useState();
  const [currentSemesterId, setCurrentSemesterId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [assessMethods, setAssessMethods] = useState([]);
  const [courseAssessMethods, setCourseAssessMethods] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsForTeacherCourse, setSelectedOptionsForTeacherCourse] =
    useState([]);
  const [premissionRoles, setPremissionRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [teacher, setTeacher] = useState([]);
  const [teacherAssistant, setTeacherAssistant] = useState([]);
  const [teacherAssistantCourses, setTeacherAssistantCourses] = useState([]);
  const [staffPermission, SetStaffPermission] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [teacherId, setTeacherId] = useState();
  const [coursesName, setCoursesName] = useState();
  const [studentBySemester, setStudentBySemester] = useState([]);

  console.log(teacherAssistant);
  console.log(teacherAssistantCourses);

  const resetVariables = () => {
    setCoursesId(null);
    setFacultyId(null);
    setCoursesName(null);
    setSelectedOptions([]);
    setSelectedOptionsForTeacherCourse([]);
    setCoursesName(null);
    setDepartmentId(null);
    setSemesterId(null);
    setStudentId(null);
  };

  const handelChange = (selevtedValue) => {
    setSelectedOptions(selevtedValue);
    const output = selevtedValue.map((item) => ({
      id: 0,
      courseId: coursesId,
      assessMethodsId: item.id,
    }));
    setCourseAssessMethods(output);
  };

  const handelChangeForSemesterCourse = (selevtedValue) => {
    setSelectedOptionsForTeacherCourse(selevtedValue);
    const output = selevtedValue.map((item) => ({
      staffId: teacherId,
      courseId: item.id,
    }));
    setTeacherCourses(output);
  };

  const handelChangeForSemesterCourseAssistant = (selevtedValue) => {
    setSelectedOptionsForTeacherCourse(selevtedValue);
    const output = selevtedValue.map((item) => ({
      staffId: teacherId,
      courseId: item.courseId,
    }));
    setTeacherCourses(output);
  };

  const handelPermissions = async (userId) => {
    axios
      .get(`api/Auth/GetUserRoles/${userId}`)
      .then((res) => {
        setPremissionRoles(res?.data?.data?.roles);
        setSelectedUserId(res?.data?.data?.userId);
        setSelectedUserName(res?.data?.data?.userName);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (roleId) => {
    const updatedPermissions = premissionRoles.map((role) => {
      if (role.id === roleId) {
        return { ...role, isSelected: !role.isSelected };
      }
      return role;
    });
    setPremissionRoles(updatedPermissions);
  };

  const handleSavePermissions = (e) => {
    e.preventDefault();
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
    const payload = {
      userId: selectedUserId,
      userName: selectedUserName,
      roles: premissionRoles.map((role) => ({
        id: role.id,
        name: role.name,
        isSelected: role.isSelected,
      })),
    };

    axios
      .post("/api/Auth/ChangeUserRoles", payload)
      .then((res) => {
        // Handle success
        Toast.fire({
          icon: "success",
          title: res?.data?.message,
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };

  useEffect(() => {
    if (globalFaculty) {
      axios
        .get(`/api/Course/all/${globalFaculty}`)
        .then((res) => {
          setCourses(res?.data?.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/Facult/Faculty")
        .then((res) => {
          setFaculty(res?.data?.data?.getFacultyDtos);
        })
        .catch((err) => console.log(err));

      axios
        .get(`/api/Student/GetAllStudents/${globalFaculty}`)
        .then((res) => setStudent(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/staff/FA/${globalFaculty}`)
        .then((res) => SetStaffPermission(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/Teacher/GetAllTeacher/${globalFaculty}`)
        .then((res) => setTeacher(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/Department/All/${globalFaculty}`)
        .then((res) => setDepartment(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/Control/GetAllSemester/${globalFaculty}`)
        .then((res) => setCurrentSemesters(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/AssessMethod/All/${globalFaculty}`)
        .then((res) => setAssessMethods(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/ScientificDegree/GetAllSemestersfd/${globalFaculty}`)
        .then((res) => setSemester(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/TeacherAssistant/GetAllTeacherAssistant/${globalFaculty}`)
        .then((res) => setTeacherAssistant(res?.data?.data))
        .catch((err) => console.log(err));

      axios
        .get(`/api/course/CM/${globalFaculty}`)
        .then((res) => setTeacherAssistantCourses(res?.data?.data))
        .catch((err) => console.log(err));
    }
  }, [globalFaculty]);

  useEffect(() => {
    getCoursesForTeacher();
  }, [teacherId]);

  useEffect(() => {
    getStudentBySemester();
  }, [currentSemesterId]);

  const getStudentBySemester = () => {
    if (currentSemesterId) {
      axios(`/api/Student/as/${currentSemesterId}`)
        .then((res) => {
          setStudentBySemester(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    studentBySemester &&
    studentBySemester.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages =
    studentBySemester && Math.ceil(studentBySemester.length / recordsPerPage);

  const handelStudentDelete = (student) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to End${student.studentName}?`,
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
            .delete(`api/Student/studentSemesters/${student.studentSemesterId}`)
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Student has been Deleted.",
                icon: "success",
              });
              getStudentBySemester(currentSemesterId);
            })
            .catch(() => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "An Error Occured During End Opreation.",
                icon: "eroor",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Student is safe :)",
            icon: "error",
          });
        }
      });
  };
  const handelDeleteCourseForTeacher = (course) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${course.courseName}?`,
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
            .delete(`api/Staff/staffSemester/${course.courseId}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              getCoursesForTeacher();
            })
            .catch((res) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: res?.data?.message,
                icon: "error",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Course is safe :)",
            icon: "error",
          });
        }
      });
  };

  const getCoursesForTeacher = () => {
    if (teacherId) {
      axios
        .get(`/api/Staff/CSSA/${teacherId}`)
        .then((res) => setCoursesName(res?.data?.data?.courseDoctorDtos))
        .catch((err) => console.log(err));
    }
  };

  const [shows, setShows] = useState({
    showFaculty: [],
    showCourses: [],
    showTeachers: [],
    showCoursesName: [],
    showStudents: [],
    showSemesters: [],
    showCurrentSemesters: [],
    showCurrentSemestersForStudentSemester: [],
    showDepartments: [],
    showTeachersAssistant: [], 
    showTeachersAssistantCourses: []
  });

  shows.showFaculty = faculty ? (
    faculty.map((element) => (
      <option key={element.facultId} value={element.facultId}>
        {element.facultName}
      </option>
    ))
  ) : (
    <option disabled className="text-danger">
      No Facult Exists
    </option>
  );

  shows.showTeachers = teacher ? (
    teacher.map((element) => (
      <option key={element.staffId} value={element.staffId}>
        {element.staffNameEnglish}
      </option>
    ))
  ) : (
    <option disabled className="text-danger ">
      No Teacher Exists
    </option>
  );
  shows.showTeachersAssistant = teacherAssistant ? (
    teacherAssistant.map((element) => (
      <option key={element.staffId} value={element.staffId}>
        {element.staffNameEnglish}
      </option>
    ))
  ) : (
    <option disabled className="text-danger ">
      No Teacher Exists
    </option>
  );

  shows.showCoursesName = coursesName ? (
    coursesName.map((element, index) => (
      <ListGroup.Item
        key={index}
        variant="primary"
        className="d-flex justify-content-between"
      >
        <span>{element.courseName}</span>
        <span
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => handelDeleteCourseForTeacher(element)}
        >
          <IoMdClose />
        </span>
      </ListGroup.Item>
    ))
  ) : (
    <ListGroup.Item variant="danger">
      This Teacher Doesn't Regist in Any Course Yet
    </ListGroup.Item>
  );

  shows.showStudents = student ? (
    student.map((element, index) => (
      <option key={index} value={element.studentId}>
        {element.studentNameEnglish}
      </option>
    ))
  ) : (
    <option disabled className="text-danger">
      No Student Exists
    </option>
  );
  shows.showCourses = courses ? (
    courses.map((element, index) => (
      <option key={index} value={element.id}>
        {element.name}
      </option>
    ))
  ) : (
    <option disabled className="text-danger">
      No Courses Exists
    </option>
  );
  // shows.showTeachersAssistantCourses = teacherAssistantCourses ? (
  //   teacherAssistantCourses.map((element, index) => (
  //     <option key={index} value={element.id}>
  //       {element.name}
  //     </option>
  //   ))
  // ) : (
  //   <option disabled className="text-danger">
  //     No Courses Exists
  //   </option>
  // );

  shows.showSemesters = semester ? (
    semester.map((element, index) => (
      <option key={index} value={element.id}>
        {element.name}
      </option>
    ))
  ) : (
    <option disabled className="text-danger">
      No Semester Exists
    </option>
  );

  shows.showDepartments = department ? (
    department.map((element, index) => (
      <option key={index} value={element.departmentId}>
        {element.departmentName}
      </option>
    ))
  ) : (
    <option disabled className="text-danger">
      No Department Exists
    </option>
  );

  shows.showCurrentSemesters = currentSemesters?.semesterName ? (
    currentSemesters?.semesterName.map((element, index) => (
      <tr key={index} value={element.id} style={{ width: "100%" }}>
        <td
          style={{ fontSize: "20px", width: "100%" }}
          className="d-flex justify-content-between"
          value={element.id}
        >
          <span>{element.name}</span>
          <span>
            <Button
              variant="outline-danger"
              size="lg"
              onClick={(e) => handelEndSemester(element)}
            >
              End
            </Button>
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr disabled className="text-danger">
      <td className="text-danger" style={{ fontSize: "20px" }}>
        {" "}
        No Current Semester Exists{" "}
      </td>
    </tr>
  );
  shows.showCurrentSemestersForStudentSemester =
    currentSemesters?.semesterName ? (
      currentSemesters?.semesterName.map((element, index) => (
        <option key={index} value={element.id}>
          {element.name}
        </option>
      ))
    ) : (
      <option
        disabled
        style={{ textAlign: "center", color: "red", padding: "5px" }}
      >
        No data
      </option>
    );

  const handelSubmitForAccessMethod = (event) => {
    event.preventDefault();
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
    axios
      .post(`/api/Course/AddCourseAssessMethod`, {
        courseAssessMethods,
      })
      .then((response) => {
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: response?.data.message,
          });
        }
        resetVariables();
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Error Occured",
        });
      });
  };
  const handelSubmitForTeacherCourse = (event) => {
    event.preventDefault();
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
    axios
      .post(`/api/Staff/AssignCourseStaff`, teacherCourses)
      .then((response) => {
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: response?.data.message,
          });
        }
        getCoursesForTeacher();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelSubmitForAddStudentSemester = (event) => {
    event.preventDefault();
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
    axios
      .post(`/api/Student/AddStudentSemester`, {
        studentId,
        departmentId,
        scientificDegreeId: semesterId,
      })
      .then((response) => {
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: response?.data.message,
          });
        }
        resetVariables();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message ,
        });
      });
  };

  const handelEndSemester = (event) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to End  ${event.name}?`,
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
            .post(`/api/Control/EndSemester${event.id}`)
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Semester has been Ended.",
                icon: "success",
              });
            })
            .catch(() => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "An Error Occured During End Opreation.",
                icon: "eroor",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Semester is safe :)",
            icon: "error",
          });
        }
      });
  };

  const formatDate = (dateRange) => {
    const [startDate, endDate] = dateRange.split(" - ");

    const startYear = startDate.split("/")[2];
    const endYear = endDate.split("/")[2];

    return `${startYear} / ${endYear}`;
  };
  return (
    <div className="px-4">
      <Tabs
        defaultActiveKey="assess"
        id="fill-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="assess" title="Courses Assess Method ">
          <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
            <div
              style={{
                background: "#121431",
                color: "white",
                padding: "20px",
                fontSize: "30px",
              }}
            >
              Courses Assess Method
            </div>
            <Form style={{ padding: "10px" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Course Name
                </Form.Label>
                <Form.Select onChange={(e) => setCoursesId(e.target.value)}>
                  <option hidden defaultValue>
                    Select a Course
                  </option>
                  {shows.showCourses}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Assess Methods
                </Form.Label>
                <Select
                  options={assessMethods}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.id}
                  value={selectedOptions}
                  onChange={handelChange}
                  isMulti
                />
              </Form.Group>
              <Row>
                <Col className="">
                  <Button
                    variant="success"
                    onClick={handelSubmitForAccessMethod}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Tab>

        <Tab eventKey="student-semester" title="Student Semester ">
          <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
            <div
              style={{
                background: "#121431",
                color: "white",
                padding: "20px",
                fontSize: "30px",
              }}
            >
              Student Semester
            </div>

            <Form className="p-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Semester Name
                </Form.Label>
                <Form.Select
                  onChange={(e) => setCurrentSemesterId(e.target.value)}
                >
                  <option hidden defaultValue>
                    Select a Semester
                  </option>
                  {shows.showCurrentSemestersForStudentSemester}
                </Form.Select>
              </Form.Group>
              {currentSemesterId ? (
                <>
                  <Table>
                    <thead>
                      <tr style={{ fontSize: "20px", fontWeight: "bold" }}>
                        <th></th>
                        <th>Student Code</th>
                        <th>Student Name</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentBySemester && studentBySemester.length > 0 ? (
                        currentRecords?.map((item, counter) => (
                          <tr
                            key={counter}
                            style={{ fontSize: "17px" }}
                            id={`item-${counter}`}
                          >
                            <td>{counter + 1}</td>
                            <td>{item.studentCode}</td>
                            <td>{item.studentName}</td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => handelStudentDelete(item)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            style={{
                              textAlign: "center",
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "red",
                            }}
                          >
                            No Data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              ) : (
                <h2 style={{ textAlign: "center" }}>Select Semester</h2>
              )}
            </Form>
          </div>
        </Tab>

        <Tab eventKey="teacher-courses" title="Teacher Courses">
          <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
            <div
              style={{
                background: "#121431",
                color: "white",
                padding: "20px",
                fontSize: "30px",
              }}
            >
              Teacher Courses
            </div>
            <div className="p-1">
            <Tabs defaultActiveKey="teacher" id="fill-tab-example" justify variant="underline">
              <Tab eventKey={"teacher"} title="Teacher">
                <Form style={{ padding: "10px" }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      Teacher Name
                    </Form.Label>
                    <Form.Select onChange={(e) => setTeacherId(e.target.value)}>
                      <option defaultValue hidden>
                        Select a Teacher
                      </option>
                      {shows.showTeachers}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      Course Name
                    </Form.Label>
                    <Select
                      options={courses}
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.id}
                      value={selectedOptionsForTeacherCourse}
                      onChange={handelChangeForSemesterCourse}
                      isMulti
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      The teacher's current courses
                    </Form.Label>
                    <ListGroup>{shows.showCoursesName}</ListGroup>
                  </Form.Group>
                  <Row>
                    <Col className="">
                      <Button
                        variant="success"
                        onClick={handelSubmitForTeacherCourse}
                      >
                        Save Change
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey={"teacher-ass"} title="Teacher Assistant">
              <Form style={{ padding: "10px" }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      Teacher Name
                    </Form.Label>
                    <Form.Select onChange={(e) => setTeacherId(e.target.value)}>
                      <option defaultValue hidden>
                        Select a Teacher 
                      </option>
                      {shows.showTeachersAssistant}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      Course Name
                    </Form.Label>
                    <Select
                      options={teacherAssistantCourses}
                      getOptionLabel={(e) => e.courseName}
                      getOptionValue={(e) => e.courseId}
                      value={selectedOptionsForTeacherCourse}
                      onChange={handelChangeForSemesterCourseAssistant}
                      isMulti
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontSize: "20px" }}>
                      The teacher's current courses
                    </Form.Label>
                    <ListGroup>{shows.showCoursesName}</ListGroup>
                  </Form.Group>
                  <Row>
                    <Col className="">
                      <Button
                        variant="success"
                        onClick={handelSubmitForTeacherCourse}
                      >
                        Save Change
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
            </div>
          </div>
        </Tab>

        <Tab eventKey="add-student-semester" title="Add Student Semester">
          <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
            <div
              style={{
                background: "#121431",
                color: "white",
                padding: "20px",
                fontSize: "30px",
              }}
            >
              Add Student Semester
            </div>
            <Form style={{ padding: "10px" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Student Name
                </Form.Label>
                <Form.Select onChange={(e) => setStudentId(e.target.value)}>
                  <option hidden defaultValue>
                    Select a Student
                  </option>
                  {shows.showStudents}
                </Form.Select>
              </Form.Group>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Faculty Name
                </Form.Label>
                <Form.Select onChange={(e) => setFacultyId(e.target.value)}>
                  <option disabled selected>
                    Select a faculty
                  </option>
                  {shows.showFaculty}
                </Form.Select>
              </Form.Group> */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Semester Name
                </Form.Label>
                <Form.Select onChange={(e) => setSemesterId(e.target.value)}>
                  <option defaultValue hidden>
                    Select a Semester
                  </option>
                  {shows.showSemesters}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontSize: "20px" }}>
                  Department Name
                </Form.Label>
                <Form.Select onChange={(e) => setDepartmentId(e.target.value)}>
                  <option defaultValue hidden>
                    Select a Department
                  </option>
                  {shows.showDepartments}
                </Form.Select>
              </Form.Group>
              <Row>
                <Col className="">
                  <Button
                    variant="success"
                    onClick={handelSubmitForAddStudentSemester}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Tab>

        <Tab eventKey="premissions" title="Permissions">
          <div>
            <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
              <div
                style={{
                  background: "#121431",
                  color: "white",
                  padding: "20px",
                  fontSize: "30px",
                }}
              >
                Give Permissions
              </div>
              <Form style={{ padding: "10px" }}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: "20px" }}>
                    Teacher Name
                  </Form.Label>
                  <Select
                    options={staffPermission}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.userId}
                    onChange={(e) => handelPermissions(e.userId)}
                  />
                </Form.Group>

                <div className="mb-3">
                  {premissionRoles?.map((role, index) => (
                    <div key={index} className="d-flex gap-3">
                      <input
                        type="checkbox"
                        checked={role.isSelected}
                        onChange={() => handleCheckboxChange(role.id)}
                        id={`permission-${index}`}
                      />
                      <label
                        htmlFor={`permission-${index}`}
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {role.name}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  variant="success"
                  onClick={(e) => handleSavePermissions(e)}
                >
                  Save Changes
                </Button>
              </Form>
            </div>
          </div>
        </Tab>
        <Tab eventKey="end-semester" title="End Semester">
          <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
            <div
              style={{
                background: "#121431",
                color: "white",
                padding: "20px",
                fontSize: "30px",
              }}
            >
              Academic Year :{" "}
              {currentSemesters?.academyYearName
                ? formatDate(currentSemesters?.academyYearName)
                : "NO Data "}
            </div>
            <div className="p-3">
              <Table borderedless="true" className="">
                <tbody>{shows.showCurrentSemesters}</tbody>
              </Table>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
