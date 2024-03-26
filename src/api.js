import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Api() {
  // axios
  //   .post("https://gladly-in-quagga.ngrok-free.app/api/Auth/login", {
  //     nationalID: "19874123652147",
  //     password: "987456",
  //   })
  //   .then(function (response) {
  //     console.log(response.payload);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const nationalID = "19874123652147";
  const password = "987456";
  // let token;
  // const cookie = new Cookies();
  // const tokenSet = cookie.set("barier", token);
  // const get = cookie.get("refreshToken");
  // console.log(get);
  fetch(
    "https://gladly-in-quagga.ngrok-free.app/api/Auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      Credentials: "include",
      body: JSON.stringify({
        nationalID,
        password,
      }),
    },
    []
  )
    .then((response) => {
      console.log(response.data);
    })
    // .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <form>Hello</form>
    </div>
  );
}

<div className="table-continar">
  <table>
    <thead>
      <tr>
        <td>#</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td>
          <span>name in arabic</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>name in english</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>mail</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>gender</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>student id</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>nationality</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>religion</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>date of birth</span>
          <span>
                  <i className="fa-solid fa-sort" />
                </span>
        </td>
        <td>
          <span>national id /passport no.</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>release date</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>place of birth</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>guardian name</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>address</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>job</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>mobile</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>home tele</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>the city</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>fax</td>
        <td>
          <span>system mail</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>mail box</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>school</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>pre-qualfication</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>qualfication turn</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>degrees seat number</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>coordination number</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>
          <span>coordination date</span>
          <span>
            <i className="fa-solid fa-sort" />
          </span>
        </td>
        <td>photo</td>
        <td />
        <td />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>4</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>5</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>6</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>7</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
      <tr>
        <td>8</td>
        <td>
          <input type="checkbox" className="checkbox" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <i className="fa-solid fa-ellipsis-vertical" />
        </td>
        <td>
          <i className="fa-regular fa-pen-to-square" />
        </td>
      </tr>
    </tbody>
  </table>
</div>;
