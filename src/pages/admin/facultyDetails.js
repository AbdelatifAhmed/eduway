import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import Swal from "sweetalert2";

export default function FacultyDetails() {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  // const [type, setType] = useState();
  const [bylaw, setBylaw] = useState();
  const [phaseId, setPhaseId] = useState();
  const [bandId, setBandId] = useState();
  const [semesterId, setSemesterId] = useState();
  const [ScientificDegreeId, setScientificDegreeId] = useState();
  const [phases, setPhases] = useState([]);
  const [bands, setBands] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [examRoles, setExamRoles] = useState([]);
  const [ScientificDegree, setScientificDegree] = useState([]);
  const [facultyData, setFacultyData] = useState([]);


  //
  const [facultyNames, setFacultyNames] = useState([]);


  // model Pop-Up
  const [addFacultyShow, setAddFacultyShow] = useState(false);
  const [addBylaw, setAddBylaw] = useState(false);
  const [addSemester, setAddSemester] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [addExamRoles, setAddExamRoles] = useState(false);
  const [addAssessMethods, setAddAssessMethods] = useState(false);
  const [addBands, setAddBands] = useState(false);
  const [addPhase, setAddPhase] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`api/Facult/getfacultydetails/${id}`)
        .then((res) => {
          setFacultyData(res?.data?.data);
        })
        .catch((err) => console.Error(err));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchPhases = async () => {
      if (ScientificDegreeId) {
        await axios
          .get(`/api/ScientificDegree/GetDetails?Id=${ScientificDegreeId}&type=3`)
          .then((res) => {
            setPhases(res?.data?.data?.getDetailsDtos);
          })
          .catch((err) => {
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
            })
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            })
          });
      }
    };
    fetchPhases();
  }, [ScientificDegreeId]);

  useEffect(() => {
    const fetchBands = async () => {
      if (phaseId) {
        await axios
          .get(`/api/ScientificDegree/GetDetails?Id=${phaseId}&type=2`)
          .then((res) => {
            setBands(res?.data?.data?.getDetailsDtos);
          })
          .catch((err) => {
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
            })
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            })
          });
      }
    };
    fetchBands();
  }, [phaseId]);

  useEffect(() => {
    const fetchSemesters = async () => {
      if (bandId) {
        await axios
          .get(`/api/ScientificDegree/GetDetails?Id=${bandId}&type=4`)
          .then((res) => {
            setSemesters(res?.data?.data?.getDetailsDtos);
          })
          .catch((err) => {
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
            })
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            })
          });
      }
    };
    fetchSemesters();
  }, [bandId]);

  useEffect(() => {
    const fetchExamRoles = async () => {
      if (semesterId) {
        await axios
          .get(`/api/ScientificDegree/GetDetails?Id=${semesterId}&type=5`)
          .then((res) => {
            setExamRoles(res?.data?.data?.getDetailsDtos);
          })
          .catch((err) => {
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
            })
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            })
          });
      }
    };
    fetchExamRoles();
  }, [semesterId]);

  useEffect(() => {
    const fetchScientificDegree = async () => {
      if (bylaw) {
        await axios
          .get(`/api/ScientificDegree/ScientificDegrees?Id=${bylaw}`)
          .then((res) => {
            setScientificDegree(res?.data?.data?.getDetailsDtos);
          })
          .catch((err) => {
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
            })
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            })
          });
      }
    };
    fetchScientificDegree();
  }, [bylaw]);

  const getAllFaculty = async() => {
    await axios
      .get("/api/Facult/Faculty", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => {
        setFacultyNames(res?.data?.data?.getFacultyDtos)
      })
      .catch((err) => console.log(err));
  }

  const [shows , setShows] = useState({
    showFaculty : [] ,
    showBaylws : [] ,
    showBands : [] ,
    showSemesters : [] ,
    showExamRoles : [] ,
    showPhases : [] ,
    showParent : [] ,
   })

  //updates 
  const [faculty, setFaculty] = useState();

  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [ids, setId] = useState();




  const [estimates, setEstimates] = useState([]);
  const [estimateCourse, setEstimateCourse] = useState([]);
  const addChildForEstimates = () => {
    // Add a new set of input elements to the array of inputs
    setEstimates([
      ...estimates,
      {
        nameEstimates: "",
        charEstimates: "",
        maxPercentageEstimates: "",
        minPercentageEstimates: "",
        maxGpaEstimates: "",
        minGpaEstimates: "",
      },
    ]);
  };

  const handleDeleteChildForEstimates = (index) => {
    // Remove the child at the specified index from the array
    const newInputs = [...estimates];
    newInputs.splice(index, 1);
    setEstimates(newInputs);
  };

  const addChildForEstimateCourse = () => {
    // Add a new set of input elements to the array of inputs
    setEstimateCourse([
      ...estimateCourse,
      {
        nameEstimatesCourse: "",
        charEstimatesCourse: "",
        maxPercentageEstimatesCourse: "",
        minPercentageEstimatesCourse: "",
      },
    ]);
  };

  const handleDeleteChildForEstimateCourse = (index) => {
    // Remove the child at the specified index from the array
    const newInputs = [...estimateCourse];
    newInputs.splice(index, 1);
    setEstimateCourse(newInputs);
  };

  const handleInputChangeForEstimate = (index, fieldName, value) => {
    // Update the input value in the state
    const newInputs = [...estimates];
    newInputs[index][fieldName] = value;
    setEstimates(newInputs);
  };

  const handleInputChangeForEstimateCourse = (index, fieldName, value) => {
    // Update the input value in the state
    const newInputs = [...estimateCourse];
    newInputs[index][fieldName] = value;
    setEstimateCourse(newInputs);
  };


  shows.showFaculty = facultyNames ?  facultyNames?.map((index) => (
    <option key={index.facultId} value={index?.facultId}>
      {index?.facultName}
    </option>
  )) : <option>No Options</option>

  const handelBylaw = async(id)=>{
    setAddBylaw(true);
    getAllFaculty()
    await axios.get(`api/bylaw/${id}`)
    .then(res=>{
      const data = res?.data?.data;
      
      setFaculty(data?.facultyId)
      setName(data?.name)
      setDescription(data?.description)
      setType(data?.type)
      setStartDate(data?.strat)
      setEndDate(data?.end)
      setEstimates(data?.estimates)
      setEstimateCourse(data?.estimatesCourses)
      setId(data?.id)
    })
  }

  const handelUpdateBylaw = async (event) => {
   // Prepare data to send to the database
    const estimatesData = estimates.map((input) => ({
      id:input.id,
      nameEstimates: input.nameEstimates,
      charEstimates: input.charEstimates,
      maxPercentageEstimates: input.maxPercentageEstimates,
      minPercentageEstimates: input.minPercentageEstimates,
      maxGpaEstimates: input.maxGpaEstimates,
      minGpaEstimates: input.minGpaEstimates,
    }));

    const estimateCourseData = estimateCourse.map((input) => ({
      id:input.id,
      nameEstimatesCourse: input.nameEstimatesCourse,
      charEstimatesCourse: input.charEstimatesCourse,
      maxPercentageEstimatesCourse: input.maxPercentageEstimatesCourse,
      minPercentageEstimatesCourse: input.minPercentageEstimatesCourse,
    }));

    // Here you can send `inputData` to your database
    event.preventDefault();
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
    try {
      axios
        .put(
          "/api/Bylaw/update",
          {
            id:ids,
            name: name,
            description: description,
            facultyId: faculty,
            type: type,
            start: startDate,
            end: endDate,
            estimates: estimatesData,
            estimatesCourses: estimateCourseData,
          },
        )
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        }).catch(err=>{
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        })
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };

  const resetVars = ()=>{
    setName("");
    setFaculty("");
    setBylaw("");
    setDescription("");
    setType("");
    setStartDate("");
    setEndDate("");
  }
  
  return (
    <div className="pad">
      <div>
      <Modal
        size="xl"
        show={addBylaw}
        onHide={() => setAddBylaw(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        // fullscreen
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Bylaws
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col">
                <Form.Group>
                  <Form.Select
                    aria-label="Default select example"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    <option defaultValue hidden>
                      Faculty
                    </option>
                    {shows.showFaculty}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Control
                    type="text"
                    placeholder="Bylaw Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group>
                  <FloatingLabel label="Type">
                    <Form.Select aria-label="Default select example"
                      onChange={e=>setType(e.target.value)}
                      value={type}
                    >
                      <option defaultValue hidden>Select Type</option>
                      <option value={1}>Credit Hours</option>
                      <option value={2}>Credit Points</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="start Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mt-2">
                <Container>
                  <Row>
                    <Col>
                      <Form.Label>Estimates</Form.Label>
                      <Row>
                        <Row>
                          <Button
                            className="btn-dark"
                            onClick={addChildForEstimates}
                          >
                            + Add Estimate
                          </Button>
                        </Row>
                        {estimates?.map((input, index) => (
                          <Row className="my-1" key={index}>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                value={input.nameEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "nameEstimates",
                                    e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="Char"
                                value={input.charEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "charEstimates",
                                    e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                placeholder="Max Percentage"
                                value={input.maxPercentageEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "maxPercentageEstimates",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Control
                                type="number"
                                placeholder="min Percentage"
                                value={input.minPercentageEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "minPercentageEstimates",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Control
                                type="number"
                                placeholder="Max GPA"
                                value={input.maxGpaEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "maxGpaEstimates",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Control
                                type="number"
                                placeholder="Min GPA"
                                value={input.minGpaEstimates}
                                onChange={(e) =>
                                  handleInputChangeForEstimate(
                                    index,
                                    "minGpaEstimates",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={1}>
                              <Button
                                variant="light"
                                size="md"
                                onClick={() =>
                                  handleDeleteChildForEstimates(index)
                                }
                              >
                                <RiDeleteBin7Fill />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <Form.Label>Estimates Courses</Form.Label>
                      <Row>
                        <Col sm={1}>
                          <Button
                            className="btn-dark"
                            onClick={addChildForEstimateCourse}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            + Add New Estimate
                          </Button>
                        </Col>
                        {estimateCourse?.map((input, index) => (
                          <Row key={index} className="mt-2">
                            <Col sm={3}>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                value={input.nameEstimatesCourse}
                                onChange={(e) =>
                                  handleInputChangeForEstimateCourse(
                                    index,
                                    "nameEstimatesCourse",
                                    e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Control
                                type="text"
                                placeholder="Char"
                                value={input.charEstimatesCourse}
                                onChange={(e) =>
                                  handleInputChangeForEstimateCourse(
                                    index,
                                    "charEstimatesCourse",
                                    e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={3}>
                              <Form.Control
                                type="number"
                                placeholder="Max Percentage"
                                value={input.maxPercentageEstimatesCourse}
                                onChange={(e) =>
                                  handleInputChangeForEstimateCourse(
                                    index,
                                    "maxPercentageEstimatesCourse",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={3}>
                              <Form.Control
                                type="numbrt"
                                placeholder="min Percentage"
                                value={input.minPercentageEstimatesCourse}
                                onChange={(e) =>
                                  handleInputChangeForEstimateCourse(
                                    index,
                                    "minPercentageEstimatesCourse",
                                    +e.target.value
                                  )
                                }
                              />
                            </Col>
                            <Col sm={1}>
                              <Button
                                variant="light"
                                size="md"
                                onClick={() =>
                                  handleDeleteChildForEstimateCourse(index)
                                }
                              >
                                <RiDeleteBin7Fill />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setAddBylaw(false)
            resetVars()
            }}>
            Close
          </Button>
          <Button variant="success" onClick={handelUpdateBylaw}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="bylaw">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="bylaw"> &gt; Bylaw</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="depertment">&gt; Departments</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="assess">&gt; Assess Methods</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="Scientfic">&gt; Scientific Degree</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="phase">&#128539; Phases</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="band">&#128539; Bands</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="semester">&#128539; Semesters</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="exam">&#128539; Exam Roles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.115)",
              }}
            >
              <Tab.Pane eventKey="bylaw">
                {facultyData?.facultyBylawDtos
                  ? facultyData?.facultyBylawDtos?.map((bylaw, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {bylaw.bylawName}
                        </span>
                        <span>
                          <Button variant="warning" onClick={()=>{
                           handelBylaw(bylaw.id)
                            }}>Edit</Button>
                        </span>
                      </div>
                    ))
                  : ""}
              </Tab.Pane>
              <Tab.Pane eventKey="depertment">
                {facultyData?.facultyDepatmentDtos
                  ? facultyData?.facultyDepatmentDtos?.map((dept, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {dept.depatmentName}
                        </span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  : "No Data"}
              </Tab.Pane>
              <Tab.Pane eventKey="assess">
                {" "}
                {facultyData?.facultyAssessMethodDtos
                  ? facultyData?.facultyAssessMethodDtos?.map((assess, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {assess.assessMethodName}
                        </span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  : "No Data"}
              </Tab.Pane>
              <Tab.Pane eventKey="Scientfic">
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="bylaw"
                    label="bylaw"
                    className="mt-2"
                  >
                    <Form.Select
                      value={bylaw}
                      onChange={(e) => {
                        setBands([]);
                        setScientificDegree([])
                        setBylaw(+e.target.value);
                      }}
                    >
                      <option defaultValue hidden>
                        Select Bylaw
                      </option>
                      {facultyData?.facultyBylawDtos
                        ? facultyData?.facultyBylawDtos?.map((bylaw, i) => (
                            <option key={i} value={bylaw.id}>
                              {bylaw.bylawName}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <div style={{ padding: "10px" }}>
                  {ScientificDegree && ScientificDegree.length > 0 ? (
                    ScientificDegree?.map((sfd, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{sfd.name}</span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Select bylaw
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="phase">
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="sfd"
                    label="Scientific Degree"
                    className="mt-2"
                  >
                    <Form.Select
                      value={ScientificDegreeId}
                      onChange={(e) => {
                        setBands([]);
                        setPhases([])
                        setScientificDegreeId(+e.target.value);
                      }}
                    >
                      <option defaultValue hidden>
                        Select Scientfic Degree
                      </option>
                      {ScientificDegree && ScientificDegree.length > 0
                        ? ScientificDegree?.map((sfd, i) => (
                            <option key={i} value={sfd.id}>
                              {sfd.name}
                            </option>
                          ))
                        : <option
                        disabled
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Back & Select Bylaw
                      </option>}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <div style={{ padding: "10px" }}>
                  {phases && phases.length > 0 ? (
                    phases?.map((p, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{p.name}</span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Select Scientfic Degree
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="band">
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="phase"
                    label="phases"
                    className="mt-2"
                  >
                    <Form.Select
                      value={phaseId}
                      onChange={(e) => {
                        setSemesters([]);
                        setBands([])
                        setPhaseId(+e.target.value);
                      }}
                    >
                      <option defaultValue hidden>
                        Select phase
                      </option>
                      {phases && phases.length > 0 ? (
                        phases?.map((p, i) => (
                          <option key={i} value={p.id}>
                            {p.name}
                          </option>
                        ))
                      ) : (
                        <option
                          disabled
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Back & Select Scientfic Degrees
                        </option>
                      )}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <div style={{ padding: "10px" }}>
                  {bands && bands.length > 0 ? (
                    bands?.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{b.name}</span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Select Phase
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="semester">
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="band"
                    label="Bands"
                    className="mt-2"
                  >
                    <Form.Select
                      value={bandId}
                      onChange={(e) => {
                        setExamRoles([]);
                        setSemesters([])
                        setBandId(+e.target.value);
                      }}
                    >
                      <option defaultValue hidden>
                        Select Band
                      </option>
                      {bands && bands.length > 0 ? (
                        bands?.map((b, i) => (
                          <option key={i} value={b.id}>
                            {b.name}
                          </option>
                        ))
                      ) : (
                        <option
                          disabled
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Back & Select phase
                        </option>
                      )}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <div style={{ padding: "10px" }}>
                  {semesters && semesters.length > 0 ? (
                    semesters?.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{s.name}</span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Select Band
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="exam">
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="semester"
                    label="Semesters"
                    className="mt-2"
                  >
                    <Form.Select
                      value={bandId}
                      onChange={(e) => setSemesterId(+e.target.value)}
                    >
                      <option defaultValue hidden>
                        Select Semester
                      </option>
                      {semesters && semesters.length > 0 ? (
                        semesters?.map((s, i) => (
                          <option key={i} value={s.id}>
                            {s.name}
                          </option>
                        ))
                      ) : (
                        <option
                          disabled
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Back & Select Band
                        </option>
                      )}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <div style={{ padding: "10px" }}>
                  {examRoles && examRoles.length > 0 ? (
                    examRoles?.map((e, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{e.name}</span>
                        <span>
                          <Button variant="warning">Edit</Button>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Select exam role
                    </div>
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
