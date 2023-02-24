import React from "react";

const Remind = () => {
  const close = () => {
    localStorage.setItem("IsChangedPassword", true);
    document.getElementById("remind-change-pw").style.display = "none";
  };
  if (
    localStorage.getItem("IsChangedPassword") == "false" &&
    localStorage.getItem("Id") > 0
  ) {
    return (
      <>
        <div
          id="remind-change-pw"
          style={{
            width: "240px",
            height: "70px",
            backgroundColor: "rgb(247 216 215 / 53%)",
            position: "fixed",
            right: "20px",
            top: "55px",
            zIndex: "10000",
            borderLeft: "3px solid red",
            padding: " 5px 10px",
            display: "flex",
          }}
        >
          <div>
            <i
              class="fa fa-exclamation-triangle"
              aria-hidden="true"
              style={{ fontSize: "58px", color: "#e15c5c", marginTop: "10px" }}
            ></i>
          </div>
          <div>
            <div
              style={{
                textAlign: "right",
                cursor: "pointer",
                fontSize: "20px",
                marginLeft: "167px",
              }}
              onClick={close}
            >
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <p
              style={{
                fontSize: "13px",
                marginTop: "-3px",
                marginLeft: "7px",
              }}
            >
              Vui lòng thay đổi mật khẩu!
            </p>
            <div
              style={{
                fontSize: "13px",
                marginLeft: "89px",
                marginTop: "-10px",
              }}
            >
              <a
                href="/change-password"
                style={{ color: "blue" }}
                onClick={close}
              >
                Đổi mật khẩu
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Remind;
