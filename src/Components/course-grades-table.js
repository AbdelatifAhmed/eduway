import React from "react";

export default function CourseGradesTable({ studentName, data }) {
  return (
    <div className="course-grades-table">
      <div className="student-info">
        <div className="std-item">
          Name :<span id="">{studentName}</span>
        </div>
        <div className="std-item">
          Level :<span id="">{data?.bandName}</span>
        </div>
        <div className="std-item">
          Status :
          <span
            id=""
            style={
              data?.semesterStatus === "Succeed"
                ? { color: "green" }
                : data?.semesterStatus === "Waiting"
                ? { color: "orange" }
                : { color: "red" }
            }
          >
            {data?.semesterStatus}
          </span>
        </div>
        <div className="std-item">
          Academic Year :<span id="">{data?.academyYearName}</span>
        </div>
      </div>

      <div className="grades-info">
        <table>
          <thead >
            <tr>
              <td>
                {" "}
                <span>Course Code</span>
              </td>
              <td>
                <span>Course Name</span>
              </td>
              <td>
                <span>Point/Hours</span>
              </td>
              <td>
                <span>Degree</span>
              </td>
              <td>
                <span>Grade</span>
              </td>
              <td>
                <span>Status</span>
              </td>
            </tr>
          </thead>
          <tbody>
           {
            data?.studentResultDeltielsSemester?.map((item,index)=>(
              <tr>
                <td>{item?.courseCode}</td>
                <td>{item?.courseName}</td>
                <td>{item?.numberOfPoint}</td>
                <td>{item?.courseDegree}</td>
                <td>{item?.courseChar}</td>
                <td style={item?.courseStatus==='Succeed' ? {color:'green'} : {color:"red"}}>{item?.courseStatus}</td>
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
      <footer>
        <div className="item">
          Semester Percentage: <span>{`${data?.semesterPercentage*100}%`}</span>
        </div>
        <div className="item">
        Semester Char: <span>{data?.semesterChar}</span>
        </div>
        <div className="item">
        Cumulative Percentage: <span>{`${data?.cumulativePercentage*100}%`}</span>
        </div>
        <div className="item">
        Cumulative Char: <span>{data?.cumulativeChar}</span>
        </div>
      </footer>
      <hr/>
    </div>
  );
}
