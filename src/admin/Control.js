import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "../Api/axios";

export default function Control() {
  const [courses,setCourses] = useState([])
  const [coursesId,setCoursesId] = useState()
  const [coursesDetails,setCoursesDetails] = useState([])

  
  useEffect(()=>{
    axios.get("/api/Course",)
    .then((res) => setCourses(res?.data?.data))
    .catch((err) => console.log(err));
   
    axios.get(`/api/Course/Course/GetStudentSemesterAssessMethodsBySpecificCourse${coursesId}`,)
    .then((res) => setCoursesDetails(res?.data?.data))
    .catch((err) => console.log(err));
  },[])

  const showCourses = courses.map((element)=>(
    <option key={element.id} value={element.id}>{element.name}</option>
  ))
  const showCoursesDetails = coursesDetails.map((element)=>(
    <option key={element.id} value={element.id}>{element.name}</option>
  ))



  return (
    <div className="px-4">
      <Tabs
        defaultActiveKey="assess"
        id="fill-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="assess" title="Assess Method Courses">
          
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="">Course Name</Form.Label>
                <Form.Select onChange={e => setCoursesId(e.target.value)}>
                  <option disabled selected>Select a Course</option>
                  {showCourses}
                </Form.Select>
              </Form.Group>
            </Form>
        </Tab>
        <Tab eventKey="semester-courses" title="Semester Courses">
          Tab content for Profile
        </Tab>
        <Tab eventKey="lecturer-courses" title="Lecturer Courses">
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="add-student-semester" title="Add Student Semester">
          Tab content for Contact
        </Tab>
        <Tab eventKey="premissions" title="Permissions">
          Tab content for Contact
        </Tab>
        <Tab eventKey="end-semester" title="End Semester">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}
