import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from "react-select";
import useAxiosPrivate from './hooks/useAxiosPrivatet';

export default function Api() {
  const axios = useAxiosPrivate();
  const [teacher, setTeacher] = useState([]);
  const [premissionRoles, setPremissionRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    axios
      .get("/api/Teacher/GetAllTeacher")
      .then((res) => setTeacher(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const handelPermissions = async (userId) => {
    axios.get(`api/Auth/GetUserRoles/${userId}`)
      .then(res => {
        setPremissionRoles(res?.data?.data?.roles);
        setSelectedUserId(res?.data?.data?.userId);
        setSelectedUserName(res?.data?.data?.userName);
      })
      .catch(err => console.log(err));
  }

  const handleCheckboxChange = (roleId) => {
    const updatedPermissions = premissionRoles.map(role => {
      if (role.id === roleId) {
        return { ...role, isSelected: !role.isSelected };
      }
      return role;
    });
    setPremissionRoles(updatedPermissions);
  }

  const handleSavePermissions = (e) => {
    e.preventDefault()
    const payload = {
      userId: selectedUserId,
      userName: selectedUserName,
      roles: premissionRoles.map(role => ({
        id: role.id,
        name: role.name,
        isSelected: role.isSelected
      }))
    };

    axios.post('/api/Auth/ChangeUserRoles', payload)
      .then(res => {
        // Handle success
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <div style={{ border: "2px solid #121431", borderRadius: "10px" }}>
        <div
          style={{
            background: "#121431",
            color: "white",
            padding: "20px",
            fontSize: "30px",
          }}
        >
          Give Permissions
        </div>
        <Form style={{ padding: "10px" }}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label style={{ fontSize: "20px" }}>
              Teacher Name
            </Form.Label>
            <Select
              options={teacher}
              getOptionLabel={(e) => e.staffNameEnglish}
              getOptionValue={(e) => e.userId}
              onChange={(e) => handelPermissions(e.userId)}
            />
          </Form.Group>

          <div>
            {premissionRoles?.map((role) => (
              <div key={role.id}>
                <span>{role.name}--</span>
                <input
                  type="checkbox"
                  checked={role.isSelected}
                  onChange={() => handleCheckboxChange(role.id)}
                />
              </div>
            ))}
          </div>
          <button onClick={e=>handleSavePermissions(e)}>Save</button>
        </Form>
      </div>
    </div>
  )
}
