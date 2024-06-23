import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import useFaculty from "../hooks/useFaculty";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode"; // Remove the curly braces
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function MyNavbar(props) {
  const [rotateIcon, setRotateIcon] = useState(false);
  const [isInvalid, setIsInvalid] = useState(true);
  const toggle = () => {
    props.setChangeActive(!props.changeActive);
    setRotateIcon(!rotateIcon);
  };

  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const [psw, setPsw] = useState();
  const [new_psw, setNew_psw] = useState();
  const [con_psw, setCon_psw] = useState();
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
        const faculties = res?.data?.data?.getFacultyDtos || [];
        setFacultyNames(faculties);
        if (faculties.length === 1) {
          setGlobalFaculty(faculties[0].facultId);
          setIsInvalid(false);
        } else if (
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
        if (Auth?.dataDetails?.roles !== "Student") {
          const staffRes = await axios.get("/api/staff/F");
          setGlobalFaculty(staffRes?.data?.data?.factulyId);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllFaculty();
  }, []);

  const navigate = useNavigate();
  const goToStudentFormat = () => {
    navigate("/admin/student-format");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelChangePassword = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    const data = {
      oldPassword: psw,
      newPassword: new_psw,
      confirmPassword: con_psw,
    };
    try {
      await axios.post(`api/Auth/ChangePassword`, data).then((res) => {
        Toast.fire({
          icon: "success",
          title: res?.data.message,
        });
        setCon_psw("");
        setPsw("");
        setNew_psw("");
      });
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error?.response?.data.message,
      });
    }
  };

  const [showPass, setShowPass] = useState(true);

  const handleAssignCourse = ()=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to assign student course ? `,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`api/Control/assignCourses`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Done!",
                text: res?.data?.message,
                icon: "success",
              });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: error?.response?.data?.message,
                icon: "eroor",
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="inputPassword5">Old Password</Form.Label>
            <Form.Control
              type={showPass ? "password" : "text"}
              id="inputPassword"
              placeholder="Old Password"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPsw(e.target.value)}
              value={psw}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="inputPassword5">New Password</Form.Label>
            <Form.Control
              type={showPass ? "password" : "text"}
              placeholder="New Password"
              id="inputNewPassword"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setNew_psw(e.target.value)}
              value={new_psw}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
            <Form.Control
              type={showPass ? "password" : "text"}
              placeholder="Confirm Password"
              id="inputConPassword"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setCon_psw(e.target.value)}
              value={con_psw}
            />
          </Form.Group>
          <div className="d-flex align-items-center gap-2 mt-3">
            <span>
              <Button
                size="sm"
                variant="light"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i class="fa-solid fa-eye"></i>
                ) : (
                  <i class="fa-solid fa-eye-slash"></i>
                )}
              </Button>
            </span>
            <span>show Password</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelChangePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        style={{ background: "red" }}
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand>
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
              <Nav.Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <strong>user </strong> | {decoded?.name}
                </p>
              </Nav.Link>
            </Nav>
            <Nav className="d-flex align-items-center gap-2 nav-settings">
              {Auth?.dataDetails?.roles?.includes("Administration") ? (
                <NavDropdown title="Settings" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Button} onClick={goToStudentFormat}>
                    Student Format
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Button}>
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Button} onClick={handleAssignCourse}>
                    Assign Student to course
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Button} onClick={handleShow}>
                    Change Password
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              ) : (
                <NavDropdown title="Settings" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={Button} onClick={handleShow}>
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              )}
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
