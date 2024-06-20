import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Row, Col, Table } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";

const daysOfWeek = [
  { name: "Saturday", value: "1" },
  { name: "Sunday", value: "2" },
  { name: "Monday", value: "3" },
  { name: "Tuesday", value: "4" },
  { name: "Wednesday", value: "5" },
  { name: "Thursday", value: "6" },
  { name: "Friday", value: "7" },
];

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  const [teachers, setTeachers] = useState([]);
  const [facultyNames, setFacultyNames] = useState([]);
  const [placesNames, setPlacesNames] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentSemesters, setCurrentSemesters] = useState([]);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    teacher: "",
    course: "",
    day: "",
    startTime: "",
    endTime: "",
    capacity: "",
    place: "",
  });
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

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
      setCurrentSemesters(res.data?.data);
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
    // Reset form data when modal is closed
    if (!show) {
      setFormData({
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

  const handleSubmit = () => {
    const newScheduleDetail = {
      id: 0,
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
    };

    // Add new schedule detail to scheduleArray
    setScheduleArray((prevArray) => [
      ...prevArray,
      {
        ...newScheduleDetail,
      },
    ]);

    // Clear form data after adding event
    setFormData({
      type: "",
      teacher: "",
      course: "",
      day: "",
      startTime: "",
      endTime: "",
      capacity: "",
      place: "",
    });

    setShow(false); // Close the modal
  };

  const handleSendSchedule = async () => {
    console.log(scheduleArray);
    const data = {
      semesterDegreeId: +selectedSemester,
      academyYearId: 0,
      scheduleDetails: scheduleArray,
    };
    try {
      await axiosPrivate.post("api/schedule", data);
      alert("Schedule submitted successfully!");
      setScheduleArray([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (index) => {
    setScheduleArray((prevArray) =>
      prevArray.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="pad">
      <Row>
        <Col>
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
        <Col>
          <Form.Group controlId="formCurrentSems">
            <Form.Label>Current Semester</Form.Label>
            <Form.Control
              as="select"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              required
            >
              <option defaultValue hidden>
                Select Current Semester
              </option>
              {currentSemesters?.semesterName?.map((item, i) => (
                <option key={i} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button className="mt-2" onClick={() => setShow(true)}>
        Add New Event
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
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
                <option value="" disabled>
                  Select course
                </option>
                {courses?.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
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
                <option value="" disabled>
                  Select type
                </option>
                <option value={1}>Lecture</option>
                <option value={2}>Session</option>
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
                <option value="" disabled>
                  Select teacher
                </option>
                {teachers?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
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
                <option value="" disabled>
                  Select day
                </option>
                {daysOfWeek?.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
            <Form.Group controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                as="select"
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              >
                <option hidden defaultValue>
                  Select place
                </option>
                {placesNames?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
          </Form>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add Event
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      {scheduleArray.length > 0 && (
        <div className="mt-3">
          <h3>Scheduled Events</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Faculty</th>
                {/* <th>Semester</th> */}
                <th>Course</th>
                <th>Type</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Capacity</th>
                <th>Place</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduleArray.map((schedule, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{schedule.facultyId}</td>
                  {/* <td>{schedule.semesterDegreeId}</td> */}
                  <td>{schedule.courseId}</td>
                  <td>{schedule.scheduleType === 1 ? "Lecture" : "Session"}</td>
                  <td>{daysOfWeek.find(day => day.value === String(schedule.scheduleDay)).name}</td>
                  <td>{`${schedule.startHour}:${schedule.startMinute}`}</td>
                  <td>{`${schedule.endHour}:${schedule.endMinute}`}</td>
                  <td>{schedule.capacity}</td>
                  <td>{schedule.schedulePlaceId}</td>
                  <td>{schedule.staffId}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handleSendSchedule}>Send Schedule</Button>
        </div>
      )}
    </div>
  );
};

export default Admin;
