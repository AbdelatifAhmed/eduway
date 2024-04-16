import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import axios from './Api/axios';

export default function Test2() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      let data = null ;
      try {
        // Replace 'apiEndpoint' with your actual API endpoint
         await axios('api/Course/GetStudentSemesterAssessMethodsBySpecificCourse1')
        .then((res)=>{
             data = res?.data?.data
        })
        // Assuming data structure is similar to what's used in the component
        const processedData = data.studentDtos.map(student => ({ ...student, isDisabled: true }));
        setStudentData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the fetchData function
    fetchData();
  }, []);

  const handleAssessmentDegreeChange = (studentIndex, assessIndex, newValue) => {
    setStudentData(prevStudentData => {
      const updatedStudentData = [...prevStudentData];
      if (updatedStudentData[studentIndex]?.assesstMethodDtos[assessIndex]) {
        updatedStudentData[studentIndex].assesstMethodDtos[assessIndex].assessDegree = newValue;
      }
      return updatedStudentData;
    });
  };

  const toggleEdit = (index) => {
    setStudentData(prevStudentData => {
      const updatedStudentData = [...prevStudentData];
      updatedStudentData[index].isDisabled = !updatedStudentData[index].isDisabled;
      return updatedStudentData;
    });
  };

  const sendDataToServer = () => {
    console.log('Sending data to server:', studentData);
    // Send studentData to the server
  };

  const uniqueAssessNames = studentData.flatMap(student => student.assesstMethodDtos.map(method => method.assessName));
  const uniqueAssessNamesSet = new Set(uniqueAssessNames);
  const uniqueAssessNamesArray = Array.from(uniqueAssessNamesSet);

  const tableHeaders = uniqueAssessNamesArray.map(assessName => (
    <th key={assessName}>{assessName}</th>
  ));

  const tableRows = studentData.map((student, index) => (
    <tr key={student.studentCode}>
      <td>{student.studentName}</td>
      <td>{student.studentCode}</td>
      {uniqueAssessNamesArray.map((assessName, assessIndex) => {
        const method = student.assesstMethodDtos.find(method => method.assessName === assessName);
        return (
          <td key={`${student.studentCode}-${assessName}`}>
            <input
              value={method ? method.assessDegree : ""}
              disabled={student.isDisabled}
              onChange={(e) => handleAssessmentDegreeChange(index, assessIndex, e.target.value)}
            />
          </td>
        );
      })}
      <td>
        <Button
          size="sm"
          variant="dark"
          onClick={() => toggleEdit(index)}
        >
          {student.isDisabled ? <MdModeEditOutline /> : <IoClose />}
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Code</th>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      <Button onClick={sendDataToServer}>Send Data to Server</Button>
    </div>
  );
}
