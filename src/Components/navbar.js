import avatar from "../images/avatar.jpg";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import useFaculty from "../hooks/useFaculty";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function Navbar(props) {
  const toggle = () => {
    props.setChangeActive(!props.changeActive);
  };

  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const { setGlobalFaculty } = useFaculty();
  const { Auth } = useAuth();
  const decoded = jwtDecode(Auth?.accessToken)
  const getAllFaculty = async () => {
    if (Auth?.dataDetails?.roles?.includes("Administration")) {
      try {
        const res = await axios.get("/api/Facult/Faculty");
        setFacultyNames(res?.data?.data?.getFacultyDtos || []);
        if (res.status === 204 || (res.data?.data?.getFacultyDtos && res.data?.data?.getFacultyDtos.length === 0)) {
          const staffRes = await axios.get("/api/staff/F");
          setGlobalFaculty(staffRes?.data?.data?.factulyId);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const staffRes = await axios.get("/api/staff/F");
        setGlobalFaculty(staffRes?.data?.data?.factulyId);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllFaculty();
  }, []);

  return (
    <div className="topbar">
      <div className="toggle-search">
        <span className="toggle" onClick={toggle}>
          <i className="fa-solid fa-bars"></i>
        </span>

        {Auth?.dataDetails?.roles?.includes("Administration") && facultyNames.length > 1 ? (
          <span>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setGlobalFaculty(e.target.value)}
            >
              <option defaultValue hidden>
                Select Faculty
              </option>
              {facultyNames.map((f, i) => (
                <option key={i} value={f.facultId}>
                  {f.facultName}
                </option>
              ))}
            </Form.Select>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="user">
        <p id="name">{decoded.name}</p>
        <img src={avatar} alt="Avatar" />
        <i className="fa-solid fa-gear fa-fw"></i>
        <i className="fa-solid fa-circle-question fa-fw"></i>
        <i className="fa-regular fa-bell fa-fw"></i>
      </div>
    </div>
  );
}
