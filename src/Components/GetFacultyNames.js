import useAxiosPrivate from "../hooks/useAxiosPrivatet"
export default function GetFacultyNames() {
  const axios = useAxiosPrivate()
  return axios.get("/api/Facult/Faculty")
}
