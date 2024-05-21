import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";

export default function SemesterResult() {
  const axios = useAxiosPrivate()
  const [academicYears, setAcademicYears] = useState([]);
  const {globalFaculty} = useFaculty()

  useEffect(() => {
    if(globalFaculty){axios(`/api/AcademyYear/N/${globalFaculty}`)
      .then((res) => {
        setAcademicYears(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [globalFaculty]);

  const showAcademicYears =
    academicYears && academicYears.length > 0 ? (
      academicYears.map((element, index) => (
        <option key={index} value={element.id}>
          {element.academyYearName}
        </option>
      ))
    ) : (
      <option className="text-danger" disabled>
        NO Data
      </option>
    );

  const [academicYearId, setAcademicYearId] = useState();
  const [semesters, setSemesters] = useState([]);
  const [semesterId, setSemesterId] = useState();
  useEffect(() => {
    if (academicYearId) {
      axios(`/api/Control/SA/${academicYearId}`)
        .then((res) => {
          setSemesters(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [academicYearId]);

  const showSemesters =
    semesters && semesters.length > 0 ? (
      semesters.map((element, index) => (
        <option key={index} value={element.semesterId}>
          {element.semesterName}
        </option>
      ))
    ) : (
      <option className="text-danger" disabled>
        NO Data
      </option>
    );

  const [students, setStudents] = useState([]);
  useEffect(() => {
    if (semesterId) {
      axios(`/api/Control/SSR/${semesterId}/${academicYearId}`)
        .then((res) => {
          setStudents(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [semesterId]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    students?.studentsDetiels &&
    students?.studentsDetiels?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages =
    students?.studentsDetiels &&
    Math.ceil(students?.studentsDetiels.length / recordsPerPage);
  const navigator = useNavigate();
  const goBack = () => {
    navigator(-1);
  };
  return (
    <div className="pad">
      <div>
        <Button onClick={goBack}>
          <FaArrowLeft />
        </Button>
      </div>
      <header>
        <Row>
          <Col>
            <FormGroup controlId="academic-year">
              <FormLabel style={{ fontSize: "20px" }}>Academic Year</FormLabel>
              <FloatingLabel label="Select Academic Year">
                <FormSelect
                  value={academicYearId}
                  onChange={(e) => setAcademicYearId(e.target.value)}
                >
                  <option defaultValue hidden>
                    Select Academic Year
                  </option>
                  {showAcademicYears}
                </FormSelect>
              </FloatingLabel>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup controlId="Semesters">
              <FormLabel style={{ fontSize: "20px" }}>Semesters</FormLabel>
              <FloatingLabel label="Select Semester">
                <FormSelect
                  value={semesterId}
                  onChange={(e) => setSemesterId(e.target.value)}
                >
                  <option defaultValue hidden>
                    Select Semesters
                  </option>
                  {showSemesters}
                </FormSelect>
              </FloatingLabel>
            </FormGroup>
          </Col>
        </Row>
      </header>
      <section className="mt-3">
        <div className="result">
        <div className="para mb-2">
          <div className="item-2">Academic Year : <span>{students.academyYearName}</span></div>
          <div className="item-2">Semester Name : <span>{students.semesterName}</span></div>
        </div>
          <div className="table-container" style={{ overflow: "scroll" }}>
            <table>
              <thead>
                <tr>
                  <th>Student Code</th>
                  <th>Student Name</th>
                  <th>Semester Percentage</th>
                  <th>Semester Char</th>
                  <th>Cumulative Percentage</th>
                  <th>Cumulative Char</th>
                  <th>Semester Status</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Course Degree</th>
                  <th>Course Char</th>
                  <th>Number Of Points</th>
                  <th>Course Status</th>
                  <th>Course Degree Detiles</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords?.map((student, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentCode}
                      </td>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentName}
                      </td>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentSemesterPercentage}
                      </td>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentSemesterChar}
                      </td>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentCumulativePercentage}
                      </td>
                      <td rowSpan={student.studentCourseDetiles.length}>
                        {student.studentCumulativeChar}
                      </td>
                      <td
                        rowSpan={student.studentCourseDetiles.length}
                        style={
                          student.studentSemesterStatus === "Succeed"
                            ? { color: "green" }
                            : student.studentSemesterStatus === "Waiting"
                            ? { color: "orange" }
                            : { color: "red" }
                        }
                      >
                        {student.studentSemesterStatus}
                      </td>
                      {/* Render first course details */}
                      <td>{student.studentCourseDetiles[0].courseCode}</td>
                      <td>{student.studentCourseDetiles[0].courseName}</td>
                      <td>{student.studentCourseDetiles[0].courseDegree}</td>
                      <td>{student.studentCourseDetiles[0].courseChar}</td>
                      <td>{student.studentCourseDetiles[0].numberOfPoints}</td>
                      <td
                        style={
                          student.studentCourseDetiles[0].courseStatus ===
                          "Succeed"
                            ? { color: "green" }
                            : student.studentCourseDetiles[0].courseStatus ===
                              "Waiting"
                            ? { color: "orange" }
                            : student.studentCourseDetiles[0].courseStatus ===
                              "Failed"
                            ? { color: "red" }
                            : { color: "black" }
                        }
                      >
                        {student.studentCourseDetiles[0].courseStatus}
                      </td>
                      <td>
                        {student.studentCourseDetiles[0].courseDegreeDetiles?.map(
                          (assess,index_details) => (
                            <div  key={index_details}>
                              {assess.assessMethodsName} :
                              <span>{assess.degree}</span>
                            </div>
                          )
                        )}
                      </td>
                    </tr>
                    {/* Render subsequent course details if any */}
                    {student.studentCourseDetiles
                      ?.slice(1)
                      ?.map((course, courseIndex) => (
                        <tr key={courseIndex}>
                          <td>{course.courseCode}</td>
                          <td>{course.courseName}</td>
                          <td>{course.courseDegree}</td>
                          <td>{course.courseChar}</td>
                          <td>{course.numberOfPoints}</td>
                          <td
                            style={
                              course.courseStatus === "Succeed"
                                ? { color: "green" }
                                : course.courseStatus === "Waiting"
                                ? { color: "orange" }
                                : course.courseStatus === "Failed"
                                ? { color: "red" }
                                : { color: "black" }
                            }
                          >
                            {course.courseStatus}
                          </td>
                          <td>
                            {course.courseDegreeDetiles?.map((assess,index_details) => (
                              <div key={index_details}>
                                {assess.assessMethodsName} :
                                <span>{assess.degree}</span>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
}
