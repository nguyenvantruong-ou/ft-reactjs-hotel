import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../../../Utils/Url";
import $ from "jquery";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";
import Swal from "sweetalert2";

const CreateAccount = () => {
  const [listCountry, setListCountry] = useState([]);
  const [typeStaff, setTypeStaff] = useState([]);
  const [typeStaffID, setTypeStaffID] = useState();

  window.onload = function () {
    fetch("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => res.json())
      .then((data) => {
        setListCountry(data);
        setCountry(data);
        setDistrictsDefault();
      });
  };

  const setCountry = (data) => {
    let options = ``;
    for (let c = 0; c < data.length; c++) {
      options += `<option id='${data[c].codename}' >${data[c].name}</option>`;
    }
    if (document.getElementById("city") != null)
      document.getElementById("city").insertAdjacentHTML("beforeend", options);
  };

  const setDistrictsDefault = () => {
    let district = listCountry[0].districts;
    let options = ``;
    if (district != null)
      for (let i = 0; i < district.length; i++) {
        options += `<option class="flag">${district[i].name}</option>`;
      }
    if (document.getElementById("district") != null)
      document
        .getElementById("district")
        .insertAdjacentHTML("beforeend", options);
  };

  const setDistricts = () => {
    $("#district option[class='flag']").remove();
    let district = getCountryDataByValue();
    let options = ``;
    if (district != null)
      for (let i = 0; i < district.length; i++) {
        options += `<option class="flag">${district[i].name}</option>`;
      }
    if (document.getElementById("district") != null)
      document
        .getElementById("district")
        .insertAdjacentHTML("beforeend", options);
  };

  const setWard = () => {
    $("#ward option[class='flag']").remove();
    let district = getCountryDataByValue();
    let options = ``;
    if (district != null)
      for (let i = 0; i < district.length; i++) {
        options += `<option class="flag">${district[i].name}</option>`;
      }
    if (document.getElementById("district") != null)
      document
        .getElementById("district")
        .insertAdjacentHTML("beforeend", options);
  };

  function getCountryDataByValue() {
    for (let i = 0; i < listCountry.length; i++) {
      if (document.getElementById("city").value == listCountry[i].name) {
        return listCountry[i].districts;
      }
    }
    return null;
  }

  const GetTypeStaff = () => {
    let api = URL + "AccountManagement/staff-type";
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTypeStaff(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  const SetTypeStaff = () => {
    return typeStaff.map((s) => {
      return (
        <option id={s.id} className="type-staff">
          {s.type}
        </option>
      );
    });
  };

  const updateAddress = () => {
    document.getElementById("update-address-acc").style.display = "block";
  };

  const SetAddress = () => {
    document.getElementById("address-update").value =
      document.getElementById("address").value +
      ", " +
      document.getElementById("district").value +
      ", " +
      document.getElementById("city").value;
  };

  const GetTypeStaffId = () => {
    var r = document.getElementsByClassName("type-staff");
    for (var i = 0; i < r.length; i++) {
      if (r[i].selected == true) setTypeStaffID(r[i].id);
    }
  };

  const Staff = () => {
    if (document.getElementById("is-staff").checked == true) {
      document.getElementById("type-staff-select").style.display = "block";
      document.getElementById("salary-staff-input").style.display = "block";
    } else {
      document.getElementById("type-staff-select").style.display = "none";
      document.getElementById("salary-staff-input").style.display = "none";
    }
  };

  const CreateAccount = () => {
    let timerInterval;
    Swal.fire({
      title: "??ang th???c hi???n ...",
      html: "Qu?? tr??nh s??? k???t th??c sau <b></b> mili gi??y.",
      timer: 2500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    var data = {};
    if (document.getElementById("is-staff").checked == true) {
      data = {
        Email: document.getElementById("email").value.trim(),
        FirstName: document.getElementById("last-name").value.trim(),
        LastName: document.getElementById("first-name").value.trim(),
        CardId: document.getElementById("card-id").value.trim(),
        PhoneNumber: document.getElementById("phone-number").value.trim(),
        Address: document.getElementById("address-update").value.trim(),
        Salary: document.getElementById("salary").value.trim(),
        TypeStaff: typeStaffID,
      };
    } else {
      data = {
        Email: document.getElementById("email").value.trim(),
        FirstName: document.getElementById("last-name").value.trim(),
        LastName: document.getElementById("first-name").value.trim(),
        CardId: document.getElementById("card-id").value.trim(),
        PhoneNumber: document.getElementById("phone-number").value.trim(),
        Address: document.getElementById("address-update").value.trim(),
      };
    }
    console.log("???? ~ file: CreateAccount.js:140 ~ CreateAccount ~ data", data);
    CheckRefreshToken();
    fetch(URL + "AccountManagement/account", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) {
          window.location.href = "/admin/account-management?Kw&Page=1";
        } else {
          AlertWarning(results.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        AlertWarning(error.message);
      });
  };

  const CheckValue = () => {
    if (
      document.getElementById("last-name").value.trim().length == 0 ||
      document.getElementById("first-name").value.trim().length == 0 ||
      document.getElementById("email").value.trim().length == 0
    )
      AlertWarning("Vui l??ng nh???p th??ng tin ?????y ?????!");
    else if (
      document.getElementById("card-id").value.trim().length < 9 ||
      document.getElementById("card-id").value.trim().length > 12
    )
      AlertWarning("CMND/CCCD ph???i 9-12 ch??? s???!");
    else if (document.getElementById("phone-number").value.trim().length != 10)
      AlertWarning("S??? ??i???n tho???i ph???i c?? 10 ch??? s???!");
    else CreateAccount();
  };

  useEffect(() => {
    GetTypeStaff();
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        T???o t??i kho???n
      </h1>
      <form style={{ paddingLeft: "40%" }} className="create-acc-form">
        <div style={{ marginBottom: "10px" }}>
          <label>
            H???: <br />
            <input
              id="last-name"
              type="text"
              name="lastName"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            T??n: <br />
            <input
              id="first-name"
              type="text"
              name="firstName"
              style={{ width: "300px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            CMND/CCCD: <br />
            <input
              id="card-id"
              type="text"
              name="cardId"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            S??? ??i???n tho???i: <br />
            <input
              id="phone-number"
              type="text"
              name="phoneNumber"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email: <br />
            <input
              id="email"
              type="email"
              name="email"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Nh??n vi??n: <br />
            <input
              id="is-staff"
              type="checkbox"
              name="status"
              style={{ width: "300px" }}
              onChange={() => Staff()}
            />
          </label>
        </div>
        <div
          id="type-staff-select"
          style={{ marginBottom: "10px", display: "none" }}
        >
          <label>
            Ch???c v???: <br />
            <select
              id="typeStaff"
              style={{ width: "323px", height: "45px", fontSize: "17px" }}
              onChange={() => GetTypeStaffId()}
            >
              {SetTypeStaff()}
            </select>
          </label>
        </div>
        <div
          id="salary-staff-input"
          style={{ marginBottom: "10px", display: "none" }}
        >
          <label>
            L????ng: <br />
            <input
              id="salary"
              type="text"
              name="salary"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        {/* // address */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            {" "}
            <span style={{ fontSize: "17px" }}>
              ?????a ch???: <br />
              <input
                id="address-update"
                type="lable"
                style={{
                  width: "300px",
                  marginLeft: "0px",
                  marginRight: "10px",
                }}
              />
              <i
                class="fa fa-pencil-square-o"
                aria-hidden="true"
                onClick={() => updateAddress()}
              ></i>
            </span>
            <br />
            <br />
            <div
              className="row"
              style={{ display: "none" }}
              id="update-address-acc"
            >
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  T???nh/th??nh:
                </label>
                <select
                  path="userCity"
                  id="city"
                  style={{ width: "233px", height: "30px" }}
                  onClick={() => setDistricts()}
                ></select>
              </div>
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "6px" }}>
                  Huy???n/qu???n:
                </label>
                <select
                  path="userDistrict"
                  id="district"
                  style={{
                    width: "233px",
                    height: "30px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => setWard()}
                ></select>
              </div>
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  X?? ph?????ng:
                </label>
                <input
                  id="address"
                  type="text"
                  name="Address"
                  style={{ width: "209px", height: "23px" }}
                  onChange={() => SetAddress()}
                />
              </div>
            </div>
          </label>
        </div>
        <div class="middle" onClick={() => CheckValue()}>
          <a class="btn btn1">T???o m???i</a>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
