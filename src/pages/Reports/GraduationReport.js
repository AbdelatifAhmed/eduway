import  { useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Table,
} from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import {  useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";

export default function GraduationReport() {
    const axios = useAxiosPrivate()
    const {globalFaculty} = useFaculty()
    const [academicYears, setAcademicYears] = useState([]);
  
    useEffect(() => {
    if (globalFaculty) {
      axios(`/api/control/AG/${globalFaculty}`)
        .then((res) => {
          setAcademicYears(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
    }, [globalFaculty]);
  
  
    const showAcademicYears =
      academicYears && academicYears.length > 0 ? (
        academicYears.map((element, index) => (
          <option key={index} value={element.acdemyYearId}>
            {element?.nameGraduate} "{element?.numberGraduate}"
          </option>
        ))
      ) : (
        <option className="text-danger" disabled>
          NO Data
        </option>
      );
  
    const [academicYearId, setAcademicYearId] = useState();
    // const [semesters, setSemesters] = useState([]);
    // const [semesterId, setSemesterId] = useState();
    // useEffect(() => {
    //   if (academicYearId) {
    //     axios(`/api/Control/SA/${academicYearId}`)
    //       .then((res) => {
    //         setSemesters(res?.data?.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // }, [academicYearId]);
  
    // const showSemesters =
    //   semesters && semesters.length > 0 ? (
    //     semesters.map((element, index) => (
    //       <option key={index} value={element.semesterId}>
    //         {element.semesterName}
    //       </option>
    //     ))
    //   ) : (
    //     <option className="text-danger" disabled>
    //       NO Data
    //     </option>
    //   );
  
    const [students, setStudents] = useState([]);
    useEffect(() => {
      if (academicYearId) {
        axios(`/api/control/SG/${academicYearId}`)
          .then((res) => {
            setStudents(res?.data?.data?.graduateStudentDetiels);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [academicYearId]);
  
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords =
      students && students.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = students && Math.ceil(students.length / recordsPerPage);
  
    const showStudents =
      students && students.length > 0 ? (
        currentRecords.map((element, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{element.studentCode}</td>
            <td>{element.studentName}</td>
            <td>
                {element.percentage*100}
            </td>
            <td>
                {element.char}
            </td>
            {/* <td>
              <Link to={`student/${element.studentSemesterId}`} className="btn btn-warning text-dark" >View</Link>
            </td> */}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={5}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              color: "red",
            }}
          >
            Choose Academic Year First
          </td>
        </tr>
      );
      const navigator = useNavigate();
    const goBack = () => {
      navigator(-1);
    };
    return (
      <div className="pad">
        <div>
          <Button onClick={goBack}>
          <FaArrowLeft/>
          </Button>
          </div>
        <header>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="academic-year">
                <FormLabel style={{ fontSize: "20px" }}>Academic Year</FormLabel>
                <FloatingLabel label="Select Academic Year">
                  <FormSelect
                    value={academicYearId}
                    onChange={(e) => {setAcademicYearId(e.target.value)
                    }}
                  >
                    <option defaultValue hidden>
                      Select Academic Year
                    </option>
                    {showAcademicYears}
                  </FormSelect>
                </FloatingLabel>
              </FormGroup>
            </Col>
  
            {/* <Col>
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
            </Col> */}
          </Row>
        </header>
        <section className="mt-3">
          <Table>
            <thead>
              <tr>
                <td></td>
                <td style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Student Code
                </td>
                <td style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Student Name
                </td>
                <td style={{ fontSize: "20px", fontWeight: "bold" }}>Percentage</td>
                <td style={{ fontSize: "20px", fontWeight: "bold" }}>Char</td>
              </tr>
            </thead>
            <tbody>{showStudents}</tbody>
          </Table>
               <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
        </section>
      </div>
    )
}

