import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivatet';
import Swal from 'sweetalert2';

export default function StudentFormat() {
    const [studentFormat, setStudentFormat] = useState({
        AcademyYear_FacultyId_Increment: 1,
        FacultyId_AcademyYear_Increment: 2,
        FacultyId_AcademyYear_NationalId_Increment: 3,
        AcademyYear_FacultyId_NationalId_Increment: 4,
        AcademyYear_NationalId_FacultyId_Increment: 5,
        NationalId_AcademyYear_FacultyId_Increment: 6,
        NationalId_FacultyId_AcademyYear_Increment: 7,
        FacultyId_NationalId_AcademyYear_Increment: 8,
        AcademyYear_FacultyId: 9,
        FacultyId_AcademyYear: 10,
        FacultyId_AcademyYear_NationalId: 11,
        AcademyYear_FacultyId_NationalId: 12,
        AcademyYear_NationalId_FacultyId: 13,
        NationalId_AcademyYear_FacultyId: 14,
        NationalId_FacultyId_AcademyYear: 15,
        FacultyId_NationalId_AcademyYear: 16,
        NationalId: 17
    });

    const axios = useAxiosPrivate();
    const [faculty, setFaculty] = useState(null);
    const [formatId, setFormatId] = useState(null);
    const [facultyNames, setFacultyNames] = useState([]);

    useEffect(() => {
        getAllFaculty();
    }, []);

    const getAllFaculty = async () => {
        await axios
            .get("/api/Facult/Faculty")
            .then((res) => {
                setFacultyNames(res?.data?.data?.getFacultyDtos);
            })
            .catch((err) => console.log(err));
    };

    const showFaculty = facultyNames ? (
        facultyNames?.map((index) => (
            <option key={index.facultId} value={index?.facultId}>
                {index?.facultName}
            </option>
        ))
    ) : (
        <option>No Options</option>
    );

    const createReadableLabel = (key) => {
        return key.replace(/_/g, ' - ').replace(/([A-Z])/g, ' $1').trim();
    };

    const AddStudentFormat = async () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        if (!faculty && !formatId) {
            Toast.fire({
                icon: "info",
                title: "No changes to save",
            });
            return;
        }

        if (!faculty || !formatId) {
            Toast.fire({
                icon: "info",
                title: "one value missed",
            });
            return;
        }


        const data = {
            id: 0,
            formatStudentCodeName: formatId,
            facultyId: faculty
        };

        axios.post(`/api/formatStudentCode`, data)
            .then(res => {
                Toast.fire({
                    icon: "success",
                    title: res?.data?.message,
                });
            })
            .catch(err => {
                console.error(err);
                Toast.fire({
                    icon: "error",
                    title: err?.response?.data?.message,
                });
            });
    };


 

    return (
        <div className='pad'>
            <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
                <div
                    style={{
                        background: "#121431",
                        color: "white",
                        padding: "20px",
                        fontSize: "30px",
                    }}
                >
                    Add Student Format Code
                </div>
                <Form style={{ padding: "10px" }}>
                    <Form.Group>
                        <Form.Label style={{ fontSize: "20px" }}>
                            Faculty Name
                        </Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setFaculty(+e.target.value)}
                        >
                            <option defaultValue hidden>
                                Faculty
                            </option>
                            {showFaculty}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mt-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label style={{ fontSize: "20px" }}>
                            Format
                        </Form.Label>
                        <Form.Select
                            onChange={(e) => setFormatId(+e.target.value)}
                        >
                            <option hidden defaultValue>
                                Select a Format
                            </option>
                            {Object.entries(studentFormat).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {createReadableLabel(key)}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    </Form.Group>
                    <Row>
                        <Col className="">
                            <Button
                                variant="success"
                                onClick={AddStudentFormat}
                            >
                                Save Change
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}
