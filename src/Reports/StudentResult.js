import { useEffect, useState } from "react";
import axios from "../Api/axios";
import { useParams } from "react-router-dom";

export default function StudentResult() {
    const StudentId = useParams()
    const [studentData, setStudentData] = useState([])  
    useEffect(()=>{
      axios(`api/Control/SISR${StudentId.studentId}`)
      .then(res=>{
        setStudentData(res?.data?.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])
  return (
    <div className="student-result pad">

      <header className="para">
        <div className="item">
          <span>
            student name : <span>{studentData?.studentName || ""}</span>
          </span>
        </div>
        <div className="item">
          <span>
            student code : <span>{studentData?.studentCode}</span>
          </span>
        </div>
      </header>
      <hr />
      <table>
        <thead>
          <tr>
            <td />
            <td>course code</td>
            <td>course hours</td>
            <td>course name</td>
            <td>grade</td>
            <td>total</td>
            <td>gpa</td>
            <td>number of points</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>2</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>3</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>4</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>6</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>7</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>8</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>9</td>
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
  );
}
