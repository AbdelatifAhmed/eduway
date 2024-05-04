import axios from "axios";
const BASE_URL = "https://eduway-api.runasp.net/"

export default axios.create({
  baseURL: BASE_URL ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
// https://eduway-api.runasp.net/
// https://gladly-in-quagga.ngrok-free.app/
// https://fakestoreapi.com/





