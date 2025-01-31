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
import RequireAuth from "./Auth/RequireAuth";
import PersistLogin from "./Auth/persistLogin";
import Student from "./pages/admin/Student";
import Admin from "./pages/admin/admin";
import AddStudent from "./pages/admin/AddStudent.js";
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
import FinalGrades from "./pages/Courses/finalGrades.js";
import StudentView from "./pages/admin/studentView.js";
import CourseView from "./pages/admin/CourseView.js";
import MonitorGrades from "./pages/Courses/MonitorGrades.js";
import Reports from "./pages/Reports/Reports.js";
import StudentResult from "./pages/Reports/StudentResult.js";
import StudentCourse from "./pages/Reports/StudentCourse.js";
import SemesterResult from "./pages/Reports/SemesterResult.js";
import CourseResult from "./pages/Reports/courseResult.js";
import CourseResultView from "./pages/Reports/CourseResultView.js";
import Notes from "./pages/Courses/Notes.js";
import Unauthorized from "./Components/unauthorized.js";
import Basic from "./pages/admin/basic.js";
import FacultyDetails from "./pages/admin/facultyDetails.js";
import StaffView from "./pages/admin/StaffView.js";
import GraduationReport from "./pages/Reports/GraduationReport.js";
import StudentForamt from "./pages/admin/StudentForamt.js";
import AdminScheduler from "./Components/AdminScheduler.js";
import StudentScheduler from "./Components/StudentTimeTable.js";
import StudentSection from "./pages/Courses/StudentSection.js";
import Timetable from "./Components/TimeTable.js";
import SchedulerView from "./Components/SchedulerView.js";
import Places from "./Components/Places.js";
import User from "./pages/user/User.js";
export default function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["Student"]} />}>
            <Route path="/user/" element={<User />}>
              <Route path="Basic-info" element={<BasicInfo />} />
              <Route path="examtable" element={<ExamTable />} />
              <Route path="time-table" element={<TimeTable />} />
              <Route path="tuitionFees" element={<TuitionFees />} />
              <Route path="course-grades" element={<CourseGrades />} />
              <Route path="std-scheduler" element={<StudentScheduler />} />
            </Route>
          </Route>

          <Route path="/admin/" element={<Admin />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    "Administration",
                    "ControlMembers",
                    "Teacher",
                    "TeacherAssistant",
                    "Staff",
                  ]}
                />
              }
            >
              <Route path="basic" element={<Basic />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["Administration"]} />}>
              <Route path="faculty" element={<Faculty />}></Route>
              <Route path="faculty/:id" element={<FacultyDetails />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/course/:courseId" element={<CourseView />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/:staffId" element={<StaffView />} />
              <Route path="add-Staff" element={<AddStaff />} />
              <Route path="add-teacher" element={<AddTeacher />} />
              <Route
                path="add-teacherAssistant"
                element={<AddTeacherAssistant />}
              />
              <Route
                path="add-Administration"
                element={<AddAdministration />}
              />
              <Route path="add-control-member" element={<AddControlMember />} />
              <Route path="control" element={<Control />} />
              <Route path="student-format" element={<StudentForamt />} />
              <Route path="admin-scheduler" element={<AdminScheduler />} />
              <Route path="scheduler" element={<SchedulerView />} />
              <Route path="places" element={<Places />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={["Administration", "Staff"]} />
              }
            >
              <Route path="students" element={<Student />} />
              <Route
                path="students/student/:studentId"
                element={<StudentView />}
              />
              <Route path="add-student" element={<AddStudent />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["Teacher"]} />}>
              <Route path="notes" element={<Notes />} />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={["TeacherAssistant"]} />}
            >
              <Route path="student-section" element={<StudentSection />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={["TeacherAssistant", "Teacher"]} />
              }
            >
              <Route path="timeTable" element={<Timetable />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={["ControlMembers", "Teacher"]} />
              }
            >
              <Route path="course-grades" element={<AddCourseGrades />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["ControlMembers"]} />}>
              <Route path="final-grades" element={<FinalGrades />} />
              <Route path="monitor-grades" element={<MonitorGrades />} />
            </Route>

            <Route
              element={
                <RequireAuth
                  allowedRoles={["Administration", "ControlMembers"]}
                />
              }
            >
              <Route path="reports" element={<Reports />} />
              <Route path="student-result" element={<StudentCourse />} />
              <Route
                path="student-result/student/:studentId"
                element={<StudentResult />}
              />
              <Route path="semester-result" element={<SemesterResult />} />
              <Route path="course-result" element={<CourseResult />} />
              <Route
                path="course-result/course/:semesterId/:academicYearId/:courseId"
                element={<CourseResultView />}
              />
              <Route path="Graduation-result" element={<GraduationReport />} />
            </Route>
          </Route>
        </Route>
        {/* Catch All missing Pages */}
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}
