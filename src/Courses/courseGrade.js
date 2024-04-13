import { useContext, useState , useEffect } from 'react'
import { FaSort } from 'react-icons/fa'
import Pagination from '../Components/Pagination'
import { Link } from 'react-router-dom'
import { User } from '../Auth/AuthContext';
import axios from '../Api/axios';

export default function AddCourseGrade() {
    
    const [courses, setCourses] = useState([]);
  const context = useContext(User);
  const token = context?.Auth?.token;
  // console.log(token);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("/api/Course", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));

    // axios
    //   .get("/", {
    //     headers: {
    //       Accept: "application/json",
    //       // Authorization: "Bearer" + token ,
    //     },
    //   })
    //   .then((res) => setCourses(res.data))
    //   .catch((err) => console.log(err));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(courses.length / recordsPerPage);

  const showCourses = currentRecords.map((course,index) => (
    <tr key={course.id}>
      <td style={{fontWeight:'bold' , fontSize:"18px"}}>{index + 1 }</td>
      <td>{course.id}</td>
      <td>{course.title}</td>
      <td>{course.category}</td>
      <td>{course.price}</td>
      <td>{course.description}</td>
    </tr>
  ));

  return (
    <>
    <div className="pad">
      <header>
       
      </header>
      <div className="table-content">
        <table className="table table-striped  table-bordered border border-dark">
          <thead>
            <tr>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name"></span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Student Code</span>
                  <span>
                    {/* <FaSort /> */}
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Student Name</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Midterm</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Practical / Training</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
              <th scope="col" style={{ background: "#121431", color: "white" }}>
                <div className="th-flex">
                  <span className="th-name">Oral</span>
                  <span>
                    <FaSort />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className=''>{showCourses}</tbody>
        </table>
      </div>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
    </>
  )
}
