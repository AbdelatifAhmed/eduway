import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Errorpage from "./Components/errorpage";
import Login from "./Login";
import BasicInfo from "./pages/user/Basic-info";
import TuitionFees from "./pages/user/tuitionfees";
import ExamTable from "./pages/user/examtable";
import TimeTable from "./pages/user/time-table";
import CourseGrades from "./pages/user/course-grades";
import Faculty from "./pages/admin/faculty";
import "./Css/all.min.css";
import "./Css/main.css";
import { Route, Routes } from "react-router-dom";
import Api from "./api";
import RequireAuth from "./Auth/RequireAuth";
import UserProvider from "./Auth/AuthContext";
import PersistLogin from "./Auth/persistLogin";
import Student from "./pages/admin/Student";
import Admin from "./pages/admin/admin";
import AddStudent from "./pages/admin/AddStudent.js";
import Test from "./pages/admin/test.js";
import Courses from "./pages/admin/Courses.js";
import AddCourse from "./pages/admin/AddCourse.js";
import Staff from "./pages/admin/Staff.js";
import AddTeacher from "./pages/admin/AddTeacher.js";
import AddAdministration from "./pages/admin/AddAdministration.js";
import AddTeacherAssistant from "./pages/admin/AddTeacherAssistant.js";
import AddStaff from "./pages/admin/AddStaff.js";
import AddControlMember from "./pages/admin/addControlMember.js";
import Control from "./pages/admin/Control.js";
import AddCourseGrades from "./pages/Courses/courseGrade.js";
import Test2 from "./test2.js";
import FinalGrades from "./pages/Courses/finalGrades.js";
import StudentView from "./pages/admin/studentView.js";
import CourseView from "./pages/admin/CourseView.js";
import MonitorGrades from "./pages/Courses/MonitorGrades.js";
import Reports from "./pages/Reports/Reports.js";
import StudentResult from "./pages/Reports/StudentResult.js";
import StudentCourse from "./pages/Reports/StudentCourse.js";
import SemesterResult from "./pages/Reports/SemesterResult.js";
export default function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/ss" element={<Api />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test" element={<Test />} />
        {/* Protected Routes */}
        {/* <Route element={<PersistLogin />}> */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/user/Basic-info" element={<BasicInfo />} />
        <Route path="/user/examtable" element={<ExamTable />} />
        <Route path="/user/time-table" element={<TimeTable />} />
        <Route path="/user/tuitionFees" element={<TuitionFees />} />
        <Route path="/user/course-grades" element={<CourseGrades />} />
        <Route path="/admin/" element={<Admin />}>
          <Route path="faculty" element={<Faculty />} />
          <Route path="students" element={<Student />} />
          <Route path="students/student/:studentId" element={<StudentView />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/course/:courseId" element={<CourseView />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="staff" element={<Staff />} />
          <Route path="add-Staff" element={<AddStaff />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="add-teacherAssistant" element={<AddTeacherAssistant />} />
          <Route path="add-Administration" element={<AddAdministration />} />
          <Route path="add-control-member" element={<AddControlMember />} />
          <Route path="control" element={<Control />} />
          <Route path="course-grades" element={<AddCourseGrades />} />
          <Route path="final-grades" element={<FinalGrades />} />
          <Route path="monitor-grades" element={<MonitorGrades />} />
          <Route path="reports" element={<Reports />} />
          <Route path="student-result" element={<StudentCourse />} />
          <Route path="student-result/student/:studentId" element={<StudentResult />} />
          <Route path="semester-result" element={<SemesterResult />} />
        </Route>
        {/* </Route> */}
        {/* </Route> */}
        {/* Catch All missing Pages */}
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}
