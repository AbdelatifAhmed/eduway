import { useState } from "react";
import Sidebar from "../Components/sidebar";
import Navbar from "../Components/navbar";
export default function ExamTable() {
  const [changeActive, setChangeActive] = useState(true);
  return (
    <div className="page">
      <Sidebar changeActive={changeActive} />
      {/* <!-- Main content --> */}
      <div className={changeActive ? "main" : "main active"}>
        {/* <!-- Top Bar (Naigation bar) --> */}
        <Navbar changeActive={changeActive} setChangeActive={setChangeActive} />
        {/* conent */}
        <div className="exam-table">
          <div className="head">
            <p>data&amp;time:</p>
            <p>edu way</p>
            <i className="fa-solid fa-print" />
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <td colSpan={2}>Name:</td>
                  <td colSpan={2}>ID:</td>
                  <td colSpan={2}>semester:</td>
                  <td colSpan={2}>2023-2024</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>Code</td>
                  <td>course</td>
                  <td>Time</td>
                  <td>committi Name</td>
                  <td>committi Place</td>
                  <td>Seat</td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
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
          </div>
        </div>
      </div>
    </div>
  );
}
