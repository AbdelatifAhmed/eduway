import React, { useState, useEffect } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import axios from "../Api/axios";
import Swal from "sweetalert2";
export default function MonitorGrades() {
  const [array1, setArray1] = useState([]);
  const [array2Data, setArray2Data] = useState({});

  useEffect(() => {
    fetchArray1Data();
  }, []);

  const fetchArray1Data = () => {
    axios
      .get("api/Control/GetAllSemester")
      .then((response) => {
        const semesterName = response.data?.data?.semesterName ?? [];
        setArray1(semesterName);
        fetchArray2Data(semesterName);
      })
      .catch((error) => console.error("Error fetching array1 data:", error));
  };

  const fetchArray2Data = (semesterName) => {
    semesterName.forEach((obj) => {
      axios
        .get(`/api/Control/GetAllCourse${obj.id}`)
        .then((response) => {
          setArray2Data((prevData) => ({
            ...prevData,
            [obj.id]: response.data,
          }));
        })
        .catch((error) =>
          console.error(
            `Error fetching array2 data for semester with id ${obj.id}:`,
            error
          )
        );
    });
  };

  const handelMonitor = (course) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success mx-2",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: `Are you sure you want to Monitor ${course.courseName}?`,
          text: "You won't be able to revert this!",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, Monitor it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
            .post(`/api/Control/RaisingGradesCourse${course.courseId}`)
              .then(() => {
                swalWithBootstrapButtons.fire({
                  title: "Monitored!",
                  text: "Your Grades have been Raised .",
                  icon: "success",
                });
              })
              .catch(() => {
                swalWithBootstrapButtons.fire({
                  title: "Error!",
                  text: "Error Occured",
                  icon: "eroor",
                });
              });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "You just have Caneled the Operation",
              icon: "error",
            });
          }
        });
  };
  return (
    <div className="p-3 ">
      <Accordion defaultActiveKey="0">
        {array1.map((obj, index) => (
          <Accordion.Item key={obj.id} eventKey={`${index}`}>
            <Accordion.Header><span style={{fontWeight:"bold",fontSize:"20px"}}>{obj.name}</span></Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Monitor</th>
                  </tr>
                </thead>
                <tbody>
                  {array2Data[obj.id]?.data?.map((course, idx) => (
                    <tr key={idx}>
                      <td>{course.courseName}</td>
                      <td>{course.courseCode}</td>
                      <td>
                        <Button
                          variant="secondary"
                          className="text-light"
                          onClick={() => handelMonitor(course)}
                        >
                          Monitor
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
