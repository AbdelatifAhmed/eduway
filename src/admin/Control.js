import React from "react";
import { Tab, Tabs } from "react-bootstrap";

export default function Control() {
  return (
    <div className="px-4">
      <Tabs
        defaultActiveKey="assess"
        id="fill-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="assess" title="Assess Method Courses">
          Tab content for Home
        </Tab>
        <Tab eventKey="semester-courses" title="Semester Courses">
          Tab content for Profile
        </Tab>
        <Tab eventKey="lecturer-courses" title="Lecturer Courses">
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="add-student-semester" title="Add Student Semester">
          Tab content for Contact
        </Tab>
        <Tab eventKey="premissions" title="Permissions">
          Tab content for Contact
        </Tab>
        <Tab eventKey="end-semester" title="End Semester">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}
