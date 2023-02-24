import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../../Utils/Url";
import { AlertWarning } from "../../../Alert/Warning";
import { AlertOk } from "../../../Alert/AlertOk";
import { AlertError } from "../../../Alert/Error";
import "../../Home.css";
import "../RoomDetail/Room.css";
import CheckRefreshToken from "../../../../Utils/CheckRefreshToken";

const Comment = () => {
  const [flag, setFlag] = useState(false);
  const { id } = useParams();

  const GetPermission = () => {
    let api = URL + "Comment/permission";
    let data = {
      RoomId: id,
      UserId: localStorage.getItem("Id"),
    };
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
        if (res.code == 200) {
          setFlag(res.data);
        } else AlertError(res.message);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    GetPermission();
  }, []);

  const SaveComment = () => {
    let api = URL + "Comment/comment";
    let data = {
      RoomId: id,
      AccountId: localStorage.getItem("Id"),
      Content: document.getElementById("comt-content").value.trim(),
      Incognito: document.getElementById("incognito").checked,
      ParentId: 0,
    };
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
          // ---------------------------------
          window.location.href = window.location.href;
        } else AlertError(res.message);
      })
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
      });
  };

  const CheckComment = () => {
    var content = document.getElementById("comt-content").value.trim();
    if (content.length == 0) AlertWarning("Vui lòng nhập nội dung!");
    else SaveComment();
  };

  return (
    <>
      {localStorage.getItem("Role") == "ADMIN" ||
      localStorage.getItem("Role") == "STAFF" ? (
        <></>
      ) : (
        <>
          {flag == false ? (
            <>
              <p style={{ textAlign: "center", marginBottom: "50px" }}>
                <i>Bạn chỉ được đánh giá khi thanh toán hóa đơn thành công!</i>
              </p>
            </>
          ) : (
            <>
              <div>
                <div>Nhận xét của bạn *</div>
                <textarea id="comt-content"></textarea>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    marginBottom: "50px",
                  }}
                >
                  Ẩn thông tin của bạn?{" "}
                  <input
                    id="incognito"
                    type="checkbox"
                    style={{
                      width: "20px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    className="cmt-btn"
                    type="button"
                    value="Đánh giá"
                    onClick={() => CheckComment()}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Comment;
