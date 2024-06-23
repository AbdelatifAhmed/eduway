import { Card, Col, Container, Row } from "react-bootstrap";
import stdImg from "../../images/student-reports.jpg";
import { Link } from "react-router-dom";

export default function Reports() {
  return (
    <Container className="pad">
      <Row xs={1} sm={2} md={2} lg={4} className="g-4">
        <Col>
          <Card bg="white" text="dark" style={{ textAlign: "center" }}>
            <Card.Img variant="top" src={stdImg} alt="Student Result" />
            <Card.Body>
              <Card.Title as="h4">Student Result</Card.Title>
              <Card.Text className="text-muted">
                Reports for Students courses degrees and his status in each semester
                for any academic year
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={"/admin/student-result"} className="btn btn-dark">
                Go to page
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col>
          <Card bg="white" text="dark" style={{ textAlign: "center" }}>
            <Card.Img variant="top" src={stdImg} alt="Course Result" />
            <Card.Body>
              <Card.Title as="h4">Course Result</Card.Title>
              <Card.Text className="text-muted">
                Reports for All Students in specific course in specific semester for
                any academic year
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={"/admin/course-result"} className="btn btn-dark">
                Go to page
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col>
          <Card bg="white" text="dark" style={{ textAlign: "center" }}>
            <Card.Img variant="top" src={stdImg} alt="Semester Result" />
            <Card.Body>
              <Card.Title as="h4">Semester Result</Card.Title>
              <Card.Text className="text-muted">
                Reports for All Students in specific semester for any academic year
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={"/admin/semester-result"} className="btn btn-dark">
                Go to page
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col>
          <Card bg="white" text="dark" style={{ textAlign: "center" }}>
            <Card.Img variant="top" src={stdImg} alt="Graduation Result" />
            <Card.Body>
              <Card.Title as="h4">Graduation Result</Card.Title>
              <Card.Text className="text-muted">
                Reports for graduate students in specific semester for any academic year
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={"/admin/Graduation-result"} className="btn btn-dark">
                Go to page
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
