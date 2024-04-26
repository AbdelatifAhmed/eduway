import React, { useEffect, useState } from 'react';
import axios from '../../Api/axios';
import { Table } from 'react-bootstrap';

function Test() {
  const [data , setStudents] = useState([])
  useEffect(() => {
   
      axios(`/api/Control/SSR${3},${1}`)
        .then((res) => {
          setStudents(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  return (
    <Table style={{width:"100%", }}>
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
        {data.studentsDetiels?.map((student, index) => ( 
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
              <td rowSpan={student.studentCourseDetiles.length}>
                {student.studentSemesterStatus}
              </td>
              {/* Render first course details */}
              <td>{student.studentCourseDetiles[0].courseCode}</td>
              <td>{student.studentCourseDetiles[0].courseName}</td>
              <td>{student.studentCourseDetiles[0].courseDegree}</td>
              <td>{student.studentCourseDetiles[0].courseChar}</td>
              <td>{student.studentCourseDetiles[0].numberOfPoints}</td>
              <td>{student.studentCourseDetiles[0].courseStatus}</td>
              <td>{student.studentCourseDetiles[0].courseDegreeDetiles?.map((assess)=>(
                <div>{assess.assessMethodsName} :<span>{assess.degree}</span></div>
              ))}</td>
            </tr>
            {/* Render subsequent course details if any */}
            {student.studentCourseDetiles?.slice(1)?.map((course, courseIndex) => (
              <tr key={courseIndex}>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.courseDegree}</td>
                <td>{course.courseChar}</td>
                <td>{course.numberOfPoints}</td>
                <td>{course.courseStatus}</td>
                <td>{course.courseDegreeDetiles?.map((assess)=>(
                <div>{assess.assessMethodsName} :<span>{assess.degree}</span></div>
              ))}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}

export default Test;
