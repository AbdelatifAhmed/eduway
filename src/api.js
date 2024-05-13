import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useAxiosPrivate from './hooks/useAxiosPrivatet';
import Swal from 'sweetalert2';

export default function Api({getFacultiesForMainPage , shouldRefetch , setShouldRefetch} ) {
  const axios = useAxiosPrivate()
  const [addFacultyShow, setAddFacultyShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facultyNames, setFacultyNames] = useState([]);

  const [firstTime, setFirstTime] = useState(true);
  getFacultiesForMainPage(facultyNames)

  const getAllFaculty = () => {
    axios
      .get("/api/Facult/Faculty", {
        headers: {
          Accept: "application/json",
          // Authorization: "Bearer" + token ,
        },
      })
      .then((res) => {
        setFacultyNames(res?.data?.data?.getFacultyDtos)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(shouldRefetch)
    {
      getAllFaculty()
      setShouldRefetch(false)
    }
  }, [shouldRefetch]);
  useEffect(() => {
    getAllFaculty();
    setFirstTime(false);
  }, []);
  const handelAddFaculty = async (event) => {
    event.preventDefault();
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
    try {
      axios
        .post(
          "/api/Facult",
          {
            name: name,
            description: description,
            userId: "",
            id: 0,
          }
        )
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Faculty Added successfully",
            });
          }
          getAllFaculty()
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };
 

  return (
    <>
     <Button
          variant="outline-light"
          className="me-2 "
          onClick={() => {
            setAddFacultyShow(true);
          }}
        >
          Faculty
        </Button>
        <Modal
        size="lg"
        show={addFacultyShow}
        onHide={() => setAddFacultyShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add Faculty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Faculty"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.facultyDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descriptioon"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddFacultyShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handelAddFaculty}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
