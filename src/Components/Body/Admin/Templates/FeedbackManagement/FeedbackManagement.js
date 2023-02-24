import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertError } from "../../../../Alert/Error";
import { AlertWarning } from "../../../../Alert/Warning";
import "./FeedbackManagement.css";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";

const FeedbackManagement = () => {
  const [user, setUser] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const getDataGeneral = () => {
    setTimeout(getDataGeneral, 500);
    let api =
      URL +
      "Feedback/feeback-general?kw=" +
      document.getElementById("search-user-fb").value;
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getDataGeneral();
  }, []);

  const getFeedback = (userId, name, avatar) => {
    setName(name);
    setAvatar(avatar);
    let api = URL + "Feedback/feedback/" + userId;
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFeedback(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  const FeedbackGeneral = () => {
    return user.map((s) => {
      return (
        <>
          <div
            className="item-user-feedback"
            onClick={() => getFeedback(s.userId, s.userName, s.avatar)}
          >
            <div className="avatar-feedback">
              <img src={s.avatar} />
            </div>
            <div className="info-general-feedback">
              <div>
                <div>
                  {s.userName.length > 20
                    ? s.userName.slice(0, 15) + "..."
                    : s.userName}
                </div>
                <div>
                  <spna>{s.time}</spna>
                </div>
              </div>
              <div>
                <div>{s.contentFeedback.slice(0, 23) + "..."}</div>
                {s.amountUnread > 0 ? (
                  <>
                    <div className="amount-user-fb">{s.amountUnread}</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const getStatusFeedback = (status) => {
    if (status == 1) return "Rất tệ";
    if (status == 2) return "Không hài lòng";
    if (status == 3) return "Tạm";
    if (status == 4) return "Tốt";
    else return "Quá tuyệt vời";
  };

  const renderContent = () => {
    return feedback.map((s) => {
      return (
        <>
          <div className="main-content-feedback">
            <p>
              <span className="title-feedback">Ngày gửi:</span>{" "}
              {s.dateCreated.slice(0, 10)}
            </p>
            <p>
              <span className="title-feedback">Phản ánh về:</span>{" "}
              {s.content.slice(0, s.content.indexOf(": "))}
            </p>
            <p>
              <span className="title-feedback">Mức độ hài lòng:</span>{" "}
              {getStatusFeedback(s.rating)}
            </p>
            <p>
              <span className="title-feedback">Nội dung: </span>
              {s.content.slice(s.content.indexOf(": ") + 2, s.content.length)}
            </p>
          </div>
        </>
      );
    });
  };

  const ContentFeedfback = () => {
    if (feedback.length == 0)
      return (
        <>
          <div
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginTop: "30%",
            }}
          >
            Không thể xóa những phản hồi của khách hàng!
          </div>
        </>
      );
    return (
      <>
        <div className="header-content-feedback">
          <div>
            <img src={avatar} />
          </div>
          <div>{name}</div>
        </div>
        <div>{renderContent()}</div>
      </>
    );
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        Phản hồi
      </h1>
      <div className="main-feedback-management">
        <div className="user-feedback">
          <div className="search-user">
            <input
              id="search-user-fb"
              type="text"
              placeholder="Tìm kiếm theo tên"
            />
          </div>
          <div className="general-feedback">{FeedbackGeneral()}</div>
        </div>
        <div className="content-feedback-ad">{ContentFeedfback()}</div>
      </div>
    </>
  );
};

export default FeedbackManagement;
