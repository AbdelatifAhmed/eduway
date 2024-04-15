import axios from '../Api/axios'

export default function GetStudentNames() {
  return ( axios.get("/api/Student/GetAllStudents")
  )
}
