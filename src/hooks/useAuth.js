import { useContext } from "react";
import { User } from "../Auth/AuthContext";

const useAuth = () => {
  return useContext(User);
};
export default useAuth;
