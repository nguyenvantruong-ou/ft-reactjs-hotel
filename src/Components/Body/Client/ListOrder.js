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
import CheckRefreshToken from "../../../Utils/CheckRefreshToken";

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
    CheckRefreshToken();
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
      title: "H???y ????n",
      text: "B???n mu???n h???y ????n ?",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonText: "?????ng ??",
      cancelButtonText: "H???y",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        CheckRefreshToken();
        fetch(URL + "Order/order/" + orderId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.code == 200) {
              AlertOk("H???y ????n th??nh c??ng");
              GetData();
            }
          })
          .catch((error) => {
            console.error(error);
            AlertWarning("Vui l??ng ki???m tra l???i!");
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
    CheckRefreshToken();
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
        if (res.code == 200) {
          SendSMS();
          Swal.fire({
            title: "Thanh to??n ho??n t???t",
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
      title: "Chi ph?? ph??t sinh",
      icon: "question",
      html: '<input id="cost-incurred" placeholder="0 VN??" text="text" style={{width: "100px"}} />',
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonText: "?????ng ??",
      cancelButtonText: "H???y",
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

  var index = 0;
  const ReanderData = () => {
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
                ? "???? thanh to??n"
                : s.status == false
                ? "???? h???y"
                : "Ch??a thanh to??n"}
            </td>
            {s.status != false && s.isPay != true ? (
              <>
                <td>
                  <input
                    type="button"
                    value="H???y"
                    className="btn-cancel-list-order"
                    onClick={() => CancleOrder(s.id)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Thanh to??n"
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
                    value="H???y"
                    className="btn-cancel-list-order-dis"
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Thanh to??n"
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        H??a ????n
      </h1>

      <div className="table-order-staff ">
        {" "}
        <div style={{ marginLeft: "0%", marginBottom: "30px" }}>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>T??m ki???m:</span>
          <input
            id="search-by-phone-number"
            type="text"
            style={{
              width: "200px",
              height: "25px",
              marginLeft: "5px",
              paddingLeft: "10px",
            }}
            onChange={() => GetData()}
          />
        </div>
        <table className="table-room">
          <thead>
            <tr>
              <th>STT</th>
              <th>H??? v?? t??n</th>
              <th>S??? ??i???n tho???i</th>
              <th>S??? ng?????i</th>
              <th>T???ng ti???n</th>
              <th>Ng??y nh???n ph??ng</th>
              <th>Ng??y tr??? ph??ng</th>
              <th>Ng??y t???o</th>
              <th>Tr???ng th??i</th>
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
