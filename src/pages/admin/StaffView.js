import { useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function StaffView() {
    const axios = useAxiosPrivate()
    const {globalFaculty} = useFaculty()
    const [nameEG, setNameEg] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [mail, setMail] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [conPassowrd, setConPassword] = useState("");
    const [Gender, setGender] = useState();
    const [date, setDate] = useState("");
    const [religion, setReligion] = useState();
    const [nationality, setNationality] = useState();
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [releasePlace, setReleasePlace] = useState("");
    const [city, setCity] = useState();
    const [governorate, setGovernorate] = useState();
    const [country, setCountry] = useState();
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [prequalification, setPrequalification] = useState("");
    const [prequalificationYear, setPrequalificationYear] = useState("");
    const [seatNumber, setSeatNumber] = useState();
    const [degree, setDegree] = useState();
    const [phoneNum, setPhoneNum] = useState("");
    const {staffId} = useParams()
    useEffect(() => {
       
        const fetchData = async()=>{
        await 
        axios
          .get(`/api/staff/InfoData/${staffId}`)
          .then((res) => {
            const resData = res?.data?.data;
            setCountry(resData?.staffCountryId)
            setGovernorate(resData?.staffGovernorateId)
            setCity( resData?.staffCityId)
            setStreet( resData?.staffStreet)
            setNameEg(resData?.nameEnglish || "");
            setNameAr(resData?.nameArabic || "");
            setMail(resData?.email || "");
            setNationalId(resData?.nationalID || "");
            setDate(resData?.dateOfBirth.split('T')[0])
            setPhoneNum(resData.getPhoneStaffDtos[0].phoneNumber)
            setGender(resData?.gender || "");
            setReligion(resData?.religion || "");
            setNationality(resData?.nationality || "");
            setPlaceOfBirth(resData?.placeOfBirth || "");
            setPostalCode(resData?.postalCode || "");
            setReleasePlace(resData?.releasePlace || "");
            setPrequalification(resData?.preQualification || "");
            setPrequalificationYear(resData?.qualificationYear.split('T')[0] || "");
            setSeatNumber(resData?.seatNumber || "");
            setDegree(resData?.degree || "");
          })
          .catch((err)=>
        {
          console.log(err);
        })
    }

        fetchData()
      }, []);
  
  
    const navigator = useNavigate();
    const goBack = () => {
      navigator("/admin/staff");
    };

    const handelUpdateStaff = async (event) => {
      event.preventDefault();
      const numericGender = parseInt(Gender, 10);
      const numericSeatNumber = parseInt(seatNumber, 10);
      const numericDegree = parseFloat(degree);
      const numericNationality = parseInt(nationality, 10);
      const numericReligion = parseInt(religion, 10);
      const numericCountryId = parseInt(country, 10);
      const numericGovernorateId = parseInt(governorate, 10);
      const numericCityId = parseInt(city, 10);
  
      const phoneNumbers = [
        {
          phoneNumber: phoneNum,
          type: 1,
        },
      ];
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      try {
        await axios
          .put(
            `/api/staff/update`,
            {
              id:staffId,
              nameArabic: nameAr,
              nameEnglish: nameEG,
              nationalID: nationalId,
              email: mail,
              placeOfBirth: placeOfBirth,
              gender: numericGender,
              nationality: numericNationality,
              religion: numericReligion,
              releasePlace: releasePlace,
              dateOfBirth: date,
              countryId: numericCountryId,
              governorateId: numericGovernorateId,
              cityId: numericCityId,
              street: street,
              postalCode: postalCode,
              preQualification: prequalification,
              seatNumber: numericSeatNumber,
              qualificationYear: prequalificationYear,
              degree: numericDegree,
              phoneNumbers,
              facultyId:globalFaculty,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              Toast.fire({
                icon: "success",
                title: response?.data?.message ,
              });
            }
          });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message,
        });
      }
    };
    return (
      <div>
        <form onSubmit={handelUpdateStaff}>
          <div
            style={{ marginLeft: "20px" }}
            className="d-flex  justify-content-between"
          >
            <h1 className="d-inline">Update </h1>
            <div className="d-flex  gap-2 p-2">
              <button className="btn btn-info btn-md " style={{ color: "white" }}>
                Save
              </button>
              <button type="reset" className="btn btn-warning btn-md">
                Reset
              </button>
              <button onClick={goBack} className="btn btn-dark btn-md">
                Back To Staff
              </button>
            </div>
          </div>
  
          <div className="add-student">
            <div className="header">Basic Information</div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Name in English"
                  value={nameEG}
                  onChange={(e) => setNameEg(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Name in Arabic"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                />
              </div>
            </div>
            <div className="row pt-3">
            <div className="col">
                <input
                  type="email"
                  className="txt-input"
                  placeholder="Mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="National Id"
                  maxLength={14}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </div>
            </div>
            <div className="header mt-4">Personal Information</div>
            <div className="row">
              <div className="col">
                <select
                  className="list"
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option selected disabled>
                    Gender
                  </option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                </select>
              </div>
              <div className="col">
                <input
                  type="date"
                  className="txt-input"
                  placeholder="Date of birth"
                  title="Date of birth"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col">
                <select
                  className="list"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option disabled selected>
                    Religion
                  </option>
                  <option value={1}>مسلم</option>
                  <option value={2}>مسيحي</option>
                  <option value={3}></option>
                </select>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <select
                  className="list"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option disabled selected>
                    Nationality
                  </option>
                  <option value={1}>مصري</option>
                  <option value={2}>سعودي</option>
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Place of Birth"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Release place"
                  value={releasePlace}
                  onChange={(e) => setReleasePlace(e.target.value)}
                />
              </div>
            </div>
            <div className="header mt-4">Contact Data</div>
            <div className="row">
              <div className="col">
                <select
                  className="list"
                  id="exampleSelectVendor"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option selected disabled>
                    City
                  </option>
                  <option value={1}>الغربية</option>
                  <option value={2}>الإسكندرية</option>
                  <option>الإسماعيلية</option>
                  <option>كفر الشيخ</option>
                  <option>أسوان</option>
                  <option>أسيوط</option>
                  <option>الأقصر</option>
                  <option>الوادي الجديد</option>
                  <option>شمال سيناء</option>
                  <option>البحيرة</option>
                  <option>بني سويف</option>
                  <option>بورسعيد</option>
                  <option>البحر الأحمر</option>
                  <option>الجيزة</option>
                  <option>الدقهلية</option>
                  <option>جنوب سيناء</option>
                  <option>دمياط</option>
                  <option>سوهاج</option>
                  <option>السويس</option>
                  <option>الشرقية</option>
                  <option>الغربية</option>
                  <option>الفيوم</option>
                  <option>القاهرة</option>
                  <option>القليوبية</option>
                  <option value={100}>قنا</option>
                  <option>مطروح</option>
                  <option>المنوفية</option>
                  <option>المنيا</option>
                </select>
              </div>
              <div className="col">
                <select
                  className="list"
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                >
                  <option selected disabled>
                    Governorate
                  </option>
                  <option value={1}>الغربية</option>
                  <option value={2}>الإسكندرية</option>
                  <option value={100}>قنا</option>
                </select>
              </div>
              <div className="col">
                <select
                  className="list"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option selected disabled>
                    Country
                  </option>
                  <option value={1}>مصر</option>
                  <option value={2}>السعودية</option>
                  <option value={100}>فرشوط</option>
                </select>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Phone number"
                  maxLength={11}
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </div>
            </div>
            <div className="header mt-4">Pre-Qualification</div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="txt-input"
                  placeholder="Prequalification"
                  value={prequalification}
                  onChange={(e) => setPrequalification(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="txt-input"
                  title="Prequalification Year"
                  value={prequalificationYear}
                  onChange={(e) => setPrequalificationYear(e.target.value)}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <input
                  type="number"
                  className="txt-input"
                  placeholder="Seat Number"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="txt-input"
                  placeholder="Degeree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}
