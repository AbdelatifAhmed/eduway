import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Test() {
  const [showComponent, setShowComponent] = useState(false); // State to control component visibility
  const [estimateCourse, setEstimateCourse] = useState([]);

  const addChildForEstimateCourse = () => {
    // Add a new set of input elements to the array of inputs
    setEstimateCourse([
      ...estimateCourse,
      {
        input1: "",
        input2: "",
        input3: "",
      },
    ]);
  };

  const handleInputChangeForEstimateCourse = (index, fieldName, value) => {
    // Update the input value in the state
    const newInputs = [...estimateCourse];
    newInputs[index][fieldName] = value;
    setEstimateCourse(newInputs);
  };

  const handleDeleteChild = (index) => {
    // Remove the child at the specified index from the array
    const newInputs = [...estimateCourse];
    newInputs.splice(index, 1);
    setEstimateCourse(newInputs);
  };

  const handleSubmit = () => {
    // Prepare data to send to the database
    const inputData = estimateCourse.map((input) => ({
      input1: input.input1,
      input2: input.input2,
      input3: input.input3,
    }));

    // Here you can send `inputData` to your database
    console.log("Input data:", inputData);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showComponent}
          onChange={() => setShowComponent(!showComponent)}
        />
        Show Component
      </label>
      {showComponent && (
        <>
          <button onClick={addChildForEstimateCourse}>Add Inputs</button>
          {estimateCourse.map((input, index) => (
            <Row key={index}>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={input.input1}
                  onChange={(e) =>
                    handleInputChangeForEstimateCourse(index, "input1", e.target.value)
                  }
                />
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Char"
                  value={input.input2}
                  onChange={(e) =>
                    handleInputChangeForEstimateCourse(index, "input2", e.target.value)
                  }
                />
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Max Percentage"
                  value={input.input3}
                  onChange={(e) =>
                    handleInputChangeForEstimateCourse(index, "input3", e.target.value)
                  }
                />
              </Col>
              <Col sm={2}>
                <Button onClick={() => handleDeleteChild(index)}>Delete</Button>
              </Col>
            </Row>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default Test;
