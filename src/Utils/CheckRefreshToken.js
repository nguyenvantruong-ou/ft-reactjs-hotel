import GetRefreshToken, { Pending } from "./RefreshToken";
import jwt_decode from "jwt-decode";

const CheckRefreshToken = async () => {
  const decoded = jwt_decode(localStorage.getItem("Token"));
  const currentTime = Date.now() / 1000;

  if (
    decoded.exp < currentTime &&
    localStorage.getItem("IsPending") == "false"
  ) {
    // alert("Fresher token !!!");
    await GetRefreshToken();
  }
  //   else if (localStorage.getItem("IsPending") == "true") {
  //     Pending();
  //   }
};

export default CheckRefreshToken;
