import React from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import HandlingLogin from "./HandlingLogin";

const FacebookLogin = () => {
  return (
    <LoginSocialFacebook
      appId="728607272206931"
      onResolve={(response) => {
        console.log(response.data);
        HandlingLogin(
          response.data.email,
          null,
          response.data.first_name,
          response.data.last_name,
          response.data.userID.toString(),
          response.data.data_access_expiration_time.toString()
        );
      }}
      onReject={(error) => {
        console.log(error);
      }}
    >
      <div
        style={{
          width: "334px",
          marginLeft: "-5px",
          marginBottom: "30px",
        }}
      >
        <FacebookLoginButton text="Đăng nhập với Facebook" />
      </div>
    </LoginSocialFacebook>
  );
};

export default FacebookLogin;
