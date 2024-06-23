import AddFaculty from "./addFaculty";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Faculty() {
  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const getAllFaculty = async () => {
      await axios
        .get("/api/Facult/Faculty")
        .then((res) => {
          setFacultyNames(res?.data?.data?.getFacultyDtos);
        })
        .catch((err) => console.log(err));
    };

    getAllFaculty();
  }, [shouldRefetch]);

  const getFacultiesForMainPage = (array) => {
    setFacultyNames(array);
  };

  const handelDelete = (faculty) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to Delete ${faculty.facultName}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const respond = await axios.delete(`/api/Facult/${faculty.facultId}`);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: respond?.data?.message,
              icon: "success",
            });
            setShouldRefetch(true);
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "This Faculty Is Registed in Semester",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Faculty is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="faculty">
      <AddFaculty
        getFacultiesForMainPage={getFacultiesForMainPage}
        shouldRefetch={shouldRefetch}
        setShouldRefetch={setShouldRefetch}
      />
      <div
        style={{
          margin: "20px",
          padding: "10px",
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {facultyNames?.map((f, i) => (
          <Card
            key={i}
            text={"white"}
            style={{ background: "#6675f0" }}
            className="mb-2"
          >
            <Card.Header>Faculty</Card.Header>
            <Card.Body>
              <Card.Title>{f.facultName}</Card.Title>
              <Card.Text className="opacity-75">{f.facultDescription}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button variant="outline-danger" onClick={() => handelDelete(f)}>
                <MdDelete />
              </Button>
              <Link to={`${f?.facultId}`} className="btn btn-outline-warning">
                Show details
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}
