import React, { useState, useEffect } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import axios from './Api/axios';
const Test2 = () => {
  const [array1, setArray1] = useState([]);
  const [array2Data, setArray2Data] = useState({});

  useEffect(() => {
    // Fetch array1 data from the server
    fetchArray1Data();
  }, []);

  const fetchArray1Data = () => {
    // Fetch array1 data from the server using Axios
    axios.get('api/Control/GetAllSemester')
      .then(response => {
        const semesterName = response.data?.data?.semesterName ?? [];
        setArray1(semesterName);
        // Fetch array2 data for each object in array1
        fetchArray2Data(semesterName);
      })
      .catch(error => console.error('Error fetching array1 data:', error));
  };

  const fetchArray2Data = (semesterName) => {
    // Fetch array2 data for each object in array1
    semesterName.forEach(obj => {
      axios.get(`/api/Student/as${obj.id}`)
        .then(response => {
          setArray2Data(prevData => ({
            ...prevData,
            [obj.id]: response.data
          }));
        })
        .catch(error => console.error(`Error fetching array2 data for semester with id ${obj.id}:`, error));
    });
  };

  const handleDelete = (studentSemesterId) => {
   
    axios.delete(`/api/Student/studentSemesters/${studentSemesterId}`)
      .then(response => {
        
        console.log('Student deleted successfully:', response.data);
     })
      .catch(error => {
        console.error('Error deleting student:', error);
      });

 };

  return (
    <div className='p-3'>
      <Accordion defaultActiveKey="0">
      {array1.map((obj, index) => (
        <Accordion.Item key={obj.id} eventKey={`${index}`}>
          <Accordion.Header>{obj.name}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Code</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {array2Data[obj.id]?.data?.map((student, idx) => (
                  <tr key={idx}>
                    <td>{student.studentName}</td>
                    <td>{student.studentCode}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(student)}>Delete</Button>
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
};


export default Test2;
