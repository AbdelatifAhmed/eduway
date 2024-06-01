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
  Tabs,
} from "react-bootstrap";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import Swal from "sweetalert2";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


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
  const [bylawsNames, setBylawNames] = useState([]);
  const [bandNames, setBandNames] = useState([]);
  const [phaseNames, setPhaseNames] = useState([]);
  const [semesterNames, setSemesterNames] = useState([]);
  const [examRoleNames, setExamRoleNames] = useState([]);
  const [semesterParentNames, setSemesterParentNames] = useState([]);
  const [allPhases,setAllPhases]=useState([])
  const [allBands,setAllBands]=useState([])
  const [allSemesters,setAllSemesters]=useState([])
  const [allExamRoles,setAllExamRoles]=useState([])

  // model Pop-Up
  // const [addFacultyShow, setAddFacultyShow] = useState(false);
  const [addBylaw, setAddBylaw] = useState(false);
  const [addSemester, setAddSemester] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [addExamRoles, setAddExamRoles] = useState(false);
  const [addAssessMethods, setAddAssessMethods] = useState(false);
  const [addBands, setAddBands] = useState(false);
  const [addPhase, setAddPhase] = useState(false);
  const [addPhaseDegree, setAddPhaseDegree] = useState(false);

  //updates
  const [faculty, setFaculty] = useState();
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [ids, setId] = useState();
  const [code, setCode] = useState();
  const [minDegree, setminDegree] = useState();
  const [maxDegree, setMaxDegree] = useState();
  const [order, setOrder] = useState();
  const [successPercentageBand, setSuccessPercentageBand] = useState();
  const [successPercentageSemester, setSuccessPercentageSemester] = useState();
  const [successPercentagePhase, setSuccessPercentagePhase] = useState();
  const [s_bylaw, setS_bylaw] = useState();
  const [s_band, setS_band] = useState();
  const [s_phase, setS_phase] = useState();
  const [s_semester, setS_semester] = useState();
  const [s_examRole, setS_examRole] = useState();
  const [semesterParent, setSemesterParent] = useState();
  //Scientic Degree Choosen Type
  const [bandDisabled, setBandDisabled] = useState(true);
  const [phaseDisabled, setPhaseDisabled] = useState(true);
  const [semesterDisabled, setSemesterDisabled] = useState(true);
  const [examRoleDisabled, setExamRoleDisabled] = useState(true);

  const [estimates, setEstimates] = useState([]);
  const [estimateCourse, setEstimateCourse] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`api/Facult/getfacultydetails/${id}`)
      .then((res) => {
        setFacultyData(res?.data?.data);
      })
      .catch((err) => console.Error(err));
  };
  useEffect(() => {
    fetchData();
    getAllFaculty();
    getAllPhases2()
    getAllBands2()
    getAllSemesters2()
    getAllExamRoles2()
  }, []);
  useEffect(() => {
    const fetchPhases = async () => {
      if (ScientificDegreeId) {
        await axios
          .get(
            `/api/ScientificDegree/GetDetails?Id=${ScientificDegreeId}&type=3`
          )
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
            });
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            });
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
            });
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            });
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
            });
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            });
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
            });
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            });
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
            });
            Toast.fire({
              icon: "error",
              title: err?.response?.data?.message,
            });
          });
      }
    };
    fetchScientificDegree();
  }, [bylaw]);

  useEffect(() => {
    getAllParents();
  }, [s_bylaw, type]);

  const getAllFaculty = async () => {
    await axios
      .get("/api/Facult/Faculty")
      .then((res) => {
        setFacultyNames(res?.data?.data?.getFacultyDtos);
      })
      .catch((err) => console.log(err));
  };
  const getAllBaylw = () => {
    axios
      .get(`api/Bylaw/all/${id}`, {
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
      .get(`/api/Band/all/${id}`, {
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
      .get(`/api/phase/all/${id}`, {
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
      .get(`/api/semester/all/${id}`, {
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
      .get(`/api/examRole/all/${id}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setExamRoleNames(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const getAllParents = () => {
    if (s_bylaw && type) {
      axios
        .get(
          `/api/ScientificDegree/ByBylawId?bylawId=${s_bylaw}&type=${type}`,
          {
            headers: {
              Accept: "application/json",
              // Authorization: "Bearer" + token ,
            },
          }
        )
        .then((res) => setSemesterParentNames(res?.data?.data))
        .catch((err) => console.log(err));
    }
  };

  //in Faculty Details 

  const getAllPhases2 = async()=>{
    await axios.get(`/api/Phase/All/${id}`)
    .then(res=>{
      setAllPhases(res?.data?.data)
    })
  }

  const getAllBands2 = async()=>{
    await axios.get(`/api/band/All/${id}`)
    .then(res=>{
      setAllBands(res?.data?.data)
    })
  }

  const getAllSemesters2 = async()=>{
    await axios.get(`/api/semester/All/${id}`)
    .then(res=>{
      setAllSemesters(res?.data?.data)
    })
  }

  const getAllExamRoles2 = async()=>{
    await axios.get(`/api/examRole/All/${id}`)
    .then(res=>{
      setAllExamRoles(res?.data?.data)
    })
  }



  const [shows, setShows] = useState({
    showFaculty: [],
    showBaylws: [],
    showBands: [],
    showSemesters: [],
    showExamRoles: [],
    showPhases: [],
    showParent: [],
  });

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
      setS_band(null);
      setS_semester(null);
      setS_examRole(null);
    } else if (event == 4) {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(false);
      setExamRoleDisabled(true);
      document.getElementById("scienticBand").value = null;
      document.getElementById("scienticPhase").value = null;
      document.getElementById("scienticExamRole").value = null;
      setS_band(null);
      setS_phase(null);
      setS_examRole(null);
    } else if (event == 5) {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(true);
      setExamRoleDisabled(false);
      document.getElementById("scienticBand").value = null;
      document.getElementById("scienticSemester").value = null;
      document.getElementById("scienticPhase").value = null;
      setS_band(null);
      setS_phase(null);
      setS_semester(null);
    } else {
      setBandDisabled(true);
      setPhaseDisabled(true);
      setSemesterDisabled(true);
      setExamRoleDisabled(true);
    }
  };

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

  const handleDeleteChildForEstimates = (index, id) => {
    // Remove the child at the specified index from the array
    const newInputs = [...estimates];
    newInputs.splice(index, 1);
    setEstimates(newInputs);
    handelDeleteEstimates(id);
  };

  const handelDeleteEstimates = (id) => {
    axios.delete(`/api/bylaw/estimates/${id}`);
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

  const handleDeleteChildForEstimateCourse = (index, id) => {
    // Remove the child at the specified index from the array
    const newInputs = [...estimateCourse];
    newInputs.splice(index, 1);
    setEstimateCourse(newInputs);
    handelDeleteEstimateCourses(id);
  };

  const handelDeleteEstimateCourses = (id) => {
    axios.delete(`/api/bylaw/estimatesCourse/${id}`);
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

  shows.showFaculty = facultyNames ? (
    facultyNames?.map((index) => (
      <option key={index.facultId} value={index?.facultId}>
        {index?.facultName}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showBaylws = bylawsNames ? (
    bylawsNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showBands = bandNames ? (
    bandNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showSemesters = semesterNames ? (
    semesterNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showExamRoles = examRoleNames ? (
    examRoleNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showPhases = phaseNames ? (
    phaseNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  shows.showParent = semesterParentNames ? (
    semesterParentNames?.map((index) => (
      <option key={index.id} value={index?.id}>
        {index?.name}
      </option>
    ))
  ) : (
    <option>No Options</option>
  );

  //Fetch Data
  const handelBylaw = async (id) => {
    setAddBylaw(true);
    await axios
      .get(`api/bylaw/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setDescription(data?.description);
        setType(data?.type);
        setStartDate(data?.start.split("T")[0]);
        setEndDate(data?.end.split("T")[0]);
        setEstimates(data?.estimates || []);
        setEstimateCourse(data?.estimatesCourses || []);
        setId(data?.id);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelDepartment = async (id) => {
    setAddDepartment(true);
    await axios
      .get(`api/department/get/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setDescription(data?.description);
        setId(data?.id);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelAssessMethod = async (id) => {
    setAddAssessMethods(true);
    await axios
      .get(`api/assessMethod/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setDescription(data?.description);
        setMaxDegree(data?.maxDegree);
        setminDegree(data?.minDegree);
        setId(data?.id);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelPhases = async (id) => {
    setAddPhase(true);
    await axios
      .get(`api/Phase/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setId(data?.id);
        setOrder(data?.order);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelBands = async (id) => {
    setAddBands(true);
    await axios
      .get(`api/band/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setId(data?.id);
        setOrder(data?.order);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelSemesters = async (id) => {
    setAddSemester(true);
    await axios
      .get(`api/semester/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setId(data?.id);
        setOrder(data?.order);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelExamRole = async (id) => {
    setAddExamRoles(true);
    await axios
      .get(`api/examrole/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        setFaculty(data?.facultyId);
        setName(data?.name);
        setCode(data?.code);
        setId(data?.id);
        setOrder(data?.order);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };
  const handelScientificDeg = async (id) => {
    setAddPhaseDegree(true);
    getAllBaylw();
    getAllBands();
    getAllPhases();
    getAllExamRoles();
    getAllSemesters();
    await axios
      .get(`api/scientificDegree/${id}`)
      .then((res) => {
        const data = res?.data?.data;
        setName(data?.name);
        setCode(data?.code);
        setId(data?.id);
        setOrder(data?.order);
        setS_bylaw(data?.bylawId);
        setType(data?.type);
        setSemesterParent(data?.parentId);
        setS_band(data?.bandId);
        setS_phase(data?.phaseId);
        setS_semester(data?.semesterId);
        setS_examRole(data?.examRoleId);
        setDescription(data?.description);
        setSuccessPercentageBand(data?.successPercentageBand);
        setSuccessPercentagePhase(data?.successPercentagePhase);
        setSuccessPercentageSemester(data?.successPercentageSemester);
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
        });
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      });
  };

  //update Data
  const handelUpdateBylaw = async (event) => {
    // Prepare data to send to the database
    const estimatesData = estimates?.map((input) => ({
      id: input.id,
      nameEstimates: input.nameEstimates,
      charEstimates: input.charEstimates,
      maxPercentageEstimates: input.maxPercentageEstimates,
      minPercentageEstimates: input.minPercentageEstimates,
      maxGpaEstimates: input.maxGpaEstimates,
      minGpaEstimates: input.minGpaEstimates,
    }));

    const estimateCourseData = estimateCourse?.map((input) => ({
      id: input.id,
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
        .put("/api/Bylaw/update", {
          id: ids,
          name: name,
          description: description,
          facultyId: faculty,
          type: type,
          start: startDate,
          end: endDate,
          estimates: estimatesData,
          estimatesCourses: estimateCourseData,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message || "Error",
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdateDepartment = async (event) => {
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
        .put("/api/department/update", {
          id: ids,
          facultyId: faculty,
          name,
          description,
          code,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdateAssessMethod = async (event) => {
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
        .put("/api/assessMethod/update", {
          id: ids,
          facultyId: faculty,
          name,
          description,
          code,
          maxDegree,
          minDegree,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdatePhase = async (event) => {
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
        .put("/api/phase/update", {
          id: ids,
          facultyId: faculty,
          name,
          code,
          order,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdateBand = async (event) => {
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
        .put("/api/band/update", {
          id: ids,
          facultyId: faculty,
          name,
          code,
          order,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdateSemester = async (event) => {
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
        .put("/api/semester/update", {
          id: ids,
          facultyId: faculty,
          name,
          code,
          order,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelUpdateExamRole = async (event) => {
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
        .put("/api/ExamRole/update", {
          id: ids,
          facultyId: faculty,
          name,
          code,
          order,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };
  const handelupdateScientificDeg = async (event) => {
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
        .put("/api/scientificDegree/update", {
          id: ids,
          facultyId: id,
          name,
          description,
          type,
          order,
          bylawId: s_bylaw,
          bandId: s_band,
          phaseId: s_phase,
          semesterId: s_semester,
          examRoleId: s_examRole,
          parentId: semesterParent,
          successPercentageBand,
          successPercentagePhase,
          successPercentageSemester,
        })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
          // getAllBaylw();
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message,
          });
        });
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message,
      });
    }
  };

  //Delete data
  const handelDeleteBylaw = (bylaw) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${bylaw.bylawName}?`,
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
            .delete(`api/bylaw/${bylaw.id}`)
            .then(() => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Student has been Deleted.",
                icon: "success",
              });
              fetchData();
            })
            .catch(() => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "This Student Is Registed in Semester",
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
  };
  const handelDeleteDepartment = (dept) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${dept.depatmentName}?`,
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
            .delete(`api/department/delete/${dept.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeleteAssessMethod = (assess) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${assess.assessMethodName}?`,
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
            .delete(`api/assessMethod/${assess.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeletePhase = (phase) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${phase.name}?`,
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
            .delete(`api/phase/${phase.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeleteBands = (band) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${band.name}?`,
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
            .delete(`api/band/${band.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeleteSemesters = (sem) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${sem.name}?`,
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
            .delete(`api/Semester/${sem.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeleteExamRole = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${e.name}?`,
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
            .delete(`api/examRole/${e.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };
  const handelDeleteScientific = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${e.name}?`,
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
            .delete(`api/scientificDegree/${e.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              fetchData();
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: err?.response?.data?.message,
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
  };

  const resetVars = () => {
    setName("");
    setFaculty("");
    setBylaw("");
    setDescription("");
    setType("");
    setStartDate("");
    setEndDate("");
    setId("");
    setCode("");
    setMaxDegree(null);
    setminDegree(null);
    setOrder(null);
    setS_band(null);
    setS_bylaw(null);
    setS_phase(null);
    setS_semester(null);
    setS_examRole(null);
    setSemesterParent(null);
    setSuccessPercentageBand(null);
    setSuccessPercentagePhase(null);
    setSuccessPercentageSemester(null);
  };

  return (
    <div className="pad">
      {/* modals */}
      <div>
        {/* bylaw */}
        <Modal
          size="xl"
          show={addBylaw}
          backdrop="static"
          onHide={() => {
            setAddBylaw(false);
            resetVars();
          }}
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
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                      >
                        <option defaultValue hidden>
                          Select Type
                        </option>
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
                                    handleDeleteChildForEstimates(
                                      index,
                                      input?.id
                                    )
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
                                    handleDeleteChildForEstimateCourse(
                                      index,
                                      input.id
                                    )
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
            <Button
              variant="secondary"
              onClick={() => {
                setAddBylaw(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateBylaw}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* department */}
        <Modal
          size="lg"
          show={addDepartment}
          backdrop="static"
          onHide={() => {
            setAddDepartment(false);
            resetVars();
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Departments
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingDepartmentFaculty"
              label="Faculty"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option defaultValue hidden>
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
                value={name}
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
                value={code}
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
                value={description}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddDepartment(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateDepartment}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* assess method */}
        <Modal
          size="lg"
          show={addAssessMethods}
          backdrop="static"
          onHide={() => {
            setAddAssessMethods(false);
            resetVars();
          }}
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
                value={faculty}
              >
                <option hidden defaultValue>
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
                value={name}
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
                value={description}
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
                value={maxDegree}
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
                value={minDegree}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddAssessMethods(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateAssessMethod}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Scientific  */}
        <Modal
          size="lg"
          show={addPhaseDegree}
          onHide={() => setAddPhaseDegree(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          backdrop="static"
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
                      controlId="floatingPhaseDegreeBylaw"
                      label="bylaw"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={s_bylaw}
                        onChange={(e) => setS_bylaw(e.target.value)}
                      >
                        <option defaultValue hidden>
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
                          value={type}
                          onChange={(e) =>
                            handelScientificDegreeTypeChange(+e.target.value)
                          }
                        >
                          <option defaultValue hidden>
                            Selecty Type
                          </option>
                          <option value={1}>Scientific Degree</option>
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
                        onChange={(e) => setS_band(e.target.value)}
                        disabled={bandDisabled}
                        id="scienticBand"
                        value={s_band}
                      >
                        <option defaultValue hidden>
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
                        onChange={(e) => setS_phase(e.target.value)}
                        disabled={phaseDisabled}
                        id="scienticPhase"
                        value={s_phase}
                      >
                        <option defaultValue hidden>
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
                        onChange={(e) => setS_semester(e.target.value)}
                        disabled={semesterDisabled}
                        id="scienticSemester"
                        value={s_semester}
                      >
                        <option defaultValue hidden>
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
                        onChange={(e) => setS_examRole(e.target.value)}
                        disabled={examRoleDisabled}
                        id="scienticExamRole"
                        value={s_examRole}
                      >
                        <option defaultValue hidden>
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
                        value={semesterParent}
                        onChange={(e) => setSemesterParent(e.target.value)}
                        disabled={
                          examRoleDisabled &
                          phaseDisabled &
                          semesterDisabled &
                          bandDisabled
                        }
                      >
                        <option defaultValue hidden>
                          Select Semester Parent
                        </option>
                        {shows.showParent}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingPhaseDegreeName"
                    label="Name"
                  >
                    <Form.Control
                      type="Text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FloatingLabel>

                  <Form.Group className="mt-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Description"
                      value={description}
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
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                    />
                  </FloatingLabel>
                  {/* <FloatingLabel
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
                </FloatingLabel> */}
                  <FloatingLabel
                    controlId="floatingPhaseDegreeOrder"
                    label="Success Percentage Band"
                    className="mt-2"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Success Percentage Band"
                      value={successPercentageBand}
                      onChange={(e) =>
                        setSuccessPercentageBand(+e.target.value)
                      }
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
                      value={successPercentageSemester}
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
                      value={successPercentagePhase}
                      onChange={(e) =>
                        setSuccessPercentagePhase(+e.target.value)
                      }
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddPhaseDegree(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelupdateScientificDeg}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* phase */}
        <Modal
          size="lg"
          show={addPhase}
          backdrop="static"
          onHide={() => {
            setAddPhase(false);
            resetVars();
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Phase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingPhaseFaculty" label="Faculty">
              <Form.Select
                aria-label="Floating label select example"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option defaultValue hidden>
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
                value={name}
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
                value={code}
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
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddPhase(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdatePhase}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* bands */}
        <Modal
          size="lg"
          show={addBands}
          backdrop="static"
          onHide={() => {
            setAddBands(false);
            resetVars();
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Bands</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingBandsFaculty" label="Faculty">
              <Form.Select
                aria-label="Floating label select example"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option defaultValue hidden>
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
                value={name}
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
                value={code}
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
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddBands(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateBand}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Semester */}
        <Modal
          size="lg"
          show={addSemester}
          backdrop="static"
          onHide={() => {
            setAddSemester(false);
            resetVars();
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Semesters
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingSemesterFaculty" label="Faculty">
              <Form.Select
                aria-label="Floating label select example"
                onChange={(e) => setFaculty(e.target.value)}
                value={faculty}
              >
                <option hidden defaultValue>
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
                value={name}
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
                value={code}
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
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddSemester(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateSemester}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* exam Role */}
        <Modal
          size="lg"
          show={addExamRoles}
          backdrop="static"
          onHide={() => {
            setAddExamRoles(false);
            resetVars();
          }}
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
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option defaultValue hidden>
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
                value={name}
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
                value={code}
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
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddExamRoles(false);
                resetVars();
              }}
            >
              Close
            </Button>
            <Button variant="success" onClick={handelUpdateExamRole}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Content */}
      <Tab.Container id="left-tabs-example" defaultActiveKey="All">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="All" className="d-flex align-items-center gap-2"> <IoIosArrowDroprightCircle/> Faculty Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Scientfic"className="d-flex align-items-center gap-2"> <IoIosArrowDropright/> Scientific Degree</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="phase"className="d-flex align-items-center gap-2"><IoIosArrowForward/> Phases</Nav.Link>
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
              <Tab.Pane eventKey="All">
                <Tabs
                  defaultActiveKey="bylaw"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  fill
                >
              {/* All Bylaws */}
                  <Tab eventKey="bylaw" title="Bylaws">
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteBylaw(bylaw)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => {
                              handelBylaw(bylaw.id);
                            }}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/* All Departments */}
                  <Tab eventKey="department" title="Departments">
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteDepartment(dept)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelDepartment(dept.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/* All Access Method */}
                  <Tab eventKey="access" title="Access Methods" >
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteAssessMethod(assess)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelAssessMethod(assess.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/*All Phases  */}
                  <Tab eventKey="phase" title="Phases">
                    {allPhases && allPhases.length > 0
                    ? allPhases?.map((phase, i) => (
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
                          {phase.name}
                        </span>
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeletePhase(phase)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelPhases(phase.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/*All Bands  */}
                  <Tab eventKey="band" title="Bands">
                    {allBands && allBands.length > 0
                    ? allBands?.map((item, i) => (
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
                          {item.name}
                        </span>
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteBands(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelBands(item.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/*All Semesters  */}
                  <Tab eventKey="semester" title="Semesters">
                    {allSemesters && allSemesters.length > 0
                    ? allSemesters?.map((item, i) => (
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
                          {item.name}
                        </span>
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteSemesters(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelSemesters(item.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
              {/*All Exam Roles  */}
                  <Tab eventKey="exam" title="Exam Roles">
                    {allExamRoles && allExamRoles.length > 0
                    ? allExamRoles?.map((item, i) => (
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
                          {item.name}
                        </span>
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteExamRole(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelExamRole(item.id)}
                          >
                            Edit
                          </Button>
                        </span>
                      </div>
                    ))
                  : <div style={{textAlign:"center",fontWeight:"bold",color:"red",fontSize:"18px"}}>No Data</div>}
                  </Tab>
                </Tabs> 
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
                        setPhases([]);
                        setScientificDegree([]);
                        setScientificDegreeId(null);
                        setSemesters([]);
                        setBands([]);
                        setExamRoles([]);
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteScientific(sfd)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelScientificDeg(sfd.id)}
                          >
                            Edit
                          </Button>
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
                        setScientificDegreeId(+e.target.value);
                        setBands([]);
                        setPhases([]);
                        setPhaseId(null);
                      }}
                    >
                      <option defaultValue hidden>
                        Select Scientfic Degree
                      </option>
                      {ScientificDegree && ScientificDegree.length > 0 ? (
                        ScientificDegree?.map((sfd, i) => (
                          <option key={i} value={sfd.id}>
                            {sfd.name}
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
                          Back & Select Bylaw
                        </option>
                      )}
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeletePhase(phases)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelPhases(p.id)}
                          >
                            Edit
                          </Button>
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
                        setBands([]);
                        setBandId(null);
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteBands(b)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelBands(b.id)}
                          >
                            Edit
                          </Button>
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
                        setSemesters([]);
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteSemesters(s)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelSemesters(s.id)}
                          >
                            Edit
                          </Button>
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
                        <span className="d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handelDeleteExamRole(e)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handelExamRole(e.id)}
                          >
                            Edit
                          </Button>
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
