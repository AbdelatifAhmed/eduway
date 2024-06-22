import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Places() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const [facultyId, setFacultyId] = useState();
  const [name, setName] = useState();
  const [Id, setId] = useState();
  const [capacity, setCapacity] = useState();
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    if (facultyId) {
      try {
        await axios.get(`api/schedulePlace/all/${facultyId}`).then((res) => {
          setPlaces(res?.data?.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPlaces();
  }, [facultyId]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(`api/Facult/Faculty`);
        setFacultyNames(res.data?.data?.getFacultyDtos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFaculties();
  }, [axios]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (id) => {
    setShowEdit(true);
    try {
      await axios.get(`api/schedulePlace/${id}`)
      .then(
        res=>{
            const data = res?.data?.data
            console.log(data);
            setCapacity(data?.placeCapacity)
            setName(data?.name)
            setFacultyId(data?.facultyId)
            setId(data?.id)
        }
      )
    } catch (error) {
        console.error(error)
    }
  };

  const handelDeletePlace = async (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${item.name}?`,
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`api/schedulePlace/${item.id}`)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: res?.data?.message,
                icon: "success",
              });
              getPlaces();
            })
            .catch((res) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: res?.data?.response?.message,
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const handelSubmit = async () => {
    const data = {
      id: 0,
      name,
      placeCapacity: capacity,
      facultyId,
    };

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
      await axios.post(`/api/schedulePlace`, data).then((res) => {
        if (res?.status === 201) {
          Toast.fire({
            icon: "success",
            title: res?.data.message,
          });
          getPlaces();
          setName("");
          setCapacity("");
        }
      });
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: error?.response?.data.message,
      });
    }
  };

  const handleUpdate = async() => {
    const data = {
        id: Id,
        name,
        placeCapacity: capacity,
        facultyId:facultyId,
      };
  
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
        await axios.put(`/api/schedulePlace/update`, data)
        .then((res) => {
          if (res?.status === 200) {
            Toast.fire({
              icon: "success",
              title: res?.data.message,
            });
            getPlaces();
            setName("");
            setCapacity("");
          }
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error?.response?.data.message,
        });
      }
  };
  return (
    <div className="pad">
      <header className="d-flex justify-content-between align-items-center">
        <Button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Button>
        <Button
          onClick={() => {
            handleShow();
          }}
        >
          +
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Place</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                as="select"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              >
                <option defaultValue hidden>
                  Select faculty
                </option>
                {facultyNames?.map((item, i) => (
                  <option key={i} value={item?.facultId}>
                    {item?.facultName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Place Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Place"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCapacity">
              <Form.Label>Place Capacity</Form.Label>
              <Form.Control
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handelSubmit();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Place</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                as="select"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              >
                <option defaultValue hidden>
                  Select faculty
                </option>
                {facultyNames?.map((item, i) => (
                  <option key={i} value={item?.facultId}>
                    {item?.facultName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Place Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Place"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCapacity">
              <Form.Label>Place Capacity</Form.Label>
              <Form.Control
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{handleUpdate()
                handleCloseEdit()
            }}>
              Update Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </header>
      <div>
        <Form.Group controlId="formFaculty">
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            as="select"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
          >
            <option defaultValue hidden>
              Select faculty
            </option>
            {facultyNames?.map((item, i) => (
              <option key={i} value={item?.facultId}>
                {item?.facultName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Table hover className="mt-3">
          <thead>
            <tr>
              <th>Place Name</th>
              <th>Capacity</th>
              <th>operations</th>
            </tr>
          </thead>
          <tbody>
            {places && places.length > 0 ? (
              places?.map((item, i) => (
                <tr key={i}>
                  <td>{item?.name}</td>
                  <td>{item?.placeCapacity}</td>
                  <td className="d-flex gap-2 align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => handelDeletePlace(item)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        handleShowEdit(item.id);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-danger fw-bold">
                  No Places
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
