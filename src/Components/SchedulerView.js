import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Table } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const daysOfWeek = [
  { name: "Saturday", value: 1 },
  { name: "Sunday", value: 2 },
  { name: "Monday", value: 3 },
  { name: "Tuesday", value: 4 },
  { name: "Wednesday", value: 5 },
  { name: "Thursday", value: 6 },
  { name: "Friday", value: 7 },
];

const SchedulerView = () => {
  const axiosPrivate = useAxiosPrivate();
  const [teachers, setTeachers] = useState([]);
  const [facultyNames, setFacultyNames] = useState([]);
  const [placesNames, setPlacesNames] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentSemesters, setCurrentSemesters] = useState([]);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    type: "",
    teacher: "",
    course: "",
    day: "",
    startTime: "",
    endTime: "",
    capacity: "",
    place: "",
    academicYear: "",
  });
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [tableData, setTableData] = useState([]); // Ensure tableData is initialized as an empty array

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axiosPrivate.get(`api/Facult/Faculty`);
        setFacultyNames(res.data?.data?.getFacultyDtos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFaculties();
  }, [axiosPrivate]);

  const fetchCurrentSemesters = async (facultyId) => {
    try {
      const res = await axiosPrivate.get(
        `api/control/GetAllSemester/${facultyId}`
      );
      setCurrentSemesters(res.data?.data?.semesterName);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async (facultyId) => {
    try {
      const res = await axiosPrivate.get(
        `/api/control/GetAllCourse/${facultyId}`
      );
      setCourses(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPlaces = async (facultyId) => {
    try {
      const res = await axiosPrivate.get(`/api/schedulePlace/all/${facultyId}`);
      setPlacesNames(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTeachers = async (courseId, type) => {
    try {
      const endpoint =
        type === "1"
          ? `/api/teacher/getalll/${courseId}`
          : `/api/teacherAssistant/getalll/${courseId}`;
      const res = await axiosPrivate.get(endpoint);
      setTeachers(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTable = async () => {
    try {
      const res = await axiosPrivate.get(
        `api/schedule/info/${selectedSemester}/${selectedFaculty}`
      );
      setTableData(res.data?.data?.getScheduleDetailsInfo || []); // Ensure tableData is set to data or an empty array if data is null or undefined
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedFaculty) {
      fetchPlaces(selectedFaculty);
      fetchCurrentSemesters(selectedFaculty);
    } else {
      setPlacesNames([]);
      setCurrentSemesters([]);
    }
  }, [selectedFaculty]);

  useEffect(() => {
    if (selectedSemester) {
      fetchCourses(selectedSemester);
      fetchTable();
    } else {
      setCourses([]);
    }
  }, [selectedSemester]);

  useEffect(() => {
    if (formData.course && formData.type) {
      fetchTeachers(formData.course, formData.type);
    } else {
      setTeachers([]);
    }
  }, [formData.course, formData.type]);

  useEffect(() => {
    if (!show) {
      setFormData({
        id: 0,
        type: "",
        teacher: "",
        course: "",
        day: "",
        startTime: "",
        endTime: "",
        capacity: "",
        place: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newScheduleDetail = {
      semesterDegreeId: +selectedSemester,
      academyYearId: +formData.academicYear,
      scheduleDetails: [
        {
          id: formData.id,
          scheduleType: +formData.type,
          scheduleDay: +formData.day,
          startHour: +formData.startTime.split(":")[0],
          startMinute: +formData.startTime.split(":")[1],
          endHour: +formData.endTime.split(":")[0],
          endMinute: +formData.endTime.split(":")[1],
          capacity: +formData.capacity,
          facultyId: +selectedFaculty,
          staffId: +formData.teacher,
          schedulePlaceId: +formData.place,
          courseId: +formData.course,
        },
      ],
    };

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
      await axiosPrivate.put(`api/schedule`, newScheduleDetail).then((res) => {
        if (res?.status === 200) {
          Toast.fire({
            icon: "success",
            title: res?.data.message,
          });
          // Clear form data after adding event
          setFormData({
            id: 0,
            type: "",
            teacher: "",
            course: "",
            day: "",
            startTime: "",
            endTime: "",
            capacity: "",
            place: "",
          });

          setShow(false);
        }
      });
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error?.response?.data.message,
      });
    }
  };

  const handleEdit = async (scheduleId) => {
    setShow(true); // Show the modal for editing
    try {
      const res = await axiosPrivate.get(`/api/Schedule/ById/${scheduleId}`);
      const schedule = res.data?.data;

      if (schedule) {
        setFormData({
          id: schedule.id,
          type: schedule.scheduleType,
          teacher: schedule.staffId,
          course: schedule.courseId,
          day: schedule.scheduleDay,
          startTime: `${String(schedule.startHour).padStart(2, "0")}:${String(
            schedule.startMinute
          ).padStart(2, "0")}`,
          endTime: `${String(schedule.endHour).padStart(2, "0")}:${String(
            schedule.endMinute
          ).padStart(2, "0")}`,
          capacity: schedule.capacity,
          place: schedule.schedulePlaceId,
          academicYear: schedule.academyYearId
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Sorting tableData based on scheduleDay value
  const sortedTableData = [...tableData].sort((a, b) => {
    return (
      daysOfWeek.find((day) => day.value === a.scheduleDay)?.value -
      daysOfWeek.find((day) => day.value === b.scheduleDay)?.value
    );
  });

  const handelRaiseTable =()=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Raise Table?`,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosPrivate
            .postPost(`api/Schedule/AssignStudentsToScheduleWithScientificDegreeId/${selectedSemester}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
            })
            .catch((res) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: res?.data?.response?.message,
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
  }

  const handelDelete = (item)=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to ${item?.courseName}${item?.timing}?`,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosPrivate
            .delete(`api/Schedule/${item?.schedulesId}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchTable()
            }
            
          )
            .catch((res) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: res?.data?.response?.message,
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
  }

  return (
    <div className="pad">
      <Row >
        <div className="d-flex justify-content-between">
          <Button onClick={() => navigate("/admin/admin-scheduler")}>
            New Schedules
          </Button>
          <Button onClick={() => navigate("/admin/places")}>Places</Button>
        </div>
      </Row>
      <Row className="scheduler-head">
      <Col xs={12} md={5}>
        <Form.Group controlId="formFaculty">
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            as="select"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            required
          >
            <option defaultValue hidden>
              Select faculty
            </option>
            {facultyNames?.map((item, i) => (
              <option key={i} value={item?.facultId}>
                {item?.facultName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={5}>
        <Form.Group controlId="formCurrentSems">
          <Form.Label>Current Semester</Form.Label>
          <Form.Control
            as="select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            required
          >
            <option defaultValue hidden>
              Select semester
            </option>
            {currentSemesters && currentSemesters.length > 0 ? (
              currentSemesters?.map((item, i) => (
                <option key={i} value={item?.id}>
                  {item?.name}
                </option>
              ))
            ) : (
              <option>No Semesters</option>
            )}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={12} md={2} className="d-flex align-items-end justify-content-md-end mt-2 mt-md-0">
        <Button variant="secondary" onClick={handelRaiseTable}>Raise Table</Button>
      </Col>
    </Row>
      <div className="table-content">
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Place</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 ? (
            sortedTableData.map((item, i) => (
              <tr key={i}>
                <td>
                  {
                    daysOfWeek.find((day) => day.value === item.scheduleDay)
                      ?.name
                  }
                </td>
                <td>{item?.timing}</td>
                <td>{item.courseName}</td>
                <td>{item.staffName}</td>
                <td>{item.schedulePlacesName}</td>
                <td>{item.capacity}</td>
                <td>{item.scheduleType === 1 ? "Lecture" : "Section"}</td>
                <td className="d-flex gap-1">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(item.schedulesId)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handelDelete(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-danger text-center fw-bold">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option defaultValue hidden>
                  Select course
                </option>
                {courses?.map((item, i) => (
                  <option key={i} value={item?.courseId}>
                    {item?.courseName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option defaultValue hidden>
                  Select type
                </option>
                <option value={1}>Lecture</option>
                <option value={2}>Section</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTeacher">
              <Form.Label>Teacher</Form.Label>
              <Form.Control
                as="select"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
              >
                <option defaultValue hidden>
                  Select teacher
                </option>
                {teachers?.map((item, i) => (
                  <option key={i} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDay">
              <Form.Label>Day</Form.Label>
              <Form.Control
                as="select"
                name="day"
                value={formData.day}
                onChange={handleChange}
                required
              >
                <option defaultValue hidden>
                  Select day
                </option>
                {daysOfWeek.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEndTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                as="select"
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              >
                <option defaultValue hidden>
                  Select place
                </option>
                {placesNames?.map((item, i) => (
                  <option key={i} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SchedulerView;
