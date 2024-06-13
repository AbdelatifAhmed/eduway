import avatar from "../images/avatar.jpg";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import useFaculty from "../hooks/useFaculty";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export default function MyNavbar(props) {
  const [rotateIcon, setRotateIcon] = useState(false);
  const [isInvalid, setIsInvalid] = useState(true);
  const toggle = () => {
    props.setChangeActive(!props.changeActive);
    setRotateIcon(!rotateIcon);
  };

  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const { setGlobalFaculty } = useFaculty();
  const { Auth } = useAuth();
  const [decoded, setDecoded] = useState();
  useEffect(() => {
    if (Auth) {
      const decoded = jwtDecode(Auth?.accessToken);
      setDecoded(decoded);
    }
  }, [Auth]);

  const getAllFaculty = async () => {
    if (Auth?.dataDetails?.roles?.includes("Administration")) {
      try {
        const res = await axios.get("/api/Facult/Faculty");
        setFacultyNames(res?.data?.data?.getFacultyDtos || []);
        if (
          res.status === 204 ||
          (res.data?.data?.getFacultyDtos &&
            res.data?.data?.getFacultyDtos.length === 0)
        ) {
          const staffRes = await axios.get("/api/staff/F");
          setGlobalFaculty(staffRes?.data?.data?.factulyId);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        if(!Auth?.dataDetails?.roles === 'Student'){const staffRes = await axios.get("/api/staff/F");
        setGlobalFaculty(staffRes?.data?.data?.factulyId);}
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllFaculty();
  }, []);
  const navigate = useNavigate()
  const goToStudentFormat =()=>{
    navigate("/admin/student-format");
  }

  return (
    <>
      {/* <div className="topbar">
        <div className="toggle-search">
          <span className="toggle" onClick={toggle}>
            <i className="fa-solid fa-bars"></i>
          </span>

          {Auth?.dataDetails?.roles?.includes("Administration") &&
          facultyNames.length > 1 ? (
            <span>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setGlobalFaculty(e.target.value)}
              >
                <option defaultValue hidden>
                  Select Faculty
                </option>
                {facultyNames.map((f, i) => (
                  <option key={i} value={f.facultId}>
                    {f.facultName}
                  </option>
                ))}
              </Form.Select>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="user">
          <p id="name">{decoded?.name}</p>
          <img src={avatar} alt="Avatar" />
          <i className="fa-solid fa-gear fa-fw"></i>

          <i className="fa-solid fa-circle-question fa-fw"></i>
          <i className="fa-regular fa-bell fa-fw"></i>
        </div>
      </div> */}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{background:"red"}} sticky="top">
        <Container fluid>
          <Navbar.Brand >
            <span className="toggle" onClick={toggle}>
              <i
                className={`fa-solid fa-circle-chevron-left ${
                  rotateIcon ? "rotated" : ""
                }`}
              ></i>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link style={{ display: "flex", alignItems: "center" ,justifyContent:"center"}}>
                <p style={{ textTransform: "capitalize",display:"flex",alignItems:"center" }}>
                  <strong>user </strong> | {decoded?.name}
                </p>
              </Nav.Link>
              
            </Nav>
            <Nav className="d-flex align-items-center gap-2">
           { Auth?.dataDetails?.roles?.includes("Administration")
            ? <NavDropdown title="Settings" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Button} onClick={goToStudentFormat}>Student Format</NavDropdown.Item>
                <NavDropdown.Item as={Button}>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> :""}
            {Auth?.dataDetails?.roles?.includes("Administration") &&
            facultyNames.length > 1 ? (
              <span>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setGlobalFaculty(e.target.value);
                    setIsInvalid(false);
                  }}
                  isInvalid={isInvalid}
                >
                  <option defaultValue hidden>
                    Select Faculty
                  </option>
                  {facultyNames.map((f, i) => (
                    <option key={i} value={f.facultId}>
                      {f.facultName}
                    </option>
                  ))}
                </Form.Select>
              </span>
            ) : (
              ""
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
