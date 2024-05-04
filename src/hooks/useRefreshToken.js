import Cookies from "universal-cookie";
import axios from "../Api/axios";
import useAuth from "./useAuth";
export default function useRefreshToken() {
  const setAuth  = useAuth();
  const cookie = new Cookies()
    const token = setAuth?.Auth?.accessToken;
    const refreshCo = 'w7Id0Slp2k0otrCJGpkCPyS27yBB5r7GDqVw9tPGrdU'
    const refrshCookie = cookie.get('Refresh')
    const asp = cookie.get('.AspNetCore.Identity.Application')
    console.log(refrshCookie);
    console.log(asp);
  const refresh = async () => {
    const response = await axios
      .get("api/Auth/refreshToken", {
        headers: {
          Authorization: "Bearer " + refreshCo,
        },
      })
      .then(() => {
        setAuth((prev) => {
          console.log(prev);
          console.log(response?.data?.accessToken);
          return {...prev,  accessToken : response?.data?.accessToken}
        });
      });
    return response?.data?.accessToken;
  };
  return refresh;
}
