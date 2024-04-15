import axios from "../Api/axios";

export default function GetFacultyNames() {
  return axios.get("/api/Facult/Faculty")
}
