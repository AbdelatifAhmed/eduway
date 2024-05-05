import { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";

export default function AddFaculty() {
  const axios = useAxiosPrivate()
  const [addFacultyShow, setAddFacultyShow] = useState(false);
  const [addBylaw, setAddBylaw] = useState(false);
  const [addSemester, setAddSemester] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [addExamRoles, setAddExamRoles] = useState(false);
  const [addAssessMethods, setAddAssessMethods] = useState(false);
  const [addBands, setAddBands] = useState(false);
  const [addPhase, setAddPhase] = useState(false);
  const [addPhaseDegree, setAddPhaseDegree] = useState(false);

  //Faculty Names After GET
  const [facultyNames, setFacultyNames] = useState([]);
  const [bylawsNames, setBylawNames] = useState([]);
  const [bandNames, setBandNames] = useState([]);
  const [phaseNames, setPhaseNames] = useState([]);
  const [semesterNames, setSemesterNames] = useState([]);
  const [examRoleNames, setExamRoleNames] = useState([]);
  const [semesterParentNames, setSemesterParentNames] = useState([]);

  //Changable Variables
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [bylaw, setBylaw] = useState("");
  const [band, setBand] = useState();
  const [phase, setPhase] = useState();
  const [semester, setSemester] = useState();
  const [examRole, setExamRole] = useState();
  const [semesterParent, setSemesterParent] = useState();
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [order, setOrder] = useState("");
  const [minDegree, setminDegree] = useState("");
  const [maxDegree, setMaxDegree] = useState("");
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [successPercentageCourse, setSuccessPercentageCourse] = useState();
  const [successPercentageBand, setSuccessPercentageBand] = useState();
  const [successPercentageSemester, setSuccessPercentageSemester] = useState();
  const [successPercentagePhase, setSuccessPercentagePhase] = useState();
  //Add bylaws Inputs
  const [estimates, setEstimates] = useState([]);
  const [estimateCourse, setEstimateCourse] = useState([]);

  //Scientic Degree Choosen Type
  const [bandDisabled, setBandDisabled] = useState(true);
  const [phaseDisabled, setPhaseDisabled] = useState(true);
  const [semesterDisabled, setSemesterDisabled] = useState(true);
  const [examRoleDisabled, setExamRoleDisabled] = useState(true);
  // const [type]

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

  const getAllFaculty = () => {
    axios
      .get("/api/Facult/Faculty", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setFacultyNames(res?.data?.data?.getFacultyDtos))
      .catch((err) => console.log(err));
  };
  const getAllBaylw = () => {
    axios
      .get(`api/Bylaw/ByFacultyId/${facultyId}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setBylawNames(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getAllBands = () => {
    axios
      .get(`/api/Band/ByFacultyId/${facultyId}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setBandNames(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getAllPhases = () => {
    axios
      .get(`/api/phase/ByFacultyId/${facultyId}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setPhaseNames(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getAllSemesters = () => {
    axios
      .get(`/api/semester/ByFacultyId/${facultyId}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setSemesterNames(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getAllExamRoles = () => {
    axios
      .get(`/api/examRole/ByFacultyId/${facultyId}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setExamRoleNames(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const getAllParents = () => {
    axios
      .get(`/api/ScientificDegree/ByBylawId?bylawId=${bylaw}&type=${type}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setSemesterParentNames(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    getAllFaculty();
    setFirstTime(false);
  }, []);

  useEffect(() => {
    if (!firstTime) {
      getAllBaylw();
      getAllBands();
      getAllPhases();
      getAllExamRoles();
      getAllSemesters();
    }
  }, [facultyId]);

  useEffect(() => {
    if (!firstTime) {
      getAllParents();
    }
  }, [bylaw, type]);

  const [shows , setShows] = useState({
   showFaculty : [] ,
   showBaylws : [] ,
   showBands : [] ,
   showSemesters : [] ,
   showExamRoles : [] ,
   showPhases : [] ,
   showParent : [] ,
  })

   shows.showFaculty = facultyNames ?  facultyNames?.map((index) => (
    <option key={index.facultId} value={index?.facultId}>
      {index?.facultName}
    </option>
  )) : <option>No Options</option>

  shows.showBaylws = bylawsNames ?  bylawsNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
  )) : <option>No Options</option>

  shows.showBands = bandNames ? bandNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
    )) : <option>No Options</option>


   shows.showSemesters = semesterNames ? semesterNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
  )) : <option>No Options</option>


   shows.showExamRoles = examRoleNames ? examRoleNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
    )) : <option>No Options</option>

  shows.showPhases = phaseNames ? phaseNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
    )) : <option>No Options</option>

  shows.showParent = semesterParentNames ? semesterParentNames?.map((index) => (
    <option key={index.id} value={index?.id}>
      {index?.name}
    </option>
    )) : <option>No Options</option>


  const handelAddFaculty = async (event) => {
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
        .post(
          "/api/Facult",
          {
            name: name,
            description: description,
            userId: "",
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Faculty Added successfully",
            });
          }
          getAllFaculty();
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };

  const handelAddBylaw = async (event) => {
    // Prepare data to send to the database
    const estimatesData = estimates.map((input) => ({
      nameEstimates: input.nameEstimates,
      charEstimates: input.charEstimates,
      maxPercentageEstimates: input.maxPercentageEstimates,
      minPercentageEstimates: input.minPercentageEstimates,
      maxGpaEstimates: input.maxGpaEstimates,
      minGpaEstimates: input.minGpaEstimates,
    }));

    const estimateCourseData = estimateCourse.map((input) => ({
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
        .post(
          "/api/Bylaw",
          {
            name: name,
            description: description,
            facultyId: faculty,
            type: type,
            start: startDate,
            end: endDate,
            estimates: estimatesData,
            estimatesCourses: estimateCourseData,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Faculty Added successfully",
            });
          }
          getAllBaylw();
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };

  const handelAddSemster = async (event) => {
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
      await axios
        .post(
          "/api/Semester",
          {
            facultyId: faculty,
            name: name,
            code: code,
            order: order,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Exam Role Added successfully",
            });
          }
          getAllSemesters();
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelAddDepartment = async (event) => {
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
      await axios
        .post(
          "/api/Department",
          {
            facultyId: faculty,
            name: name,
            description: description,
            code: code,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Department Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelAddExamRole = async (event) => {
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
      await axios
        .post(
          "/api/ExamRole",
          {
            facultyId: faculty,
            name: name,
            order: order,
            code: code,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Exam Role Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelAssessMehod = async (event) => {
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
      await axios
        .post(
          "/api/AssessMethod",
          {
            facultyId: faculty,
            name: name,
            description: description,
            minDegree: minDegree,
            maxDegree: maxDegree,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Assess Method Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelBand = async (event) => {
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
      await axios
        .post(
          "/api/Band",
          {
            facultyId: faculty,
            name: name,
            order: order,
            code: code,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Band Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelPhase = async (event) => {
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
      await axios
        .post(
          "/api/Phase",
          {
            facultyId: faculty,
            name: name,
            order: order,
            code: code,
            id: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Phase Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
  const handelPhaseDegree = async (event) => {
    event.preventDefault();

    const typeId = parseInt(type,10)
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
      await axios
        .post(
          "/api/ScientificDegree",
          {
            id: 0,
            name,
            order,
            type:typeId,
            description,
            bylawId: bylaw,
            bandId: band,
            phaseId: phase,
            semesterId: semester,
            examRoleId: examRole,
            parentId: semesterParent,
            successPercentageCourse,
            successPercentageBand,
            successPercentageSemester,
            successPercentagePhase,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Phase Added successfully",
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };

  const handelScientificDegreeTypeChange = (event) => {
    setType(event);
    if (event == 2) {
      setBandDisabled(false);
      setPhaseDisabled(true);
      setSemesterDisabled(true);
      setExamRoleDisabled(true);
      document.getElementById("scienticSemester").value = null;
      document.getElementById("scienticPhase").value = null;
      document.getElementById("scienticExamRole").value = null;
    } else if (event == 3) {
      setBandDisabled(true);
      setPhaseDisabled(false);
      setSemesterDisabled(true);
      setExamRoleDisabled(true);
      document.getElementById("scienticBand").value = null;
      document.getElementById("scienticSemester").value = null;
      document.getElementById("scienticExamRole").value = null;
      setBand(null)
      setSemester(null)
      setExamRole(null)
    } else if (event == 4) {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(false);
      setExamRoleDisabled(true);
      document.getElementById("scienticBand").value = null;
      document.getElementById("scienticPhase").value = null;
      document.getElementById("scienticExamRole").value = null;
      setBand(null)
      setPhase(null)
      setExamRole(null)
    } else if (event == 5) {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(true);
      setExamRoleDisabled(false);
      document.getElementById("scienticBand").value = null;
      document.getElementById("scienticSemester").value = null;
      document.getElementById("scienticPhase").value = null;
      setBand(null)
      setSemester(null)
      setPhase(null)
    } else {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(true);
      setExamRoleDisabled(true);
    }
  };

  const restVariables = () => {
    setName("");
    setFaculty("");
    setBylaw("");
    setBand("");
    setPhase("");
    setSemester("");
    setExamRole("");
    setSemesterParent(null);
    setDescription("");
    setCode("");
    setOrder("");
    setminDegree("");
    setMaxDegree("");
    setType("");
    setStartDate("");
    setEndDate("");
    setBandDisabled(true);
    setPhaseDisabled(true);
    setSemesterDisabled(true);
    setExamRoleDisabled(true);
    setShows({
      showFaculty : [] ,
      showBaylws : [] ,
      showBands : [] ,
      showSemesters : [] ,
      showExamRoles : [] ,
      showPhases : [] ,
      showParent : [] ,
     })
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between px-4"
        style={{
          paddingLeft: "20px",
          background: "#121432",
          padding: "10px 0",
          margin: "0 20px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Button
          variant="outline-light"
          className="me-2 "
          onClick={() => {
            setAddFacultyShow(true);
            restVariables();
          }}
        >
          Faculty
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddBylaw(true);
            restVariables();
          }}
        >
          Bylaws
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddSemester(true);
            restVariables();
          }}
        >
          Semesters
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddDepartment(true);
            restVariables();
          }}
        >
          Departments
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddExamRoles(true);
            restVariables();
          }}
        >
          Exam Roles
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddAssessMethods(true);
            restVariables();
          }}
        >
          Assess Methods
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddBands(true);
            restVariables();
          }}
        >
          Bands
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddPhase(true);
            restVariables();
          }}
        >
          Phase
        </Button>
        <Button
          variant="outline-light"
          onClick={() => {
            setAddPhaseDegree(true);
            restVariables();
          }}
        >
          Phase Degree
        </Button>
      </div>

      <Modal
        size="lg"
        show={addFacultyShow}
        onHide={() => setAddFacultyShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add Faculty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Faculty"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.facultyDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descriptioon"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddFacultyShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddFaculty}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="xl"
        show={addBylaw}
        onHide={() => setAddBylaw(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        // fullscreen
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
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    <option selected disabled>
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
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group>
                  <FloatingLabel label="Type">
                    <Form.Select aria-label="Default select example">
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
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    onChange={(e) => setEndDate(e.target.value)}
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
                        {estimates.map((input, index) => (
                          <Row className="my-1" key={index}>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                value={input.input1}
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
                                value={input.input2}
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
                                value={input.input3}
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
                                value={input.input4}
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
                                value={input.input5}
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
                                value={input.input6}
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
                        {estimateCourse.map((input, index) => (
                          <Row key={index} className="mt-2">
                            <Col sm={3}>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                value={input.input1}
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
                                value={input.input2}
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
                                value={input.input3}
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
                                value={input.input3}
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
          <Button variant="secondary" onClick={() => setAddBylaw(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddBylaw}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addSemester}
        onHide={() => setAddSemester(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Semesters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingSemesterFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingSemesterName"
            label="Semester Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingSemesterCode"
            label="Semester Code"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingSemesterOrder"
            label="Semester Order"
            className="mt-2"
          >
            <Form.Control
              type="number"
              placeholder="Order"
              onChange={(e) => setOrder(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddSemester(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddSemster}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addDepartment}
        onHide={() => setAddDepartment(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Departments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingDepartmentFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDepartmentName"
            label="Department Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDepartmentCode"
            label="Department Code"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDepartmentDescription"
            label="Description"
            className="mt-2"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddDepartment(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddDepartment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addExamRoles}
        onHide={() => setAddExamRoles(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Exam Roles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingExamRoleFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingExamroleName"
            label="Exam Role Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingExamRoleCode"
            label="Exam Role Code"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingExamRoleOrder"
            label="Exam Role Order"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Order"
              onChange={(e) => setOrder(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddExamRoles(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddExamRole}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addAssessMethods}
        onHide={() => setAddAssessMethods(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Assess Mehods
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingExamRoleFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingAssessMethodName"
            label="Assess Method Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingAssessDescription"
            label="Description"
            className="mt-2"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingAssessMethodMaxDegree"
            label="Max Degree"
            className="mt-2"
          >
            <Form.Control
              type="number"
              placeholder="Name"
              onChange={(e) => setMaxDegree(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingAssessMethodMinDegree"
            label="Min Degree"
            className="mt-2"
          >
            <Form.Control
              type="number"
              placeholder="Name"
              onChange={(e) => setminDegree(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setAddAssessMethods(false)}
          >
            Close
          </Button>
          <Button variant="success" onClick={handelAssessMehod}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addBands}
        onHide={() => setAddBands(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Bands</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingBandsFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingBandName"
            label="Band Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingBandCode"
            label="Band Code"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingBandOrder"
            label="Band Order"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Order"
              onChange={(e) => setOrder(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddBands(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelBand}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addPhase}
        onHide={() => setAddPhase(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Phase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingPhaseFaculty" label="Faculty">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled selected>
                Select Faculty
              </option>
              {shows.showFaculty}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPhaseName"
            label="Phase Name"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPhaseCode"
            label="Phase Code"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPhaseOrder"
            label="Phase Order"
            className="mt-2"
          >
            <Form.Control
              type="Text"
              placeholder="Order"
              onChange={(e) => setOrder(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddPhase(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelPhase}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={addPhaseDegree}
        onHide={() => setAddPhaseDegree(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Phase Degree
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingPhaseDegreeFaculty"
                    label="Faculty"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setFacultyId(e.target.value)}
                    >
                      <option disabled selected>
                        Select Faculty
                      </option>
                      {shows.showFaculty}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhaseDegreeBylaw"
                    label="bylaw"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setBylaw(e.target.value)}
                    >
                      <option disabled selected value={null}>
                        Select Bylaw
                      </option>
                      {shows.showBaylws}
                    </Form.Select>
                  </FloatingLabel>

                  <Form.Group className="mt-2">
                    <FloatingLabel
                      controlId="floatingPhaseDegreeBand"
                      label="Type"
                      className="mt-2"
                    >
                      <Form.Select
                        onChange={(e) =>
                          handelScientificDegreeTypeChange(+e.target.value)
                        }
                      >
                        <option selected value={1}>
                          Scientific Degree
                        </option>
                        <option value={2}>Band</option>
                        <option value={3}>Phase</option>
                        <option value={4}>Semester</option>
                        <option value={5}>ExamRole</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>

                  <FloatingLabel
                    controlId="floatingPhaseDegreeBand"
                    label="Band"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setBand(e.target.value)}
                      disabled={bandDisabled}
                      id="scienticBand"
                      value = {band}
                    >
                      <option disabled selected value={null}>
                        Select band
                      </option>
                      {shows.showBands}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhaseDegreePhase"
                    label="Phase"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setPhase(e.target.value)}
                      disabled={phaseDisabled}
                      id="scienticPhase"
                      value = {phase}
                    >
                      <option disabled selected>
                        Select Phase
                      </option>
                      {shows.showPhases}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhaseDegreeSemester"
                    label="Semster"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setSemester(e.target.value)}
                      disabled={semesterDisabled}
                      id="scienticSemester"
                      value = {semester}
                    >
                      <option disabled selected>
                        Select Semster
                      </option>
                      {shows.showSemesters}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhaseDegreeExamRole"
                    label="Exam Role"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setExamRole(e.target.value)}
                      disabled={examRoleDisabled}
                      id="scienticExamRole"
                      value = {examRole}
                    >
                      <option disabled selected>
                        Select Exam Role
                      </option>
                      {shows.showExamRoles}
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhaseDegreeSemsterParent"
                    label="Semster Parent"
                    className="mt-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => setSemesterParent(e.target.value)}
                      disabled={
                        examRoleDisabled &
                        phaseDisabled &
                        semesterDisabled &
                        bandDisabled
                      }
                    >
                      <option disabled selected>
                        Select Semester Parent
                      </option>
                      {shows.showParent}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingPhaseDegreeName" label="Name">
                  <Form.Control
                    type="Text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>

                <Form.Group className="mt-2">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <FloatingLabel
                  controlId="floatingPhaseDegreeOrder"
                  label="Order"
                  className="mt-2"
                >
                  <Form.Control
                    type="Text"
                    placeholder="Order"
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPhaseDegreeOrder"
                  label="Success Percentage Course"
                  className="mt-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Success Percentage Course"
                    onChange={(e) =>
                      setSuccessPercentageCourse(+e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPhaseDegreeOrder"
                  label="Success Percentage Band"
                  className="mt-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Success Percentage Band"
                    onChange={(e) => setSuccessPercentageBand(+e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPhaseDegreeOrder"
                  label="Success Percentage Semester"
                  className="mt-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Success Percentage Semester"
                    onChange={(e) =>
                      setSuccessPercentageSemester(+e.target.value)
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPhaseDegreeOrder"
                  label="Success Percentage Phase"
                  className="mt-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Success Percentage Phase"
                    onChange={(e) => setSuccessPercentagePhase(+e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddPhaseDegree(false)}>
            Close
          </Button>
          <Button variant="success" onClick={ handelPhaseDegree}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
