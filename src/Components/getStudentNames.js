import useAxiosPrivate from "../hooks/useAxiosPrivatet";
export default function GetStudentNames() {
  const axios = useAxiosPrivate()
  return ( axios.get("/api/Student/GetAllStudents")
  )
}
