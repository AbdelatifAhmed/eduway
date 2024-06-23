import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";

export default function StudentView() {
  const axios = useAxiosPrivate()
  const {globalFaculty} = useFaculty()
  const [nameEG, setNameEg] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [mail, setMail] = useState("");
  const [nationalId, setNationalId] = useState("");
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
  const [parentName, setParentName] = useState("");
  const [parentJop, setParentJop] = useState("");
  const [parentCountryId, setParentCountryId] = useState();
  const [parentGovernorateId, setParentGovernorateId] = useState();
  const [parentCityId, setParentCityId] = useState();
  const [parentStreet, setParentStreet] = useState("");
  const [parentPhoneNum, setParentPhoneNum] = useState("");
  const Studentid = useParams();
  useEffect(() => {
    axios
      .get(`/api/Student/InfoData/${Studentid?.studentId}`)
      .then((res) => {
        const resData = res?.data?.data;
        setCountry( resData?.studentCountrysId)
        setGovernorate( resData?.studentGovernoratesId)
        setCity( resData?.studentCitysId)
        setStreet( resData?.studentStreet)
        // Setting each state variable with the corresponding value from the fetched data object
        setNameEg(resData?.nameEnglish || "");
        setNameAr(resData?.nameArabic || "");
        setStudentCode(resData?.studentCode || "");
        setMail(resData?.email || "");
        setNationalId(resData?.nationalID || "");
        setDate(resData?.dateOfBirth.split('T')[0])
        setParentPhoneNum(resData?.getPhoneStudentDtos[0].phoneNumber)
        // Similarly for other state variables
        setGender(resData?.gender || "");
        setReligion(resData?.religion || "");
        setNationality(resData?.nationality || "");
        setPlaceOfBirth(resData?.placeOfBirth || "");
        setPostalCode(resData?.postalCode || "");
        setReleasePlace(resData?.releasePlace || "");
        // Continue setting other state variables
        setPrequalification(resData?.preQualification || "");
        setPrequalificationYear(resData?.qualificationYear.split('T')[0] || "");
        setSeatNumber(resData?.seatNumber || "");
        setDegree(resData?.degree || "");
        setParentName(resData?.parentName || "");
        setParentJop(resData?.parentJob || "");
        setParentStreet(resData?.parentStreet || "");
        setParentCountryId(resData?.parentCountrysId || "");
        setParentGovernorateId(resData?.parentGovernoratesId || "");
        setParentCityId(resData?.parentCitysId || "");
      })
      .catch((err)=>
    {
      console.log(err);
    })
  }, []);

  const resetForm = () => {
    setNameEg("");
    setNameAr("");
    setStudentCode("");
    setMail("");
    setNationalId("");
    setGender("");
    setDate("");
    setReligion("");
    setNationality("");
    setPlaceOfBirth("");
    setReleasePlace("");
    setCity(null);
    setGovernorate("");
    setCountry(null);
    setStreet("");
    setPostalCode("");
    setPrequalification("");
    setPrequalificationYear("");
    setSeatNumber("");
    setDegree("");
    setParentName("");
    setParentJop("");
    setParentCountryId("");
    setParentGovernorateId("");
    setParentCityId("");
    setParentStreet("");
    setParentPhoneNum("");
  };


  const navigator = useNavigate();
  const goBack = () => {
    navigator("/admin/students");
  };
  const handelAddStudent = async (event) => {
    event.preventDefault();
    const numericGender = parseInt(Gender, 10);
    const numericSeatNumber = parseInt(seatNumber, 10);
    const numericDegree = parseFloat(degree);
    const numericNationality = parseInt(nationality, 10);
    const numericReligion = parseInt(religion, 10);
    const numericCountryId = parseInt(country, 10);
    const numericGovernorateId = parseInt(governorate, 10);
    const numericCityId = parseInt(city, 10);
    const numericPCountryId = parseInt(parentCountryId, 10);
    const numericPGovernorateId = parseInt(parentGovernorateId, 10);
    const numericPCityId = parseInt(parentCityId, 10);
    const phoneNumbers = [
      {
        phoneNumber: parentPhoneNum,
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
          "/api/Student/Update",
          {
            facultyId:globalFaculty,
            id:Studentid?.studentId,
            studentCode,
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
            parentName: parentName,
            parentJob: parentJop,
            parentCountryId: numericPCountryId,
            parentGovernorateId: numericPGovernorateId,
            parentCityId: numericPCityId,
            parentStreet: parentStreet,
            phoneNumbers: phoneNumbers,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: response?.data?.message,
            });
          }
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error Occured",
      });
    }
  };

  const[countries,setCountries] = useState([])
  const[governorates,setGovernorates] = useState([])
  const[cities,setCities] = useState([])

  useEffect(()=>{
    try {
      axios
      .get(`api/locations/GetCountry`)
      .then(res=>{
        setCountries(res?.data?.data)
      })
    } catch (error) {
      console.error(error);
    }

    
  },[])

  useEffect(()=>{
    if(country)
      {
        try {
          axios
          .get(`api/Locations/GetGovernorateByCountryId/${country}`)
          .then(res=>{
            setGovernorates(res?.data?.data)
          })
        } catch (error) {
          console.error(error);
        }
      }
  },[country])

  useEffect(()=>{
    if(governorate)
      {
        try {
          axios
          .get(`/api/Locations/GetCityByGovernorateId/${governorate}`)
          .then(res=>{
            setCities(res?.data?.data)
          })
        } catch (error) {
          console.error(error);
        }
      }
  },[governorate])
  return (
    <form onSubmit={handelAddStudent}>
      <div
        style={{ marginLeft: "20px" }}
        className="d-flex  justify-content-between"
      >
        <h1 className="d-inline">Update Student </h1>
        <div className="d-flex  gap-2 p-2">
          <button className="btn btn-info btn-md " style={{ color: "white" }}>
            Update
          </button>
          <button type="reset" onClick={resetForm} className="btn btn-warning btn-md">
            Reset
          </button>
          <button onClick={goBack} className="btn btn-dark btn-md">
            Back To Student
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
              placeholder="Student Code"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </div>
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
              value={nameAr}
              placeholder="Name in Arabic"
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
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="National Id"
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
              onChange={(e) => setGender(e.target.value)}
              value={Gender}
            >
              <option defaultValue={null} disabled>
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
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className="col">
            <select
              className="list"
              onChange={(e) => setReligion(e.target.value)}
              value={religion}
            >
              <option defaultValue={null} disabled>
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
              onChange={(e) => setNationality(e.target.value)}
              value={nationality}
            >
              <option disabled defaultValue={null}>
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
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              value={placeOfBirth}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Release place"
              onChange={(e) => setReleasePlace(e.target.value)}
              value={releasePlace}
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
              <option defaultValue={null} disabled>
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
              onChange={(e) => setGovernorate(e.target.value)}
              value={governorate}
            >
              <option defaultValue={null} disabled>
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
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            >
              <option defaultValue={null} disabled>
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
              placeholder="Phone Number"
              maxLength={11}
              value={parentPhoneNum}
              required
              onChange={(e) => setParentPhoneNum(e.target.value)}
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
        <div className="header mt-5">Family Member Information</div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Guardian Name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Guardian Job"
              value={parentJop}
              onChange={(e) => setParentJop(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="list"
              value={parentCountryId}
              onChange={(e) => setParentCountryId(e.target.value)}
            >
              <option defaultValue={null} disabled>
                Guardian Country
              </option>
              <option value={1}>مصر</option>
              <option value={2}>السعودية</option>
              <option value={100}>فرشوط</option>
            </select>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <select
              className="list"
              value={parentGovernorateId}
              onChange={(e) => setParentGovernorateId(e.target.value)}
            >
              <option defaultValue={null} disabled>
                Guardian Governorate
              </option>
              <option value={1}>الغربية</option>
              <option value={2}>الإسكندرية</option>
              <option value={100}>قنا</option>
            </select>
          </div>
          <div className="col">
            <select
              className="list"
              value={parentCityId}
              onChange={(e) => setParentCityId(e.target.value)}
            >
              <option defaultValue={null} disabled>
                Guardian City
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
            <input
              type="text"
              className="txt-input"
              placeholder="Guardian Street"
              value={parentStreet}
              onChange={(e) => setParentStreet(e.target.value)}
            />
          </div>
       
        </div>
      </div>
    </form>
  );
}
