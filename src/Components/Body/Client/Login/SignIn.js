import React, { useEffect, useState } from "react";
import "./SignIn.css";
import Swal from "sweetalert2";
import "../../css/ButtonStyle.scss";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";

import AOS from "aos";
import "aos/dist/aos.css";

const SignIn = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      delay: 10,
    });
  }, []);
  const AlertWarning = (message) => {
    Swal.fire({
      title: "Lỗi",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const logIn = () => {
    fetch("https://localhost:7109/api/Account/auth/sign-in", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: document.getElementById("email-si").value.trim(),
        Password: document.getElementById("password-si").value.trim(),
      }),
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) {
          // document.cookie= "Email=" + results.data.email + "end-email";
          // document.cookie= "Token=" + results.data.token + "end-token";
          localStorage.setItem("Id", results.data.id);
          localStorage.setItem("Email", results.data.email);
          localStorage.setItem("Token", results.data.token);
          localStorage.setItem("Role", results.data.role);
          localStorage.setItem("Avatar", results.data.avatar);
          localStorage.setItem("Name", results.data.name);
          localStorage.setItem(
            "IsChangedPassword",
            results.data.isChangedPassword
          );
          localStorage.setItem("RefreshToken", results.data.refreshToken);

          window.location.href = window.location.href.slice(
            0,
            window.location.href.indexOf("/auth")
          );
        } else {
          AlertWarning(results.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        AlertWarning(error.message);
      });
  };

  const checkValue = () => {
    if (
      document.getElementById("email-si").value.trim().length < 5 ||
      document.getElementById("password-si").value.trim().length < 6
    )
      AlertWarning("Vui lòng kiểm tra lại!");
    else {
      logIn();
    }
  };

  return (
    <>
      <h1
        className="h1-title"
        style={{ fontFamily: "Dancing Script", fontSize: "42px" }}
        data-aos="fade-down"
      >
        Đăng nhập
      </h1>
      <div
        style={{ marginLeft: "41%", marginTop: " 10px" }}
        className="input-css"
      >
        <div style={{ marginBottom: "30px" }} data-aos="fade-right">
          <label>
            Email: <br />
            <input
              id="email-si"
              type="email"
              name="Email"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }} data-aos="fade-left">
          <label>
            Mật khẩu: <br />
            <input
              id="password-si"
              type="password"
              name="password"
              style={{ width: "300px" }}
            />
          </label>
        </div>
        {/* <div>
          <button id="button">Đăng nhập </button>
        </div>{" "} */}
        <div class="middle" onClick={checkValue}>
          <a class="btn btn1">Đăng nhập</a>
        </div>
        <div data-aos="fade-up">
          <FacebookLogin />
          <GoogleLogin />
          <a className="input-auth" href="/auth/forgot-password">
            Quên mật khẩu
          </a>
          <a className="input-auth input-create-acc" href="/auth/sign-up">
            Tạo tài khoản
          </a>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default SignIn;
