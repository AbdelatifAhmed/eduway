import { useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
export default function Basic() {
  const [changeActive, setChangeActive] = useState(true);
  return (
    <div className="page">
        <div className="basic-info">
          <div className="item">
            <fieldset>
              <legend>
                <h1>Personal Data</h1>
              </legend>
              <div>
                Arabic Name : <span className=""></span>
              </div>
              <div>
                English Name : <span className=""></span>
              </div>
              <div>
                Gender : <span className=""></span>
              </div>
              <div>
                Student id : <span className=""></span>
              </div>
              <div>
                Nationality : <span className=""></span>
              </div>
              <div>
                Religion <span className=""></span>:
              </div>
              <div>
                Date of birth : <span className=""></span>
              </div>
              <div>
                National ID \ passport No : <span className=""></span>
              </div>
              <div>
                Release Date : <span className=""></span>
              </div>
              <div>
                Place of birth : <span className=""></span>
              </div>
            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Family Member Data</h1>
              </legend>
              <div>
                Gurdian Name : <span className=""></span>
              </div>

              <div>
                Address : <span className=""></span>
              </div>

              <div>
                Jop : <span className=""></span>
              </div>

              <div>
                Mobile : <span className=""></span>
              </div>

              <div>
                Home Tel : <span className=""></span>
              </div>

              <div>
                City : <span className=""></span>
              </div>

              <div>
                Email : <span className=""></span>
              </div>

              <div>
                Fax : <span className=""></span>
              </div>

              <div>
                National ID \ passport No : <span className=""></span>
              </div>

              <div>
                Place of birth : <span className=""></span>
              </div>
            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Contact Data</h1>
              </legend>
              <div>
                City : <span></span>
              </div>

              <div>
                Address : <span></span>
              </div>

              <div>
                Mobile : <span></span>
              </div>

              <div>
                Home Tel : <span></span>
              </div>

              <div>
                Fax : <span></span>
              </div>

              <div>
                Email : <span></span>
              </div>

              <div>
                System Mail : <span></span>
              </div>

              <div>
                Mail Box : <span></span>
              </div>
            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Prequalification Data</h1>
              </legend>
              <div>
                School : <span></span>
              </div>

              <div>
                Pre-Qualification : <span></span>
              </div>

              <div>
                Qualification Year : <span></span>
              </div>

              <div>
                Qualification Turn : <span></span>
              </div>

              <div>
                Degrees : <span></span>
              </div>

              <div>
                Seat Number : <span></span>
              </div>

              <div>
                Coordination Number : <span></span>
              </div>

              <div>
                Coordination Date : <span></span>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
  );
}
