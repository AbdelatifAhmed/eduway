import axios from "../Api/axios";
import useAuth from "./useAuth";
export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("api/Auth/refreshToken");
    setAuth((prev) => {
      // console.log(prev);
      // console.log(response?.data?.token);
      return { 
        ...prev,
        dataDetails :  response?.data ,
        accessToken: response?.data?.token ,
      };
    });
    return response?.data?.token;
  };
  return refresh;
}
