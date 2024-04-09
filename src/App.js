import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Errorpage from "./Components/errorpage";
import Login from "./Login";
import BasicInfo from "./user/Basic-info";
import TuitionFees from "./user/tuitionfees";
import ExamTable from "./user/examtable";
import TimeTable from "./user/time-table";
import CourseGrades from "./user/course-grades";
import Faculty from "./admin/faculty";
import RequireAuth from "./Auth/RequireAuth";
import "./Css/all.min.css";
import "./Css/main.css";
import { Route, Routes } from "react-router-dom";

import Api from "./api";
import UserProvider from "./Auth/AuthContext";
import PersistLogin from "./Auth/persistLogin";
import Student from "./admin/Student";
import Admin from "./admin/admin";
import AddStudent from "./admin/AddStudent.js";
import Test from "./admin/test.js";
import Courses from "./admin/Courses.js";
import AddCourse from "./admin/AddCourse.js";
import Staff from "./admin/Staff.js";
import AddTeacher from "./admin/AddTeacher.js";
import AddAdministration from "./admin/AddAdministration.js";
import AddTeacherAssistant from "./admin/AddTeacherAssistant.js";
import AddStaff from "./admin/AddStaff.js";
import AddControlMember from "./admin/addControlMember.js";
import Control from "./admin/Control.js";

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/ss" element={<Api />} />
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
          <Route path="add-student" element={<AddStudent />} />
          <Route path="courses" element={<Courses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="staff" element={<Staff />} />
          <Route path="add-Staff" element={<AddStaff />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="add-teacherAssistant" element={<AddTeacherAssistant />} />
          <Route path="add-Administration" element={<AddAdministration />} />
          <Route path="add-control-member" element={<AddControlMember />} />
          <Route path="control" element={<Control />} />
        </Route>
        {/* </Route> */}
        {/* </Route> */}
        {/* Catch All missing Pages */}
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}
