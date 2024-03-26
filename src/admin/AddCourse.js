import axios from "../Api/axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddCourse() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [maxDegree, setMaxDegree] = useState();
  const [minDegree, setMinDegree] = useState("");
  const [numberOfPoints, setNumberOfPoints] = useState();
  const [numberOfCreditHours, setNumberOfCreditHours] = useState();
  const [scientificDegreeId, setScientificDegreeId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [coursePrerequisite, setCoursePrerequisite] = useState();
  const [showPrerequisite, setShowPrerequisite] = useState(false);
  const [newPrerequisite, setNewPrerequisite] = useState([]);

  const [isDisapledHours, setIsDisapledHours] = useState(true);
  const [isDisapledPoints, setIsDisapledPoints] = useState(true);
  const [getCourses, setGetCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/Course", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => setGetCourses(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const showCourses = getCourses.map((course) => (
    <option value={course.id}>{course.name}</option>
  ));

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
  const addChildForPrerequisite = () => {
    // Add a new set of input elements to the array of inputs
    setNewPrerequisite([
      ...newPrerequisite,
      {
        coursePrerequisiteId: "",
      },
    ]);
  };

  const handleDeleteChild = (index) => {
    // Remove the child at the specified index from the array
    const newInputs = [...newPrerequisite];
    newInputs.splice(index, 1);
    setNewPrerequisite(newInputs);
  };

  const handleInputChangeForprerequisite = (index, fieldName, value) => {
    // Update the input value in the state
    const newInputs = [...newPrerequisite];
    newInputs[index][fieldName] = value;
    setNewPrerequisite(newInputs);
  };
  const handelAddCourse = async (event) => {
    event.preventDefault();

    const coursePrerequisites = [
      {
        coursePrerequisiteId: coursePrerequisite,
      },
    ];

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
          "/api/Course/AddCourse",
          {
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
          },
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization : "Bearer " + token
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
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
        <h1 className="d-inline">Add Course </h1>
        <div className="d-flex  gap-2 p-2">
          <button className="btn btn-info btn-md " style={{ color: "white" }}>
            Save
          </button>
          <button type="reset" className="btn btn-warning btn-md">
            Reset
          </button>
          <button onClick={goBack} className="btn btn-dark btn-md">
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
            <select className="list" onChange={(e) => setType(e.target.value)}>
              <option disabled selected>
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
              onChange={(e) => isSelected(e.target.value)}
            >
              <option disabled selected>
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
              onChange={(e) => setMaxDegree(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder="Min Degree"
              onChange={(e) => setMinDegree(e.target.value)}
            />
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Course Department"
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Phase Degree"
              onChange={(e) => setScientificDegreeId(e.target.value)}
            />
          </div>
        </div>
        {/* End of row */}
        <div className="row pt-3">
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder=" credit Hours"
              onChange={(e) => setNumberOfCreditHours(e.target.value)}
              readOnly={isDisapledHours}
              style={
                isDisapledHours
                  ? { background: "#ddd" }
                  : { background: "transparent" }
              }
              id="hours"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Points"
              onChange={(e) => setNumberOfPoints(e.target.value)}
              readOnly={isDisapledPoints}
              style={
                isDisapledPoints
                  ? { background: "#ddd" }
                  : { background: "transparent" }
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
              onChange={e=>setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <label id="pre-requisite">
          <input
            type="checkbox"
            checked={showPrerequisite}
            onChange={() => setShowPrerequisite(!showPrerequisite)}
          />
          Prerequisites
        </label>
        {showPrerequisite && (
          <Button
            variant="dark"
            size="sm"
            onClick={addChildForPrerequisite}
            style={{ whiteSpace: "nowrap", marginTop: "10px" }}
          >
            Add Prerequisite
          </Button>
        )}
        {showPrerequisite && (
          <div className="d-flex flex-wrap gap-2 pt-2">
            {newPrerequisite.map((input, index) => (
              <Row key={index}>
                <Col className="d-flex gap-1">
                  <Form.Select
                    value={input.coursePrerequisiteId}
                    onChange={(e) =>
                      handleInputChangeForprerequisite(
                        index,
                        "coursePrerequisiteId",
                        e.target.value
                      )
                    }
                  >
                    <option disabled selected>
                      Select Course{" "}
                    </option>
                    {showCourses}
                  </Form.Select>
                  <Button
                    variant="light"
                    size="md"
                    onClick={() => handleDeleteChild(index)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        )}
      </div>
      {/* End of add-course */}
    </form>
  );
}
