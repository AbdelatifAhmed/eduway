import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivatet";
import useFaculty from "../../hooks/useFaculty";
import { Modal } from "react-bootstrap";
import Uploader from "../../Components/Uploader";
import { RiFileExcel2Fill } from "react-icons/ri";
export default function AddStudent() {
  const axios = useAxiosPrivate();
  const { globalFaculty } = useFaculty();
  const [nameEG, setNameEg] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [studentCode, setStudentCode] = useState("");
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
  const [parentName, setParentName] = useState("");
  const [parentJop, setParentJop] = useState("");
  const [parentCountryId, setParentCountryId] = useState();
  const [parentGovernorateId, setParentGovernorateId] = useState();
  const [parentCityId, setParentCityId] = useState();
  const [parentStreet, setParentStreet] = useState("");
  const [parentPhoneNum, setParentPhoneNum] = useState("");

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
        .post("/api/Student/AddStudent", {
          studentCode,
          nameArabic: nameAr,
          nameEnglish: nameEG,
          nationalID: nationalId,
          email: mail,
          password: password,
          confirmPasswor: conPassowrd,
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
          facultyId: globalFaculty,
        })
        .then((response) => {
          if (response.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <h1 className="d-inline btn-add1">Add Student</h1>
        <div className="d-flex  gap-2 p-2">
          <button className="btn btn-info btn-md btn-md1" style={{ color: "white" }}>
            Save
          </button>
          <button type="reset" className="btn btn-warning btn-md btn-md1">
            Reset
          </button>
          <button onClick={goBack} className="btn btn-dark btn-md btn-md1">
            Back To Student
          </button>
          <RiFileExcel2Fill
            size={"50px"}
            style={{
              background: "green",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleShow}
          />
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add list of student </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {globalFaculty ? (
              <Uploader
                type={2}
                url={"api/Student/AddListOfStudentsFromExcel/"}
                id={globalFaculty}
              />
            ) : (
              "Select Faculty"
            )}
          </Modal.Body>
        </Modal>
      </div>

      <div className="add-student">
        <div className="header">Basic Information</div>
        <div className="row">
          {/* <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Student Code"
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </div> */}
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Name in English"
              onChange={(e) => setNameEg(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
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
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="National Id"
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <input
              type="password"
              className="txt-input"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="txt-input"
              placeholder="Confirm Password"
              onChange={(e) => setConPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="header mt-4">Personal Information</div>
        <div className="row">
          <div className="col">
            <select
              className="list"
              onChange={(e) => setGender(e.target.value)}
            >
              <option defaultValue hidden>
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
            />
          </div>
          <div className="col">
            <select
              className="list"
              onChange={(e) => setReligion(e.target.value)}
            >
              <option defaultValue hidden>
                Religion
              </option>
              <option value={1}>مسلم</option>
              <option value={2}>مسيحي</option>
            </select>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <select
              className="list"
              onChange={(e) => setNationality(e.target.value)}
            >
              <option hidden defaultValue>
                Nationality
              </option>
              <option value={52}>Afghan</option>
              <option value={2}>Albanian</option>
              <option value={3}>Algerian</option>
              <option value={4}>American</option>
              <option value={5}>Andorran</option>
              <option value={6}>Angolan</option>
              <option value={7}>Argentinian</option>
              <option value={8}>Armenian</option>
              <option value={9}>Australian</option>
              <option value={10}>Austrian</option>
              <option value={11}>Azerbaijani</option>
              <option value={12}>Bahamian</option>
              <option value={13}>Bahraini</option>
              <option value={14}>Bangladeshi</option>
              <option value={15}>Barbadian</option>
              <option value={16}>Belarusian</option>
              <option value={17}>Belgian</option>
              <option value={18}>Belizean</option>
              <option value={19}>Beninese</option>
              <option value={20}>Bhutanese</option>
              <option value={21}>Bolivian</option>
              <option value={22}>Bosnian</option>
              <option value={23}>Botswanan</option>
              <option value={24}>Brazilian</option>
              <option value={25}>British</option>
              <option value={26}>Bruneian</option>
              <option value={27}>Bulgarian</option>
              <option value={28}>Burkinabe</option>
              <option value={29}>Burmese</option>
              <option value={30}>Burundian</option>
              <option value={31}>Cambodian</option>
              <option value={32}>Cameroonian</option>
              <option value={33}>Canadian</option>
              <option value={34}>Cape Verdean</option>
              <option value={35}>Central African</option>
              <option value={36}>Chadian</option>
              <option value={37}>Chilean</option>
              <option value={38}>Chinese</option>
              <option value={39}>Colombian</option>
              <option value={40}>Comoran</option>
              <option value={41}>Congolese</option>
              <option value={42}>Costa Rican</option>
              <option value={43}>Croatian</option>
              <option value={44}>Cuban</option>
              <option value={45}>Cypriot</option>
              <option value={46}>Czech</option>
              <option value={47}>Danish</option>
              <option value={48}>Djiboutian</option>
              <option value={49}>Dominican</option>
              <option value={50}>Dutch</option>
              <option value={51}>Ecuadorean</option>
              <option value={1}>Egyptian</option>
              <option value={53}>Salvadoran</option>
              <option value={54}>Equatorial Guinean</option>
              <option value={55}>Eritrean</option>
              <option value={56}>Estonian</option>
              <option value={57}>Ethiopian</option>
              <option value={58}>Fijian</option>
              <option value={59}>Finnish</option>
              <option value={60}>French</option>
              <option value={61}>Gabonese</option>
              <option value={62}>Gambian</option>
              <option value={63}>Georgian</option>
              <option value={64}>German</option>
              <option value={65}>Ghanaian</option>
              <option value={66}>Greek</option>
              <option value={67}>Grenadian</option>
              <option value={68}>Guatemalan</option>
              <option value={69}>Guinean</option>
              <option value={70}>Guinea-Bissauan</option>
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Place of Birth"
              onChange={(e) => setPlaceOfBirth(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Release place"
              onChange={(e) => setReleasePlace(e.target.value)}
            />
          </div>
        </div>
        <div className="header mt-4">Contact Data</div>
        <div className="row">
        <div className="col">
            <select
              className="list"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option defaultValue hidden>
                Country
              </option>
              {countries ? countries?.map((item,i)=>(
                <option key={i} value={item.id}>{item.name}</option>
              )):
              <option>No Countries</option>}
            </select>
          </div>
    
          <div className="col">
            <select
              className="list"
              onChange={(e) => setGovernorate(e.target.value)}
            >
              <option defaultValue hidden>
                Governorate
              </option>
              {governorates ? governorates?.map((item,i)=>(
                <option key={i} value={item.id}>{item.name}</option>
              )):
              <option>No Governorates</option>}
            </select>
          </div>
          <div className="col">
            <select
              className="list"
              id="exampleSelectVendor"
              name="city"
              onChange={(e) => setCity(e.target.value)}
            >
              <option defaultValue hidden>
                City
              </option>
              {cities ? cities?.map((item,i)=>(
                <option key={i} value={item.id}>{item.name}</option>
              )):
              <option>No cities</option>}
            </select>
          </div>
          
        </div>
        <div className="row pt-3">
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Street"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Phone Number"
              maxLength={11}
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
              onChange={(e) => setPrequalification(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="txt-input"
              title="Prequalification Year"
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
              onChange={(e) => setSeatNumber(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="txt-input"
              placeholder="Degeree"
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
              onChange={(e) => setParentName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="txt-input"
              placeholder="Guardian Job"
              onChange={(e) => setParentJop(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="list"
              onChange={(e) => setParentCountryId(e.target.value)}
            >
              <option defaultValue hidden>
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
              onChange={(e) => setParentGovernorateId(e.target.value)}
            >
              <option defaultValue hidden>
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
              onChange={(e) => setParentCityId(e.target.value)}
            >
              <option defaultValue hidden>
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
              onChange={(e) => setParentStreet(e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
