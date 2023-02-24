import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AlertError = (message) => {
  Swal.fire({
    title: "Lỗi",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

const showAlertSuccess = (message) => {
  Swal.fire({
    title: "",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

const ConfirmCode = () => {
  showAlertSuccess("Đã gửi mã xác nhận qua email");
  const CheckCode = () => {
    var cookie = document.cookie;
    var email = cookie.slice(
      cookie.indexOf("Email=") + 6,
      cookie.indexOf("end-email")
    );
    fetch("https://localhost:7109/api/Account/auth/confirm", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Code: GetCode(), Email: email }),
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) {
          window.location.href = "/auth/sign-in";
        } else {
          AlertError(results.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const SendCode = () => {
    var cookie = document.cookie;
    var email = cookie.slice(
      cookie.indexOf("Email=") + 6,
      cookie.indexOf("end-email")
    );

    fetch("https://localhost:7109/api/Account/auth/code", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email }),
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) {
          showAlertSuccess("Đã gửi mã xác nhận qua email " + email);
          document.getElementById("code1").value = "";
          document.getElementById("code2").value = "";
          document.getElementById("code3").value = "";
          document.getElementById("code4").value = "";
          document.getElementById("code5").value = "";
          document.getElementById("code6").value = "";
        } else {
          AlertError(results.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const GetCode = () => {
    var code1 = document.getElementById("code1").value;
    var code2 = document.getElementById("code2").value;
    var code3 = document.getElementById("code3").value;
    var code4 = document.getElementById("code4").value;
    var code5 = document.getElementById("code5").value;
    var code6 = document.getElementById("code6").value;
    var code = parseInt(code1 + code2 + code3 + code4 + code5 + code6);
    return code;
  };

  const focusInput = (index) => {
    if (document.getElementById("code" + index).value.length == 1)
      document.getElementById("code" + (index + 1)).focus();
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
          marginBottom: "50px",
        }}
      >
        Xác nhận
      </h1>
      <input
        id="code1"
        type="text"
        maxLength="1"
        className="confirm-input"
        style={{
          marginLeft: "36.6%",
        }}
        onChange={() => focusInput(1)}
      />
      <input
        id="code2"
        type="text"
        maxLength="1"
        className="confirm-input"
        onChange={() => focusInput(2)}
      />
      <input
        id="code3"
        type="text"
        maxLength="1"
        className="confirm-input"
        onChange={() => focusInput(3)}
      />
      <input
        id="code4"
        type="text"
        maxLength="1"
        className="confirm-input"
        onChange={() => focusInput(4)}
      />
      <input
        id="code5"
        type="text"
        maxLength="1"
        className="confirm-input"
        onChange={() => focusInput(5)}
      />
      <input id="code6" type="text" maxLength="1" className="confirm-input" />
      <input
        type="button"
        style={{
          marginLeft: "36.6%",
          color: "blue",
          marginTop: "30px",
          height: "35px",
          cursor: "pointer",
        }}
        value="Gửi lại mã"
        onClick={SendCode}
      />
      <input
        type="button"
        value="Gửi"
        style={{
          backgroundColor: "#1bc31b",
          marginLeft: "307px",
          width: "60px",
          height: " 35px",
          borderColor: "green",
          cursor: "pointer",
        }}
        onClick={CheckCode}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ConfirmCode;

// try {
//   const results =   axios.post("https://localhost:7109/api/Account/auth/confirm", {Code: GetCode(), Email: email});
//   console.log( results.response);

// } catch (e) {
//     // console.log(e)
//     console.log( e.response);
//     alert(e['response']['data']['message']);
// }
