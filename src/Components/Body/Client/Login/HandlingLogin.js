import React from "react";
import { URL } from "../../../../Utils/Url";
import { AlertWarning } from "../../../Alert/Warning";
import { AlertError } from "../../../Alert/Error";
import { AlertOk } from "../../../Alert/AlertOk";

const HandlingLogin = (email, avatar, firstname, lastname, userId, code) => {
  fetch(URL + "Account/auth/sign-in/social", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      File: null,
      Email: email,
      Password: userId,
      FirstName: firstname,
      LastName: lastname,
      Gender: 1,
      CardId: code,
      PhoneNumber: code,
      Address: null,
      Avartar: avatar,
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

        window.location.href = "/";
      } else {
        AlertWarning(results.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      AlertError(error);
    });
};

export default HandlingLogin;
