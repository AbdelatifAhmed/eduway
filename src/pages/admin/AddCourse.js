import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";


export default function AddCourse() {
  const axios = useAxiosPrivate()
  const {globalFaculty} = useFaculty()
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState();
  const [category, setCategory] = useState();
  const [maxDegree, setMaxDegree] = useState();
  const [minDegree, setMinDegree] = useState("");
  const [numberOfPoints, setNumberOfPoints] = useState(null);
  const [numberOfCreditHours, setNumberOfCreditHours] = useState(null);
  const [scientificDegreeId, setScientificDegreeId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [showPrerequisite, setShowPrerequisite] = useState(false);
  const [coursePrerequisites, setCoursePrerequisites] = useState([]);
  // Multi-Select input
  const [selectedOptions, setSelectedOptions] = useState([]);


  const handelChange = (selevtedValue) => {
    setSelectedOptions(selevtedValue);
    const output = selevtedValue.map((item) => ({
      coursePrerequisiteId: item.id,
    }));

    setCoursePrerequisites(output);
  };
  //Credit Hours And Points views
  const [isDisapledHours, setIsDisapledHours] = useState(true);
  const [isDisapledPoints, setIsDisapledPoints] = useState(true);


  //GET FOR API
  const [getCourses, setGetCourses] = useState([]);
  const [getDepartment, setGetDepartment] = useState([]);
  const [phaseDegrees, setPhaseDegrees] = useState([]);
  const showDepartment = getDepartment? getDepartment.map((dept,index)=>(
    <option key={index} value={dept.departmentId}>{dept.departmentName}</option>
  )) : <option disabled className="text-danger">No Data</option>

  const showPhaseDegrees = phaseDegrees? phaseDegrees?.map((phase,index)=>(
    <option key={index} value={phase.id}>{phase.name}</option>
  )) : <option disabled className="text-danger">No Data</option>

  useEffect(() => {
    if(globalFaculty){axios
      .get(`/api/Course/all/${globalFaculty}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setGetCourses(res.data.data))
      .catch((err) => console.log(err));


    axios
      .get(`api/Department/All/${globalFaculty}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setGetDepartment(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`api/ScientificDegree/GetAllSemestersfd/${globalFaculty}`, {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setPhaseDegrees(res.data.data))
      .catch((err) => console.log(err));}

  }, [globalFaculty]);

  const isSelected = (event) => {
    setCategory(event);
    if (event == 1) {
      setIsDisapledHours(false);
      setIsDisapledPoints(true);
      const points = document.getElementById("points");
      points.value = "";
    } else {
      setIsDisapledHours(true);
      setIsDisapledPoints(false);
      const hours = document.getElementById("hours");
      hours.value = "";
    }
  };

  const navigator = useNavigate();
  const goBack = () => {
    navigator("/admin/courses");
  };

  const handelAddCourse = async (event) => {
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
        .post("/api/Course/AddCourse", {
          facultyId:globalFaculty,
          id: 0,
          name,
          code,
          description,
          type,
          category,
          maxDegree,
          minDegree,
          numberOfPoints,
          numberOfCreditHours,
          prerequisite: showPrerequisite,
          scientificDegreeId,
          departmentId,
          coursePrerequisites,
        })
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
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
  return (
    <form onSubmit={handelAddCourse}>
      <div
        style={{ marginLeft: "20px" }}
        className="d-flex  justify-content-between"
      >
        <h1 className="d-inline btn-add1">Add Course </h1>
        <div className="d-flex  gap-2 p-2">
          <button className="btn btn-info btn-md btn-md1" style={{ color: "white" }}>
            Save
          </button>
          <button type="reset" className="btn btn-warning btn-md btn-md1">
            Reset
          </button>
          <button onClick={goBack} className="btn btn-dark btn-md btn-md1">
            Back To Courses
          </button>
        </div>
      </div>
      <div className="add-student p-3">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Course Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <select className="list" onChange={(e) => setType(+e.target.value)}>
              <option hidden defaultValue>
                Type
              </option>
              <option value={1}>اجباري</option>
              <option value={2}>اختياري</option>
            </select>
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <select
              className="list"
              onChange={(e) => isSelected(+e.target.value)}
            >
              <option hidden defaultValue>
                category
              </option>
              <option value={1} onSelect={() => setIsDisapledHours(false)}>
                Credit Hours
              </option>
              <option value={2} onSelect={() => setIsDisapledPoints(false)}>
                Credit Points
              </option>
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Course Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder="Max Degree"
              onChange={(e) => setMaxDegree(+e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder="Min Degree"
              onChange={(e) => setMinDegree(+e.target.value)}
            />
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <select  onChange={(e) => setDepartmentId(+e.target.value)} className="list">
              <option defaultValue hidden>Choose a Department</option>
              {showDepartment}
            </select>
          </div>
          <div className="col">
            <select  onChange={(e) => setScientificDegreeId(+e.target.value)} className="list">
              <option defaultValue hidden>Choose a Phase Degree</option>
              {showPhaseDegrees}
            </select>
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder=" credit Hours"
              onChange={(e) => setNumberOfCreditHours(+e.target.value)}
              readOnly={isDisapledHours}
              style={
                isDisapledHours
                  ? { background: "#ddd", outline:"none" }
                  : { background: "#fff" }
              }
              id="hours"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Points"
              onChange={(e) => setNumberOfPoints(+e.target.value)}
              readOnly={isDisapledPoints}
              style={
                isDisapledPoints
                  ? { background: "#ddd" , outline:"none"}
                  : { background: "#fff" , }
              }
              id="points"
            />
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <textarea
              className="description"
              placeholder="description"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="row pt-3">
          <label id="pre-requisite">
            <input
              type="checkbox"
              checked={showPrerequisite}
              onChange={() => setShowPrerequisite(!showPrerequisite)}
            />
            Prerequisites
          </label>

          <div className="col pt-3">
            {showPrerequisite && (
              <Select
                options={getCourses}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                value={selectedOptions}
                onChange={handelChange}
                isMulti
              />
            )}
          </div>
        </div>
      </div>
      {/* End of add-course */}
    </form>
  );
}
