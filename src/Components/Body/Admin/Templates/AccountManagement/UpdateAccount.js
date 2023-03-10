import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../../../Utils/Url";
import $ from "jquery";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";

const UpdateAccount = () => {
  const [listCountry, setListCountry] = useState([]);
  const [account, setAccount] = useState({});
  const [staff, setStaff] = useState([]);
  const [typeStaff, setTypeStaff] = useState([]);
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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

  const GetDataAccount = () => {
    let api = URL + "AccountManagement/account/" + id;
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAccount(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  const updateAddress = () => {
    document.getElementById("update-address-acc").style.display = "block";
  };

  const GetTypeStaffId = () => {
    var r = document.getElementsByClassName("type-staff");
    console.log(r);
    for (var i = 0; i < r.length; i++) {
      if (r[i].selected == true) return r[i].id;
    }
  };

  const UpdateAccount = () => {
    let api = URL + "AccountManagement/account";
    var data = {};
    if (account.salary > 0) {
      data = {
        Id: account.id,
        Email: document.getElementById("email").value.trim(),
        FirstName: document.getElementById("last-name").value.trim(),
        LastName: document.getElementById("first-name").value.trim(),
        Gender: GetValueGender(),
        CardId: document.getElementById("card-id").value.trim(),
        PhoneNumber: document.getElementById("phone-number").value.trim(),
        Address: document.getElementById("address-update").value.trim(),
        Status: document.getElementById("status").checked,
        Salary: document.getElementById("salary").value.trim(),
        TypeStaff: GetTypeStaffId(),
        StatusStaff: true,
        ResetPw: document.getElementById("reset-pw").checked,
      };
    } else {
      data = {
        Id: account.id,
        Email: document.getElementById("email").value.trim(),
        FirstName: document.getElementById("last-name").value.trim(),
        LastName: document.getElementById("first-name").value.trim(),
        Gender: GetValueGender(),
        CardId: document.getElementById("card-id").value.trim(),
        PhoneNumber: document.getElementById("phone-number").value.trim(),
        Address: document.getElementById("address-update").value.trim(),
        Status: document.getElementById("status").checked,
        ResetPw: document.getElementById("reset-pw").checked,
      };
    }
    console.log(data);
    CheckRefreshToken();
    fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 200) AlertOk("C???p nh???t th??nh c??ng");
      })
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
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
    else UpdateAccount();
  };

  const GetValueGender = () => {
    if (document.getElementById("gender-1").checked) return 1;
    if (document.getElementById("gender-2").checked) return 2;
    return 3;
  };

  const SetAddress = () => {
    document.getElementById("address-update").value =
      document.getElementById("address").value +
      ", " +
      document.getElementById("district").value +
      ", " +
      document.getElementById("city").value;
  };

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
        <>
          {s.type == account.typeStaff ? (
            <option id={s.id} className="type-staff" selected>
              {s.type}
            </option>
          ) : (
            <option className="type-staff" id={s.id}>
              {s.type}
            </option>
          )}
        </>
      );
    });
  };

  useEffect(() => {
    GetDataAccount();
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
        C???p nh???t th??ng tin t??i kho???n
      </h1>
      <form style={{ paddingLeft: "40%" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            H???: <br />
            <input
              id="last-name"
              type="text"
              name="lastName"
              style={{ width: "300px" }}
              value={account.lastName}
              onChange={handleChange}
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
              value={account.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Gi???i t??nh: <br />
            <input
              id="gender-1"
              checked={account.gender == "Nam" ? true : false}
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="Nam"
              onChange={handleChange}
            />
            Nam
            <input
              id="gender-2"
              checked={account.gender == "N???" ? true : false}
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="N???"
              onChange={handleChange}
            />{" "}
            N???
            <input
              id="gender-3"
              checked={account.gender == "Kh??c" ? true : false}
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="Kh??c"
              onChange={handleChange}
            />{" "}
            Kh??c
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
              value={account.cardId}
              onChange={handleChange}
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
              value={account.phoneNumber}
              onChange={handleChange}
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
              value={account.email}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            ?????t l???i m???t kh???u: <br />
            <input
              id="reset-pw"
              type="checkbox"
              name="status"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Tr???ng th??i: <br />
            <input
              id="status"
              type="checkbox"
              name="status"
              style={{ width: "300px" }}
              checked={account.status}
              onChange={handleChangeCheckbox}
            />
          </label>
        </div>
        {account.salary > 0 ? (
          <>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Ch???c v???: <br />
                <select
                  id="typeStaff"
                  style={{ width: "308px", height: "28px" }}
                  onChange={() => GetTypeStaffId()}
                >
                  {SetTypeStaff()}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                L????ng: <br />
                <input
                  id="salary"
                  type="text"
                  name="salary"
                  style={{ width: "300px" }}
                  value={account.salary}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        ) : (
          <></>
        )}
        {/* // address */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            {" "}
            <span style={{ fontSize: "17px" }}>
              ?????a ch???: <br />
              <input
                id="address-update"
                type="lable"
                // value={result.address}
                style={{
                  width: "300px",
                  marginLeft: "0px",
                  marginRight: "10px",
                }}
                value={account.address}
              />
              <i
                class="fa fa-pencil-square-o"
                aria-hidden="true"
                onClick={() => updateAddress()}
              ></i>
            </span>{" "}
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
                  style={{ width: "217px", height: "30px" }}
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
                    width: "217px",
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
        <button id="button" type="button" onClick={() => CheckValue()}>
          C???p nh???t{" "}
        </button>
      </form>
    </>
  );
};

export default UpdateAccount;
