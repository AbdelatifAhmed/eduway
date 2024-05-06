import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
export default function Basic() {
  const axios = useAxiosPrivate()
  const [data,setData] = useState()
  console.log(data);
  useEffect(()=>{
    axios.get('api/Staff/BasicData')
    .then(res=>{
      setData(res?.data?.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

  return (
    <div className="page">
        <div className="basic-info">
          <div className="item">
            <fieldset>
              <legend>
                <h1>Personal Data</h1>
              </legend>
              <div>
                Arabic Name : <span className="">{data && data?.nameArabic}</span>
              </div>
              <div>
                English Name : <span className="">{data && data?.nameEnglish}</span>
              </div>
              <div>
                Gender : <span className="">{data && data?.gender}</span>
              </div>
              
              <div>
                Nationality : <span className="">{data && data?.nationality}</span>
              </div>
              <div>
                Religion :<span className="">{data && data?.religion}</span>
              </div>
              <div>
                Date of birth : <span className="">{data && data?.dateOfBirth}</span>
              </div>
              <div>
                National ID \ passport No : <span className="">{data && data?.nationalID}</span>
              </div>
              <div>
                Release Place : <span className="">{data && data?.releasePlace}</span>
              </div>
              <div>
                Place of birth : <span className="">{data && data?.placeOfBirth}</span>
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
                Address : <span>{data && data?.staffAddress}</span>
              </div>

              <div>
                Mobile : <span></span>
              </div>

              <div>
                Home Tel : <span></span>
              </div>

              <div>
                Postal Code : <span>{data && data?.postalCode}</span>
              </div>

              <div>
                Email : <span>{data && data?.email}</span>
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
                Pre-Qualification : <span>{data && data?.preQualification}</span>
              </div>

              <div>
                Qualification Year : <span>{data && data?.qualificationYear}</span>
              </div>

              <div>
                Qualification Turn : <span></span>
              </div>

              <div>
                Degree : <span>{data && data?.degree}</span>
              </div>

              <div>
                Seat Number : <span>{data && data?.seatNumber}</span>
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
