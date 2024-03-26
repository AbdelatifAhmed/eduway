import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Errorpage() {
  // console.error();
  const navigator = useNavigate();
  const handelBack = () => {
    navigator(-1);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "100px" }}>Oooops</h1>
      <p style={{ fontSize: "30px" }}>
        The Page You want To access doesn't exist
      </p>
      <p style={{ fontSize: "25px" }}>please check the correct URL</p>
      <Button className="btn btn-dark btn-lg" onClick={handelBack}>
        Go Back
      </Button>
    </div>
  );
}
