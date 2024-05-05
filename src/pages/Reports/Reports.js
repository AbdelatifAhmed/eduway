import {  Card } from "react-bootstrap";
import stdImg from '../../images/student-reports.jpg'
import { Link } from "react-router-dom";

export default function Reports() {
  return (
    <div className="pad d-flex gap-5" >
      <Card variant="top" bg="white" text="dark" style={{ width: "18rem" ,textAlign:"center"}} >
        <Card.Img variant="top" src={stdImg} alt="Logo" />
        <Card.Body>
          <Card.Title as="h4">Student Result</Card.Title>
          <Card.Text className="text-muted">
            Reports for Students courses degrees and his status in each semester for any academic year  
          </Card.Text>
        </Card.Body>
          <Card.Footer >
          <Link to={"/admin/student-result"} className="btn btn-dark">Go to page</Link>
          </Card.Footer>
      </Card>

      <Card variant="top" bg="white" text="dark" style={{ width: "18rem" ,textAlign:"center"}} >
        <Card.Img variant="top" src={stdImg} alt="Logo" />
        <Card.Body>
          <Card.Title as="h4">Course Result</Card.Title>
          <Card.Text className="text-muted">
            Reports for All Students in specific course in specific semester for any academic year  
          </Card.Text>
        </Card.Body>
          <Card.Footer >
          <Link to={"/admin/course-result"} className="btn btn-dark">Go to page</Link>
          </Card.Footer>
      </Card>

      <Card variant="top" bg="white" text="dark" style={{ width: "18rem" ,textAlign:"center"}} >
        <Card.Img variant="top" src={stdImg} alt="Logo" />
        <Card.Body>
          <Card.Title as="h4">Semester Result</Card.Title>
          <Card.Text className="text-muted">
            Reports for All Students in specific semester for any academic year  
          </Card.Text>
        </Card.Body>
          <Card.Footer >
          <Link to={"/admin/semester-result"} className="btn btn-dark">Go to page</Link>
          </Card.Footer>
      </Card>      
    </div>
  );
}
