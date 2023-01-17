import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";

let listCountry = {};
window.onload = function () {
  fetch("https://provinces.open-api.vn/api/?depth=2")
    .then((res) => res.json())
    .then((data) => {
      listCountry = data;
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
  $("#district option[class='flag']").remove();
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

const SignUp = () => {
  const setDistricts = () => {
    $("#district option[class='flag']").remove();
    let district = getCountryDataByValue();
    let options = ``;
    if (district != null)
      for (let i = 0; i < district.length; i++) {
        options += `<option class="flag">${district[i].name}</option>`;
      }
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

  // --------------------------------

  const getGenderValue = () => {
    var checkbox = document.getElementsByName("gender");
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        if (checkbox[i].value == "Nam") return 1;
        if (checkbox[i].value == "Nữ") return 2;
        return 3;
      }
    }
  };

  const showAlertError = (message) => {
    Swal.fire({
      title: "Lỗi",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  // getGenderValue()
  const checkValue = () => {
    if (
      document.getElementById("last-name").value.trim().length == 0 ||
      document.getElementById("first-name").value.trim().length == 0 ||
      document.getElementById("phone-number").value.trim().length == 0 ||
      document.getElementById("card-id").value.trim().length == 0 ||
      document.getElementById("last-name").value.trim().length == 0 ||
      document.getElementById("email").value.trim().length == 0 ||
      document.getElementById("password").value.trim().length == 0 ||
      document.getElementById("re-password").value.trim().length == 0
    )
      showAlertError("Vui lòng nhập đầy đủ thông tin!");
    else {
      if (
        document.getElementById("password").value !=
        document.getElementById("re-password").value
      )
        showAlertError("Mật khẩu không khớp");
      else if (document.getElementById("password").value.length < 6)
        showAlertError("Độ dài mật khẩu phải nhiều hơn 6 kí tự!");
      else {
        register();
      }
    }
  };

  const register = async () => {
    var File =
      document.getElementById("avatar").files[0] == null
        ? null
        : document.getElementById("avatar").files[0];
    const formData = new FormData();
    formData.append("File", File);
    formData.append("Email", document.getElementById("email").value.trim());
    formData.append(
      "Password",
      document.getElementById("password").value.trim()
    );
    formData.append(
      "FirstName",
      document.getElementById("first-name").value.trim()
    );
    formData.append(
      "LastName",
      document.getElementById("last-name").value.trim()
    );
    formData.append("Gender", getGenderValue());
    formData.append("CardId", document.getElementById("card-id").value.trim());
    formData.append(
      "PhoneNumber",
      document.getElementById("phone-number").value.trim()
    );
    formData.append(
      "Address",
      document.getElementById("address").value +
        ", " +
        document.getElementById("district").value +
        ", " +
        document.getElementById("city").value
    );
    console.log([...formData]);

    // const option = {
    //     method: 'post',
    //     url: `https://localhost:7109/api/Account/auth/sign-up`,
    //     validateStatus: function (status) {
    //         return status  < 500; // default
    //       },
    //     data:  formData
    // };

    // try {
    //     const result = await axios(option);
    //     // console.log(result)
    //     showAlertError(result['response']['data']['message']);
    // } catch (error) {
    //     const { response } = error;
    //     const { request, ...errorObject } = response;
    //     console.log("error: " + error);
    //     showAlertError("catch");
    // }

    try {
      const results = await axios.post(
        "https://localhost:7109/api/Account/auth/sign-up",
        formData
      );
      console.log(results);
      document.cookie = "Email=" + results["data"]["data"] + "end-email"; // check
      window.location.href =
        window.location.href.slice(0, window.location.href.indexOf("/auth")) +
        "/auth/confirm-account";
    } catch (e) {
      console.log(e);
      showAlertError(e["response"]["data"]["message"]);
    }
  };

  return (
    <>
      <h1 className="h1-title">Đăng ký</h1>
      <form style={{ paddingLeft: "40%" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Họ: <br />
            <input
              id="last-name"
              type="text"
              name="name"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Tên: <br />
            <input
              id="first-name"
              type="text"
              name="name"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Giới tính: <br />
            <input
              id="gender-1"
              defaultChecked
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="Nam"
            />
            Nam
            <input
              id="gender-2"
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="Nữ"
            />{" "}
            Nữ
            <input
              id="gender-3"
              type="radio"
              name="gender"
              style={{ marginLeft: "70px" }}
              value="Khác"
            />{" "}
            Khác
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Ảnh đại diện: <br />
            <input
              id="avatar"
              type="file"
              name="avatar"
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
              name="card-id"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Số điện thoại: <br />
            <input
              id="phone-number"
              type="text"
              name="phone-number"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        {/* // address */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            {" "}
            <span style={{ fontSize: "17px" }}>Địa chỉ:</span> <br />
            <div className="row">
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  Tỉnh/thành:
                </label>
                <select
                  path="userCity"
                  id="city"
                  style={{ width: "215px", height: "30px" }}
                  onClick={setDistricts}
                ></select>
              </div>
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "6px" }}>
                  Huyện/quận:
                </label>
                <select
                  path="userDistrict"
                  id="district"
                  style={{
                    width: "215px",
                    height: "30px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={setWard}
                ></select>
              </div>
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  Xã phường:
                </label>
                <input
                  id="address"
                  type="text"
                  name="Address"
                  style={{ width: "208px", height: "23px" }}
                />
              </div>
            </div>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email: <br />
            <input
              id="email"
              type="email"
              name="Email"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Mật khẩu: <br />
            <input
              id="password"
              type="password"
              name="password"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Nhập lại mật khẩu: <br />
            <input
              id="re-password"
              type="password"
              name="password"
              style={{ width: "300px" }}
            />
          </label>
        </div>

        <button id="button" type="button" onClick={checkValue}>
          Đăng ký{" "}
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default SignUp;
