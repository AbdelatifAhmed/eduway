import { Button } from "react-bootstrap";
import AddFaculty from "./addFaculty";
import useRefreshToken from "../../hooks/useRefreshToken";
export default function Faculty() {
  const refresh =useRefreshToken()


  return (
  <div className="faculty">
    <AddFaculty/>

    <Button onClick={()=>refresh()}>Click</Button>
  </div>
  );
}
