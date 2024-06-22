import { useState } from "react";
import "../Css/style.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileExcel } from "react-icons/ai";
import useAxiosPrivate from "../hooks/useAxiosPrivatet";
import Swal from "sweetalert2";

function Uploader({ selectedCourse }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [isUploading, setIsUploading] = useState(false);
  const axios = useAxiosPrivate();

  const handleUpload = async () => {
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

    if (!file)
      {
        Toast.fire({
          icon: "info",
          title: "No selected file ",
        });
        return;
      } 

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await axios.put(`api/Course/UpdateCourseStudentsAssessMethodWithExcelFile/${selectedCourse}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "File uploaded successfully ",
        });
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "An error occurred while uploading the file ",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      <form
        className="form-uploader"
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept=".xlsx, .xls"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            if (files[0]) {
              setFileName(files[0].name);
              setFile(files[0]);
            }
          }}
        />
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to upload</p>
          </>

      </form>

      <section className="uploaded-row">
        <AiFillFileExcel color="#1475cf" size={"20px"} />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected file");
              setFile(null);
            }}
            size={"20px"}
            style={{ cursor: "pointer" }}
          />
        </span>
      </section>

      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </main>
  );
}

export default Uploader;
