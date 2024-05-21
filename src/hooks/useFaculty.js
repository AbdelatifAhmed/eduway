import { useContext } from "react";
import { facultyContext } from "../Components/facultyContext";
const useFaculty = () => {
  return useContext(facultyContext);
};
export default useFaculty;
