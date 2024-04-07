import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../Api/axios";

function Test() {
  const [selectedValue, setSelectedValue] = useState('');
  const [disabledInputs, setDisabledInputs] = useState([false, false, false, false]);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    // Disable all other inputs except the one that was clicked
    const newDisabledInputs = disabledInputs.map((disabled, i) => (i !== index));
    setDisabledInputs(newDisabledInputs);
  };

  return (
    <div>
      {[1, 2, 3, 4].map((index) => (
        <select key={index} value={selectedValue} onChange={(event) => handleInputChange(index - 1, event)} disabled={disabledInputs[index - 1]}>
          <option value="">Select Option</option>
          <option value={`Option ${index}-1`}>Option {index}-1</option>
          <option value={`Option ${index}-2`}>Option {index}-2</option>
          <option value={`Option ${index}-3`}>Option {index}-3</option>
        </select>
      ))}
    </div>
  );
  
}

export default Test;
