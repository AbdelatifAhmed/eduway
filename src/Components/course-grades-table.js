import React from "react";

export default function CourseGradesTable() {
  return (
    <div className="course-grades-table">
      <div className="student-info">
        <div className="std-item">
          Name :<span id=""></span>
        </div>
        <div className="std-item">
          Level :<span id=""></span>
        </div>
        <div className="std-item">
          Status :<span id=""></span>
        </div>
      </div>
      <div className="grades-info">
        <table>
          <thead>
            <tr>
              <td>
                {" "}
                <span>Course Code</span>
              </td>
              <td>
                <span>Course Name</span>
              </td>
              <td>
                <span>Degree</span>
              </td>
              <td>
                <span>grade</span>
              </td>
              <td>
                <span>Cridet hours</span>
              </td>
              <td style={{ width: "5%" }}>2020/2023</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
              <td>f</td>
            </tr>
            <tr>
              <td>s</td>
              <td>w</td>
              <td>a</td>
              <td>s</td>
              <td>w</td>
              <td></td> {/* necessary empty td in the end of  tr*/}
            </tr>
            <tr>
              <td>a</td>
              <td>g</td>
              <td>j</td>
              <td>j</td>
              <td>k</td>
              <td></td>
            </tr>
            <tr>
              <td>a</td>
              <td>g</td>
              <td>j</td>
              <td>j</td>
              <td>k</td>
              <td></td>
            </tr>
            <tr>
              <td>a</td>
              <td>g</td>
              <td>j</td>
              <td>j</td>
              <td>k</td>
              <td></td>
            </tr>
            <tr>
              <td>a</td>
              <td>g</td>
              <td>j</td>
              <td>j</td>
              <td>k</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer>
        <div className="item">
          Attempted Hours: <span></span>
        </div>
        <div className="item">
          Total Earned Hours: <span></span>
        </div>
        <div className="item">
          Semester GPA: <span></span>
        </div>
        <div className="item">
          GPA: <span></span>
        </div>
      </footer>
    </div>
  );
}
