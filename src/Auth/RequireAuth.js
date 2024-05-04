import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({allowedRoles}) {
  const user =useAuth();
  const location = useLocation();
  return user?.Auth?.dataDetails?.roles?.find(role => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.Auth ?
      <Navigate to='/unauthorized' state= {{ from: location }} replace />
    :
    <Navigate state={{ from: location }} replace to="/" />
  
}
