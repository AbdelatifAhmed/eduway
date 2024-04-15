import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Cookies from "universal-cookie";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../Components/GetFacultyNames";

export default function PersistLogin() {
  const context = useContext(AuthContext);
  const token = context.Auth;
  const [Loading, setLoading] = useState(true);
  // Cookie
  const cookie = new Cookies();
  const TookenCookie = cookie.get("Bearer");
  console.log(`the token in cookie is : ${TookenCookie}`);
  useEffect(() => {
    async function Refresh() {
      try {
        axios.defaults.withCredentials = true;
        await axios
          .get(
            "https://gladly-in-quagga.ngrok-free.app/api/Auth/refreshToken",
            null,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + TookenCookie,
                Cookie: `Bearer=${TookenCookie}`,
              },
            }
          )
          .then((data) => {
            cookie.set("Bearer", data.token);
            context.Auth((prev) => {
              return { ...prev, token: data.token };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? Refresh() : setLoading(false);
  }, []);

  return Loading ? <LoadingSpinner /> : <Outlet />;
}
