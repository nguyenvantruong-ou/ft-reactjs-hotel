import React from "react";
import "../css/General.css";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertError } from "../../Alert/Error";
import { AlertOk } from "../../Alert/AlertOk";
import { useLoaderData } from "react-router-dom";
import CheckRefreshToken from "../../../Utils/CheckRefreshToken";
import AOS from "aos";
import "aos/dist/aos.css";

let listCountry = {};
$("set-address").ready(function () {
  fetch("https://provinces.open-api.vn/api/?depth=2")
    .then((res) => res.json())
    .then((data) => {
      listCountry = data;
      setCountry(data);
      setDistrictsDefault();
    });
});

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

const setDistricts = () => {
  $("#district option[class='flag']").remove();
  let district = getCountryDataByValue();
  let options = ``;
  if (district != null)
    for (let i = 0; i < district.length; i++) {
      options += `<option class="flag">${district[i].name}</option>`;
    }
  document.getElementById("district").insertAdjacentHTML("beforeend", options);
};

const setWard = () => {
  $("#ward option[class='flag']").remove();
  let district = getCountryDataByValue();
  let options = ``;
  if (district != null)
    for (let i = 0; i < district.length; i++) {
      options += `<option class="flag">${district[i].name}</option>`;
    }
  document.getElementById("district").insertAdjacentHTML("beforeend", options);
};

function getCountryDataByValue() {
  for (let i = 0; i < listCountry.length; i++) {
    if (document.getElementById("city").value == listCountry[i].name) {
      return listCountry[i].districts;
    }
  }
  return null;
}

function getGenderValue(value) {
  if (value == "Nam") return 1;
  if (value == "Nữ") return 2;
  return 3;
}

