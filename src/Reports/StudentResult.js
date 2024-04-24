import { useEffect, useState } from "react";
import axios from "../Api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

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

    const navigator = useNavigate();
    const goBack = () => {
      navigator(-1);
    };
  return (
    <div className="student-result pad">
      <div className="mb-2">
        <Button variant="dark" onClick={goBack} >Back To Student Course</Button>
      </div>
      <header className="para">
        <div className="item-1">
          <span>
            student name : <span>{studentData?.studentName || ""}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            student code : <span>{studentData?.studentCode}</span>
          </span>
        </div>
        <div className="item-1">
          <span>
            Status : <span>{studentData?.studentSemesterStatus}</span>
          </span>
        </div>
        <div className="item">
          <span>
            Semester Percentage : <span>{studentData?.studentSemesterPercentage}</span>
          </span>
        </div>
        <div className="item">
          <span>
            Semester Char : <span>{studentData?.studentSemesterChar}</span>
          </span>
        </div>
        <div className="item">
          <span>
          Cumulative Percentage : <span>{studentData?.studentCumulativePercentage}</span>
          </span>
        </div>
        <div className="item">
          <span>
          Cumulative Char  : <span>{studentData?.studentCumulativeChar}</span>
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
