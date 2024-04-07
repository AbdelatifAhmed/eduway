import axios from "axios";

export default axios.create({
  baseURL: "https://eduway-api.runasp.net/",
    headers: {
      "Content-Type": "application/json",
      // Authorization : "Bearer " + token
    },
  
});
// https://eduway-api.runasp.net/
// https://gladly-in-quagga.ngrok-free.app/