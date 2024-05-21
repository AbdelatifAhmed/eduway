import avatar from "../images/avatar.jpg";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import useFaculty from "../hooks/useFaculty";
import useAuth from "../hooks/useAuth";
export default function Navbar(props) {
  const toggle = () => {
    props.setChangeActive(!props.changeActive);
  };
  const axios = useAxiosPrivate();
  const [facultyNames, setFacultyNames] = useState([]);
  const getAllFaculty = async () => {
    if(Auth?.dataDetails?.roles[0] === "Administration" || Auth?.dataDetails?.roles[0] === "Staff")
    {await axios
      .get("/api/Facult/Faculty")
      .then((res) => {
        setFacultyNames(res?.data?.data?.getFacultyDtos);
      })
      .catch((err) => console.log(err));
    }
  }

  const {Auth} = useAuth()

  console.log(useAuth());
  useEffect(() => {
    getAllFaculty();
  }, []);

  const {setGlobalFaculty} = useFaculty()
  return (
    <div className="topbar">
      <div className="toggle-search">
        <span className="toggle" onClick={toggle}>
          <i className="fa-solid fa-bars"></i>
        </span>
        { Auth?.dataDetails?.roles[0] === "Teacher" ||  Auth?.dataDetails?.roles[0] === "TeacherAssistant"
        || Auth?.dataDetails?.roles[0] === "ControlMembers"  ? "" 
      : 
      <span>
          <Form.Select aria-label="Default select example" onChange={e=>setGlobalFaculty(e.target.value)}>
            <option defaultValue hidden>
              Select Faculty
            </option>
            {facultyNames && facultyNames.length > 0 ? (
              facultyNames?.map((f,i)=>(
                <option key={i} value={f.facultId}>{f.facultName}</option>
              ))
            ) : (
              <option
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                No Faculty
              </option>
            )}
          </Form.Select>
        </span> }
        {/* <span className="search">
          <label htmlFor="">
            <input type="text" placeholder="Search Here" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
        </span> */}
      </div>
      <div className="user">
        <i className="fa-solid fa-circle-question fa-fw"></i>
        <i className="fa-solid fa-gear fa-fw"></i>
        <i className="fa-regular fa-bell fa-fw"></i>
        <img src={avatar} alt="Avatar" />
        <p id="name">"Abdo Ahmed"</p>
      </div>
    </div>
  );
}
