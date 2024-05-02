import React from "react";
import unError from "../images/401 Error Unauthorized-cuate.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        padding: "20px",
      }}
    >
      <img src={unError} style={{ width: "800px" }} />
      <Button size="lg" variant="dark" onClick={goBack}>
        Back
      </Button>
    </div>
  );
}
