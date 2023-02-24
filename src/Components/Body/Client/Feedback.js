import React, { useEffect, useState } from "react";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import Swal from "sweetalert2";
import "../css/General.css";
import CheckRefreshToken from "../../../Utils/CheckRefreshToken";

const Feedback = () => {
  const [code, setCode] = useState("");
  const [star, setStar] = useState(0);

  const setCaptcha = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    setCode(text);
    document.getElementById("captcha-text").value = "";
    document.getElementsByClassName("captcha-code")[0].innerHTML = text;
  };

  useEffect(() => {
    setCaptcha();
  }, []);

  const checkCaptcha = () => {
    var text = document.getElementById("captcha-text").value.trim();
    if (text.length == 6) {
      if (text == code) {
        document.getElementsByClassName("feedback-btn")[0].style.opacity = 1;
        document.getElementById("captcha-text").disabled = true;
        document.getElementById("no-captcha").style.display = "none";
        document.getElementById("captcha-text").style.border =
          "1px solid black";
        document.getElementById("refresh-captcha").style.display = "none";
      } else {
        document.getElementById("no-captcha").style.display = "initial";
        document.getElementById("captcha-text").style.border = "1px solid red";
      }
    }
  };

  const setRating = (id) => {
    setStar(id);
    var ratings = document.getElementsByClassName("icon-rating-feedback");
    for (var i = 0; i < 5; i++) ratings[i].style.color = "black";
    ratings[id - 1].style.color = "#ff6e29";

    switch (id) {
      case 1:
        document.getElementById("text-rating").innerHTML = "Rất tệ";
        break;
      case 2:
        document.getElementById("text-rating").innerHTML = "Không hài lòng";
        break;
      case 3:
        document.getElementById("text-rating").innerHTML = "Tạm";
        break;
      case 4:
        document.getElementById("text-rating").innerHTML = "Tốt";
        break;
      case 5:
        document.getElementById("text-rating").innerHTML = "Quá tuyệt vời";
        break;
    }
  };

  const getTypeFeedback = () => {
    var types = document.getElementsByClassName("checkbox-type-feedback");
    var result = "";
    for (var i = 0; i < 4; i++)
      if (types[i].checked == true) {
        if (result != "") {
          result += ", " + types[i].name.toLowerCase();
        } else result += types[i].name;
      }
    if (document.getElementById("other-type-feedback").value.trim() != "")
      result +=
        ", " +
        document
          .getElementById("other-type-feedback")
          .value.trim()
          .toLowerCase();
    return result;
  };

  const sendFeedback = () => {
    var content = document.getElementById("content-text-feedback").value.trim();
    var type = getTypeFeedback();

    if (content.length < 1 || type.length < 1 || star == 0)
      AlertWarning("Vui lòng kiểm tra lại!");
    else {
      var data = {
        Content: type + ": " + content,
        UserId: localStorage.getItem("Id"),
        Rating: star,
      };

      console.log(data);
      let api = URL + "Feedback/feedback";
      CheckRefreshToken();
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            Swal.fire({
              title: "Thành công",
              text: "Cảm ơn bạn đã đóng góp ý kiến. Trân trọng",
              icon: "success",
              buttons: true,
              dangerMode: true,
              confirmButtonText: "Đồng ý",
            }).then((willDelete) => {
              if (willDelete.isConfirmed) {
                window.location.href = "/";
              } else {
              }
            });
          }
        })
        .catch((error) => {
          AlertError(error.message);
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <div className="main-feedback">
        <div className="header-feedback">
          <div
            style={{
              fontFamily: "Dancing Script",
              fontSize: "42px",
            }}
          >
            Phản hồi
          </div>
          <div style={{ width: "60px", height: "60px" }}>
            <img src="../../../logo.png" />
          </div>
        </div>
        <hr style={{ color: "lightgray" }} /> <br />
        <i>Chúng tôi sẽ ghi nhận những ý kiến đóng góp của bạn!</i>
        <div className="rating-feedback">
          <h3>
            Mức độ hài lòng của bạn: <span style={{ color: "red" }}>*</span>{" "}
            <span
              id="text-rating"
              style={{
                marginLeft: "30px",
                fontSize: "17px",
                fontWeight: "600",
                fontStyle: "italic",
                color: "#8d2525",
              }}
            ></span>
          </h3>
          <div className="rating-icon">
            <svg
              onClick={() => setRating(1)}
              xmlns="http://www.w3.org/2000/svg"
              width="12%"
              height="100%"
              fill="currentColor"
              class="bi bi-emoji-angry icon-rating-feedback"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z" />
            </svg>{" "}
            <svg
              onClick={() => setRating(2)}
              xmlns="http://www.w3.org/2000/svg"
              width="12%"
              height="100%"
              fill="currentColor"
              class="bi bi-emoji-frown icon-rating-feedback"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            <svg
              onClick={() => setRating(3)}
              xmlns="http://www.w3.org/2000/svg"
              width="12%"
              height="100%"
              fill="currentColor"
              class="bi bi-emoji-neutral icon-rating-feedback"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
            </svg>
            <svg
              onClick={() => setRating(4)}
              xmlns="http://www.w3.org/2000/svg"
              width="12%"
              height="100%"
              fill="currentColor"
              class="bi bi-emoji-smile icon-rating-feedback"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            <svg
              onClick={() => setRating(5)}
              xmlns="http://www.w3.org/2000/svg"
              width="12%"
              height="100%"
              fill="currentColor"
              class="bi bi-emoji-heart-eyes icon-rating-feedback"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z" />
            </svg>
          </div>
        </div>
        <div className="type-feedback">
          <h3>
            Bạn muốn đóng góp về: <span style={{ color: "red" }}>*</span>
          </h3>
          <div>
            <input
              className="checkbox-type-feedback"
              type="checkbox"
              style={{ width: "30px" }}
              name="Phòng ở"
            />
            Phòng ở
          </div>
          <div>
            <input
              className="checkbox-type-feedback"
              type="checkbox"
              style={{ width: "30px" }}
              name="Dịch vụ"
            />
            Dịch vụ
          </div>
          <div>
            <input
              className="checkbox-type-feedback"
              type="checkbox"
              style={{ width: "30px" }}
              name="Nhân viên"
            />
            Nhân viên
          </div>
          <div>
            <input
              className="checkbox-type-feedback"
              type="checkbox"
              style={{ width: "30px" }}
              name="Website"
            />
            Website
          </div>
          <div>
            <i style={{ marginRight: "10px", fontWeight: "600" }}>Khác:</i>
            <input
              id="other-type-feedback"
              type="text"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <div className="content-feedback">
          <h3>
            Nội dung phản hồi: <span style={{ color: "red" }}>*</span>
          </h3>
          <textarea id="content-text-feedback"></textarea>
        </div>
        <div className="captcha-feedback">
          <div className="captcha-code"></div>
          <div
            style={{ fontSize: "22px", marginLeft: "10px", marginTop: "5px" }}
          >
            <i
              id="refresh-captcha"
              class="fa fa-refresh"
              aria-hidden="true"
              onClick={() => setCaptcha()}
            ></i>
          </div>
        </div>
        <div style={{ textAlign: "left", margin: "10px 100px" }}>
          <input
            id="captcha-text"
            type="text"
            style={{
              width: "120px",
              height: "27px",
              padding: "5px",
              fontSize: "18px",
            }}
            placeholder="Bạn thấy gì?"
            onChange={() => checkCaptcha()}
          />
          <i
            id="no-captcha"
            class="fa fa-exclamation-triangle"
            aria-hidden="true"
            style={{ marginLeft: "12px", color: "red", display: "none" }}
          ></i>
        </div>
        <div className="feedback-btn">
          <input type="button" value="Gửi" onClick={() => sendFeedback()} />
        </div>
      </div>
    </>
  );
};

export default Feedback;
