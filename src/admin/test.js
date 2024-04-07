import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../Api/axios";

function Test() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [getCourses, setGetCourses] = useState([]);

  const data = [
    {
      id: 0,
      name: "db",
      code: "db50",
      description: "database",
      type: 1,
      category: 1,
      maxDegree: 100,
      minDegree: 0,
      numberOfPoints: null,
      numberOfCreditHours: 3,
      prerequisite: true,
      scientificDegreeId: 3,
      departmentId: 1,
      coursePrerequisites: null,
    },
    {
      id: 1,
      name: "cs",
      code: "cs520",
      description: "computer scince",
      type: 1,
      category: 1,
      maxDegree: 100,
      minDegree: 0,
      numberOfPoints: null,
      numberOfCreditHours: 3,
      prerequisite: false,
      scientificDegreeId: 3,
      departmentId: 1,
      coursePrerequisites: null,
    },
    {
      id: 2,
      name: "image",
      code: "im560",
      description: "image proc",
      type: 1,
      category: 1,
      maxDegree: 100,
      minDegree: 0,
      numberOfPoints: null,
      numberOfCreditHours: 3,
      prerequisite: false,
      scientificDegreeId: 3,
      departmentId: 1,
      coursePrerequisites: null,
    },
    {
      id: 3,
      name: "cv",
      code: "cv580",
      description: "computer vision",
      type: 1,
      category: 1,
      maxDegree: 100,
      minDegree: 0,
      numberOfPoints: null,
      numberOfCreditHours: 3,
      prerequisite: false,
      scientificDegreeId: 4,
      departmentId: 1,
      coursePrerequisites: null,
    },
    {
      id: 4,
      name: "ST",
      code: "ST580",
      description: "Software test",
      type: 1,
      category: 1,
      maxDegree: 100,
      minDegree: 0,
      numberOfPoints: null,
      numberOfCreditHours: 3,
      prerequisite: false,
      scientificDegreeId: 4,
      departmentId: 1,
      coursePrerequisites: null,
    },
  ];
  useEffect(() => {
    axios
      .get("/api/Course", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handelChange = (selevtedValue) => {
    setSelectedOptions(selevtedValue);
  };
  return (
    <div className="p-3">
      <Select
        options={data}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        value={selectedOptions}
        onChange={handelChange}
        isMulti
      />
      <button
        onClick={() => {
          console.log(selectedOptions);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Test;
