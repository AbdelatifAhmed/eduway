import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import rafik from "./images/rafiki.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import useAuth from "./hooks/useAuth";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const user_ = useAuth();
  // Cookie
  const cookie = new Cookies();
  //navigate
  const Navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  console.log(user_.Auth);

  // const userRef = useRef();
  // const errRef = useRef();
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);
  // useEffect(() => {
  //   setErrMsg("");
  // }, [userName, password]);

  async function handelLogin(e) {
    console.log(userName);
    e.preventDefault();
    try {
      let Respond = await axios.post(
        "https://gladly-in-quagga.ngrok-free.app/api/Auth/login",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
        {
          nationalID: userName,
          password: password,
        }
      );
      const accessToken = Respond?.data?.token;
      const dataDetails = Respond?.data;
      const tokenSet = cookie.set("Bearer", accessToken);
      console.log(dataDetails);
      user_.setAuth({ userName, password, dataDetails, accessToken });

      setUserName('')
      setPassword('')  
      Navigate(from, { replace: true });
      // Navigate("/admin/faculty");
      // dataDetails.roles[0] === "Student"
      //   ? Navigate("/user/Basic-info")
      //   : dataDetails.roles[0] === "Adminstration"
      //   ? Navigate("/admin/faculty")
      //   : Navigate("/Staff");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  }
  return (
    <div className="login-page">
      <header>
        <div className="logo">
          edu<span>way</span>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <NavLink to="/ss">About</NavLink>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </header>
      <div className="wrapper">
        <div className="container">
          <div className="form-info">
            <form action="Post" onSubmit={handelLogin}>
              <h2>Login</h2>
              <div className="field-holder">
                <input
                  type="text"
                  id="txt"
                  required
                  autoComplete="off"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <label htmlFor="txt">Username</label>
              </div>
              <div className="field-holder">
                <input
                  type="password"
                  id="pass"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="pass">Password</label>
              </div>

              <input type="submit" value="Login" onClick={handelLogin} />

              <p>
                <a href="#">forget Password ?</a>
              </p>
            </form>
          </div>
          <div className="image">
            <img src={rafik} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
