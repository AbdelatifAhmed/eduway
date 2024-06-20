import { useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import StudentTimetable from "../../Components/StudentTimeTable";
import useFetchTimetable from "../../Components/fetchTimetable";
export default function TimeTable() {
  const [changeActive, setChangeActive] = useState(true);
  const timetable = useFetchTimetable()
  return (
    <div className="page">
      <Sidebar changeActive={changeActive} />
      {/* <!-- Main content --> */}
      <div className={changeActive ? "main" : "main active"}>
        {/* <!-- Top Bar (Naigation bar) --> */}
        <Navbar changeActive={changeActive} setChangeActive={setChangeActive} />
        {/* conent */}
        {/* <div className="time-table">
  <div className="header-info">
    <h2 className="head">student time table</h2>
    <i className="fa-solid fa-print" />
  </div>
  <table className="tab">
    <thead>
      <tr>
        <td>times</td>
        <td>saturday</td>
        <td>sunday</td>
        <td>Monday</td>
        <td>Tuesday</td>
        <td>Wednesday</td>
        <td>Thursday</td>
        <td>friday</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          8 - 9 <sub>am</sub>
        </td>
        <td rowSpan={2} style={{ backgroundColor: "rgba(0, 255, 255, 0.769)" }}>
          Principels Of Anatomy
        </td>
        <td />
        <td rowSpan={2} style={{ backgroundColor: "rgba(0, 255, 255, 0.769)" }}>
          Principels Of Anatomy
        </td>
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          9 - 10 <sub>am</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          10 - 11 <sub>am</sub>
        </td>
        <td rowSpan={2} style={{ backgroundColor: "gold" }}>
          Principels Of Physiology
        </td>
        <td rowSpan={2}>Biochemistry Genetic</td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          11 - 12 <sub>am</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          12 - 1 <sub>pm</sub>
        </td>
        <td />
        <td rowSpan={2}>Professioalism</td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          1 - 2<sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          2 - 3 <sub>pm</sub>
        </td>
        <td rowSpan={3}>Principels Of Biochemistry Genetic</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          {" "}
          3 - 4 <sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          {" "}
          4 - 5 <sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          {" "}
          5 - 6 <sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          {" "}
          6 - 7 <sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <td>
          {" "}
          7 - 8 <sub>pm</sub>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    </tbody>
  </table>
        </div> */}
        <StudentTimetable timetable = {timetable}/>
      </div>
    </div>
  );
}


