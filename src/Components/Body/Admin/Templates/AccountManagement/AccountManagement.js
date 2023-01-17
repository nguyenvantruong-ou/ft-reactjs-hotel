import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";

const AccountManagement = () => {
  const [account, setAccount] = useState([]);
  const [max, setMax] = useState();
  const [kw, setKw] = useState("");
  const query = new URLSearchParams(window.location.search);
  const GetDataAccount = (kw_t) => {
    let api =
      URL +
      "AccountManagement/accounts?Kw=" +
      kw_t +
      "&Page=" +
      query.get("Page") +
      "&PageSize=10";

    console.log(
      "🚀 ~ file: AccountManagement.js:18 ~ useEffect ~ setKw",
      kw == "" ? "null" : "k"
    );
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAccount(res.data.data);
        setMax(res.data.pageMax);
        console.log(res.data.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetDataAccount("");
    document.getElementById("kw-acc-management").value = query.get("Kw");
    setKw(query.get("Kw"));
  }, []);

  const Paging = () => {
    var page = ``;
    for (var i = 1; i <= max; i++) {
      page += `<a id="page-acc" class="page-account${i}"   href=${
        "account-management?Kw=" + kw + "&Page=" + i
      }>${i}</a>`;
    }

    if (document.getElementById("paging-acc") !== null) {
      var a = document.querySelectorAll("#page-acc");
      for (var i = 0; i < a.length; i++) a[i].remove();
      document
        .getElementById("paging-acc")
        .insertAdjacentHTML("beforeend", page);

      var pageChecked = document.getElementsByClassName(
        "page-account" + query.get("Page")
      );
      //   console.log(pageChecked.length);
      if (pageChecked.length > 0) {
        pageChecked[0].style.backgroundColor = "green";
        pageChecked[0].style.color = "white";
      }
    }
  };

  const SetKw = () => {
    setKw(
      document.getElementById("kw-acc-management").value.length == 0
        ? ""
        : document.getElementById("kw-acc-management").value
    );
    GetDataAccount(document.getElementById("kw-acc-management").value);
  };

  const DeleteAccount = (accountId) => {
    fetch(URL + "AccountManagement/account/" + accountId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.code == 200) {
          AlertOk(res.message);
          GetDataAccount(document.getElementById("kw-acc-management").value);
        }
      })
      .catch((error) => {
        console.error(error);
        AlertWarning("Vui lòng kiểm tra lại!");
      });
  };

  const renderData = () => {
    return account.map((s) => {
      return (
        <tr>
          <td>{s.email}</td>
          <td>{s.lastName + " " + s.firstName}</td>
          <td>
            {s.role == "ADMIN"
              ? "Quản trị viên"
              : s.role == "STAFF"
              ? "Nhân Viên"
              : "Người dùng"}
          </td>
          <td>{s.gender}</td>
          <td>{s.cardId}</td>
          <td>{s.phoneNumber}</td>
          <td>{s.address != null ? s.address.slice(0, 20) + "..." : ""}</td>
          <td>
            <input type="checkbox" checked={s.status} />
          </td>
          <td>{s.dateCreated.slice(0, 10)}</td>
          <td>
            {s.role == "ADMIN" ? (
              <button disabled>
                <a>Sửa</a>
              </button>
            ) : (
              <button className="update-btn-room">
                <a href={"account-management/" + s.id + "/" + s.cardId.trim()}>
                  Sửa
                </a>
              </button>
            )}
          </td>
          <td>
            {s.role == "ADMIN" ? (
              <button disabled>Xóa</button>
            ) : s.status == true ? (
              <button
                className="delete-btn-room"
                onClick={() => DeleteAccount(s.id)}
              >
                Xóa
              </button>
            ) : (
              <button disabled style={{ color: "white" }}>
                Xóa
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Quản lý tài khoản
      </h1>
      <div className="search-room">
        <span>Tìm kiếm:</span>
        <input id="kw-acc-management" type="text" onChange={() => SetKw()} />

        <a href="/admin/account-management/create">
          Thêm nhân viên <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        </a>
      </div>
      <div className="main-room">
        <table className="table-room" style={{ marginBottom: "-100px " }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Quyền</th>
              <th>Giới tính</th>
              <th>CMND/CCCD</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
      </div>
      <div id="paging-acc">{Paging()}</div>
    </>
  );
};

export default AccountManagement;
