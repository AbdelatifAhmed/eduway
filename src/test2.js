import React, { useState, useEffect } from 'react';
import { Accordion, Table, Button, Pagination } from 'react-bootstrap';
import axios from './Api/axios';

const Test2 = () => {
  const [array1, setArray1] = useState([]);
  const [array2Data, setArray2Data] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
    // Handle the delete operation
    axios.delete(`/api/Student/studentSemesters/${studentSemesterId}`)
      .then(response => {
        // Handle success
        console.log('Student deleted successfully:', response.data);
        // Here you can update the UI or fetch the data again to reflect changes
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        // Handle error
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
                {array2Data[obj.id]?.data?.slice(indexOfFirstItem, indexOfLastItem).map((student, idx) => (
                  <tr key={idx}>
                    <td>{student.studentName}</td>
                    <td>{student.studentCode}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(student.studentSemesterId)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {array2Data[obj.id]?.data && (
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
              )}
              {array2Data[obj.id]?.data && (
                Array.from({ length: Math.ceil(array2Data[obj.id].data.length / itemsPerPage) }, (_, index) => (
                  <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))
              )}
              {array2Data[obj.id]?.data && (
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(array2Data[obj.id].data.length / itemsPerPage)} />
              )}
            </Pagination>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Test2;
