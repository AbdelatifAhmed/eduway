import AddFaculty from "./addFaculty";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import { useState } from "react";
export default function Faculty() {  
  const axios = useAxiosPrivate()
const [facultyNames,setFacultyNames] = useState([])
  const getAllFaculty = () => {
    axios
      .get("/api/Facult/Faculty")
      .then((res) => setFacultyNames(res?.data?.data?.getFacultyDtos))
      .catch((err) => console.log(err));
  }
  return (
  <div className="faculty">
    <AddFaculty/>

  </div>
  );
}