var phoneNumber = "";
var cardId = "";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }
  async componentDidMount() {
    let api = URL + "AccountManagement/account/" + localStorage.getItem("Id");
    // check expiration of token
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(
          "🚀 ~ file: Profile.js:106 ~ Profile ~ .then ~ results",
          results
        );
        // alert("KKKKK");
        this.setState({
          response: results.data,
        });
        //
        document.getElementById("img-user-header").src = results.data.avatar;
        localStorage.setItem("Avatar", results.data.avatar);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  checkrole(role) {
    if (role == "USER") return "Người dùng";
    if (role == "STAFF") return "Nhân viên";
    return "Quản trị viên";
  }

  checkGender(gender) {
    if (gender == "Nam")
      return (
        <>
          <option selected>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </>
      );
    if (gender == "Nữ")
      return (
        <>
          <option>Nam</option>
          <option selected>Nữ</option>
          <option>Khác</option>
        </>
      );
    return (
      <>
        <option>Nam</option>
        <option>Nữ</option>
        <option selected>Khác</option>
      </>
    );
  }

  updateAddress() {
    document.getElementById("set-address").style.display = "block";
    document.getElementById("profile-par").style.height = "810px";
    document.getElementById("btn-update-pr").style.opacity = 1;
  }

  updateCardId() {
    document.getElementById("show-cardid").style.display = "none";
    document.getElementById("cardId").style.display = "initial";
    document.getElementById("btn-update-pr").style.opacity = 1;
  }

  updatePhoneNumber() {
    document.getElementById("show-phoneNumber").style.display = "none";
    document.getElementById("phoneNumber").style.display = "initial";
    document.getElementById("btn-update-pr").style.opacity = 1;
  }

  updateAdress() {
    document.getElementById("address").value =
      document.getElementById("ward").value +
      ", " +
      document.getElementById("district").value +
      ", " +
      document.getElementById("city").value;
  }

  showButtonUpdate() {
    document.getElementById("btn-update-pr").style.opacity = 1;
  }

  checkValueInput() {
    phoneNumber =
      document.getElementById("show-phoneNumber").style.display == "none"
        ? document.getElementById("phoneNumber").value.trim()
        : document.getElementById("show-phoneNumber").value.trim();
    cardId =
      document.getElementById("show-cardid").style.display == "none"
        ? document.getElementById("cardId").value.trim()
        : document.getElementById("show-cardid").value.trim();
    if (
      cardId.length < 1 ||
      phoneNumber.length < 1 ||
      document.getElementById("address").value.length < 1
    )
      AlertWarning("Vui lòng kiểm tra lại!");
    else if (cardId.length < 9 || cardId.length > 13)
      AlertWarning("CMND/CCCD phải từ 9-12 kí tự!");
    else if (phoneNumber.length < 9 || phoneNumber.length > 11)
      AlertWarning("Số điện thoại không hợp lệ!");
    else if (
      document.getElementById("ward").value.length == 0 &&
      document.getElementById("set-address").style.display == "block"
    )
      AlertWarning("Vui lòng nhập địa chỉ!");
    else {
      let timerInterval;
      Swal.fire({
        title: "Đang thực hiện ...",
        html: "Quá trình sẽ kết thúc sau <b></b> mili giây.",
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
      var File =
        document.getElementById("avatar").files[0] == null
          ? null
          : document.getElementById("avatar").files[0];
      const formData = new FormData();
      formData.append("Id", localStorage.getItem("Id"));
      formData.append("Email", localStorage.getItem("Email"));
      formData.append(
        "Gender",
        getGenderValue(document.getElementById("gender").value)
      );
      formData.append("CardId", cardId);
      formData.append("PhoneNumber", phoneNumber);
      formData.append("Address", document.getElementById("address").value);
      formData.append("File", File);
      console.log([...formData]);

      try {
        CheckRefreshToken();
        axios
          .put(URL + "AccountManagement/profile", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          })
          .then((res) => {
            if (res.data.code == 200) {
              Swal.fire({
                title: "Cập nhật thông tin thành công",
                icon: "success",
                buttons: true,
                dangerMode: true,
                confirmButtonText: "OK",
              }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                  window.location.href = window.location.href;
                } else {
                }
              });
            }
          });
      } catch (e) {
        console.log(e);
        AlertError(e["response"]["data"]["message"]);
      }
    }
  }

  UpdateAvatar() {
    var fileI = document.getElementById("avatar");
    if (fileI.files && fileI.files[0]) {
      var render = new FileReader();

      render.onload = function (e) {
        document.getElementById("profile-avatar-image").src = e.target.result;
      };
      render.readAsDataURL(fileI.files[0]);
    }
  }

  renderData() {
    var result = this.state.response;
    return (
      <>
        <div
          className="img-avatar"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <img id="profile-avatar-image" src={result.avatar}></img>
        </div>
        <input
          id="avatar"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          style={{ marginLeft: "40%" }}
          onClick={this.showButtonUpdate}
          onChange={() => this.UpdateAvatar()}
        />
        <br />
        <br />
        <h2 className="name-profile" data-aos="zoom-in">
          {result.lastName +
            " " +
            result.firstName +
            " (" +
            this.checkrole(result.role) +
            ")"}
        </h2>
        <br />

        <ul id="profile-ul" data-aos="flip-down">
          <li>
            Email:{" "}
            <input
              id="email"
              type=""
              value={result.email}
              style={{ width: "300px", marginLeft: "68px" }}
            />
          </li>
          <li>
            Giới tính:
            <select
              id="gender"
              style={{ width: "308px", marginLeft: "50px", height: "27px" }}
              onClick={this.showButtonUpdate}
            >
              {this.checkGender(result.gender)}
            </select>
          </li>
          <li>
            CMND/CCCD:{" "}
            <input
              id="show-cardid"
              type="text"
              value={result.cardId}
              style={{ width: "300px", marginLeft: "13px" }}
              onClick={this.updateCardId}
            />
            <input
              id="cardId"
              type="text"
              style={{ display: "none", width: "300px", marginLeft: "13px" }}
            />
          </li>
          <li>
            Số điện thoại:{" "}
            <input
              id="show-phoneNumber"
              type="text"
              value={result.phoneNumber}
              style={{ width: "300px", marginLeft: "13px" }}
              onClick={this.updatePhoneNumber}
            />
            <input
              id="phoneNumber"
              type="text"
              style={{ display: "none", width: "300px", marginLeft: "13px" }}
            />
          </li>
          <li>
            Địa chỉ:{" "}
            <input
              id="address"
              type="lable"
              value={result.address}
              style={{
                width: "300px",
                marginLeft: "58px",
                marginRight: "10px",
              }}
            />
            <i
              class="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={this.updateAddress}
            ></i>
          </li>

          <label className="set-address" id="set-address">
            <div className="row">
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  Tỉnh/thành:
                </label>
                <select
                  path="userCity"
                  id="city"
                  style={{ width: "308px", height: "30px", marginLeft: "24px" }}
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
                    width: "308px",
                    height: "30px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "24px",
                  }}
                  onClick={setWard}
                ></select>
              </div>
              <div className="form-group col-lg-4">
                <label style={{ fontSize: "15px", marginRight: "15px" }}>
                  Xã phường:
                </label>
                <input
                  id="ward"
                  type="text"
                  name="Address"
                  style={{ width: "300px", height: "23px", marginLeft: "25px" }}
                  onChange={this.updateAdress}
                />
              </div>
            </div>
          </label>
        </ul>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="main-profile" id="profile-par">
          {this.renderData()}

          <a
            className="change-pw-profile"
            href="/change-password"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Đổi mật khẩu
          </a>
          <button
            className="update-profile-btn"
            id="btn-update-pr"
            onClick={this.checkValueInput}
          >
            Cập nhật
          </button>
        </div>
      </>
    );
  }
}
