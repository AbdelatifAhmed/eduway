import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../Login";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const user =useAuth();
  const location = useLocation();
  return user?.Auth?.tokenSet ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/" />
  );
}
