import { URL } from "./Url";

const GetRefreshToken = async () => {
  console.log("Refreshing the token ...");
  localStorage.setItem("IsPending", true);
  let api = URL + "Account/auth/refresh-token";
  await fetch(api, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("RefreshToken"),
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status == 403) {
        localStorage.removeItem("Token");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("Role");
        localStorage.removeItem("Name");
        localStorage.removeItem("Email");
        localStorage.removeItem("Avatar");
        localStorage.removeItem("Id");
        window.location.href =
          window.location.href.slice(
            0,
            window.location.href.indexOf("localhost") + 14
          ) + "/auth/sign-in";
      } else return res.json();
    })
    .then((results) => {
      localStorage.setItem("Token", results.data.token);
      localStorage.setItem("RefreshToken", results.data.refreshToken);
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
  localStorage.setItem("IsPending", false);
};

export const Pending = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Pending ...");
    }, 3000);
  });
};

export default GetRefreshToken;
