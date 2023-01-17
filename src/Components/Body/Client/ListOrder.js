import { getDefaultNormalizer } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [maxPage, setMaxPage] = useState();
  var page = 1;

  const GetData = () => {
    let api =
      URL +
      "Order/staff/orders?phoneNumber=" +
      document.getElementById("search-by-phone-number").value +
      "&Page=" +
      page +
      "&PageSize=15";
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setOrders(results.data);
        setMaxPage(parseInt(results.message));
        console.log(results);
      })
      .catch((error) => console.log("error", error));
  };

  const ChangePage = (element) => {
    var p = document.querySelectorAll("#page-acc");
    for (var i = 0; i < p.length; i++) {
      p[i].style.backgroundColor = "#c4c4c4";
      p[i].style.color = "black";
    }

    page = parseInt(element.className.slice(element.className.length - 1));
    element.style.backgroundColor = "green";
    element.style.color = "white";
    GetData();
  };

  const PageButton = () => {
    var a = [];
    for (var i = 1; i <= maxPage; i++) a[i - 1] = i;
    return a.map((s) => {
      return (
        <>
          {s == 1 ? (
            <span
              id="page-acc"
              className={"page-account" + s}
              value={s}
              onClick={() =>
                ChangePage(
                  document.getElementsByClassName("page-account" + s)[0]
                )
              }
              style={{
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {s}
            </span>
          ) : (
            <span
              id="page-acc"
              className={"page-account" + s}
              value={s}
              onClick={() =>
                ChangePage(
                  document.getElementsByClassName("page-account" + s)[0]
                )
              }
              style={{
                cursor: "pointer",
              }}
            >
              {s}
            </span>
          )}
        </>
      );
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const CancleOrder = (orderId) => {
    Swal.fire({
      title: "Hủy đơn",
      text: "Bạn muốn hủy đơn ?",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        fetch(URL + "Order/order/" + orderId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.code == 200) {
              AlertOk("Hủy đơn thành công");
              GetData();
            }
          })
          .catch((error) => {
            console.error(error);
            AlertWarning("Vui lòng kiểm tra lại!");
          });
      } else {
      }
    });
  };

  const format = (n) => {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  };

  const SendSMS = () => {
    fetch(URL + "Payment/payment-successful", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ PhoneNumber: "+84356371760" }),
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
      });
  };

  const Payment = (orderId, totalmoney, incurred) => {
    let api = URL + "Payment/payment-by-cash";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify({
        Id: orderId,
        StaffId: localStorage.getItem("Id"),
        CostIncurred: incurred,
        TotalMoneyInOrder: totalmoney,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        SendSMS();
        if (res.code == 200) {
          Swal.fire({
            title: "Thanh toán hoàn tất",
            width: 600,
            padding: "3em",
            color: "#716add",
            background:
              "#fff url(https://sweetalert2.github.io/images/trees.png)",
            backdrop: `
                    rgba(0,0,123,0.4)
                    url("https://sweetalert2.github.io/images/nyan-cat.gif")
                    left top
                    no-repeat
                  `,
          });
          GetData();
        } else AlertError(res.message);
      })
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
      });
  };

  const PaymentModal = (orderId, totalmoney) => {
    Swal.fire({
      title: "Chi phí phát sinh",
      icon: "question",
      html: '<input id="cost-incurred" placeholder="0 VNĐ" text="text" style={{width: "100px"}} />',
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        Payment(
          orderId,
          totalmoney,
          document.getElementById("cost-incurred").value.trim().length == 0
            ? 0
            : document.getElementById("cost-incurred").value
        );
      } else {
      }
    });
  };

  const ReanderData = () => {
    var index = 0;
    return orders.map((s) => {
      index++;
      return (
        <>
          <tr>
            <td>{index}</td>
            <td>{s.username}</td>
            <td>{s.phoneNumber}</td>
            <td>{s.amountOfPeople}</td>
            <td style={{ color: "#db0000", fontWeight: "600" }}>
              {format(s.totalAmount)}
            </td>
            <td>{s.startDate.slice(0, 10)}</td>
            <td>{s.endDate.slice(0, 10)}</td>
            <td>{s.dateCreated.slice(0, 10)}</td>
            <td>
              {s.isPay == true
                ? "Đã thanh toán"
                : s.status == false
                ? "Đã hủy"
                : "Chưa thanh toán"}
            </td>
            {s.status != false && s.isPay != true ? (
              <>
                <td>
                  <input
                    type="button"
                    value="Hủy"
                    className="btn-cancel-list-order"
                    onClick={() => CancleOrder(s.id)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Thanh toán"
                    className="btn-payment-list-order"
                    onClick={() => PaymentModal(s.id, s.totalAmount)}
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    disabled
                    type="button"
                    value="Hủy"
                    className="btn-cancel-list-order-dis"
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Thanh toán"
                    className="btn-payment-list-order-dis"
                  />
                </td>
              </>
            )}
          </tr>
        </>
      );
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Hóa đơn</h1>

      <div className="table-order-staff ">
        {" "}
        <div style={{ marginLeft: "5%", marginBottom: "30px" }}>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            Số điện thoại:{" "}
          </span>
          <input
            id="search-by-phone-number"
            type="text"
            style={{ width: "200px", height: "25px", marginLeft: "5px" }}
            onChange={() => GetData()}
          />
        </div>
        <table className="table-room">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Số người</th>
              <th>Tổng tiền</th>
              <th>Ngày nhận phòng</th>
              <th>Ngày trả phòng</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ReanderData()}</tbody>
        </table>
      </div>
      <div className="page-button">{PageButton()}</div>
    </>
  );
};

export default ListOrder;
