import { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
export default function BasicInfo() {
  const [changeActive, setChangeActive] = useState(true);
  const axios =useAxiosPrivate()
  const [studentData, setStudentData] = useState([])

  const getStudentData = ()=>{
    axios
    .get(`/api/student/basicdata`)
    .then(res=>{
      setStudentData(res?.data?.data)
    }).catch(err=>console.error(err))
  }
  useEffect(()=>{
    getStudentData()
  },[])
  return (
    <div className="page">
      <Sidebar changeActive={changeActive} />
      {/* <!-- Main content --> */}
      <div className={changeActive ? "main" : "main active"}>
        {/* <!-- Top Bar (Naigation bar) --> */}
        <Navbar changeActive={changeActive} setChangeActive={setChangeActive} />
        <div className="basic-info">
          <div className="item">
            <fieldset>
              <legend>
                <h1>Personal Data</h1>
              </legend>
              <div>
                Arabic Name : <span className="">{studentData?.nameArabic}</span>
              </div>
              <div>
                English Name : <span className="">{studentData?.nameEnglish}</span>
              </div>
              <div>
                Gender : <span className="">{studentData?.gender}</span>
              </div>
              {/* <div>
                Student id : <span className="">{studentData?.}</span>
              </div> */}
              <div>
                Nationality : <span className="">{studentData?.nationality}</span>
              </div>
              <div>
                Religion <span className="">{studentData?.religion}</span>:
              </div>
              <div>
                Date of birth : <span className="">{studentData?.dateOfBirth?.split('T')[0]}</span>
              </div>
              <div>
                National ID : <span className="">{studentData?.nationalID}</span>
              </div>
              <div>
                Release Date : <span className="">{}</span>
              </div>
              <div>
                Place of birth : <span className="">{studentData?.placeOfBirth}</span>
              </div>
            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Family Member Data</h1>
              </legend>
              <div>
                Gurdian Name : <span className="">{studentData?.parentName}</span>
              </div>

              <div>
                Address : <span className="">{studentData?.parentAddress}</span>
              </div>

              <div>
                Jop : <span className="">{studentData?.parentJob}</span>
              </div>  

              <div>
                Postal Code : <span className="">{studentData?.postalCodeOfParent}</span>
              </div>  
            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Contact Data</h1>
              </legend>

              <div>
                Address : <span>{studentData?.studentAddress}</span>
              </div>

              <div>
                {studentData ?  studentData?.getPhoneStudentDtos?.map(item=>(
                  <div key={item.phoneId}>
                    Mobile : <span>{item?.studentPhoneNumber}</span>
                  </div>
                )) : <div>Mobile:</div>}
              </div>
              <div>
                Email : <span>{studentData?.email}</span>
              </div>

            </fieldset>
          </div>
          <div className="item">
            <fieldset>
              <legend>
                <h1>Prequalification Data</h1>
              </legend>
           

              <div>
                Pre-Qualification : <span>{studentData?.preQualification}</span>
              </div>

              <div>
                Qualification Year : <span>{studentData?.qualificationYear?.split('T')[0]}</span>
              </div>


              <div>
                Degrees : <span>{studentData?.degree}</span>
              </div>

              <div>
                Seat Number : <span>{studentData?.seatNumber}</span>
              </div>

            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
