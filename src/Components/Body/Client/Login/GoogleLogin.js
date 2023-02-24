import React from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import HandlingLogin from "./HandlingLogin";

const GoogleLogin = () => {
  return (
    <LoginSocialGoogle
      client_id="551791801847-tcha76dusntq50kvjchg08vm41648opp.apps.googleusercontent.com"
      scope="openid profile email"
      access_type="offline"
      onResolve={(response) => {
        console.log(response.data);
        HandlingLogin(
          response.data.email,
          response.data.picture,
          response.data.given_name,
          response.data.family_name,
          response.data.sub,
          response.data.sub.slice(0, 10)
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
        <GoogleLoginButton text="Đăng nhập với Google" />
      </div>
    </LoginSocialGoogle>
  );
};

export default GoogleLogin;
