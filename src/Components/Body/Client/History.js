import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import Swal from "sweetalert2";
import "../css/General.css";

const History = () => {
  const [data, setData] = useState([]);

  const GetData = () => {
    let api = URL + "History/history/" + localStorage.getItem("Id");
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setData(results.data);
        console.log(results.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetData();
  }, []);

  const format = (n) => {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  };

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

  const Payment = (total) => {
    let api = "http://localhost:2023/payment-momo";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalMoney: total, url: "adhudhfurhfuhdf" }),
    })
      .then((response) => response.json())
      .then((res) => {
        window.open(res.data.payUrl, "_blank");
      })
      .catch((error) => {
        console.error(error);
        AlertWarning("Vui lòng kiểm tra lại!");
      });
  };

  const Renderdata = () => {
    if (data.length == 0)
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "200px",
            marginBottom: "300px",
          }}
        >
          <i>Bạn chưa có hóa đơn nào!</i>
        </div>
      );
    else
      return data.map((s) => {
        return (
          <div
            style={{
              width: "88%",
              marginLeft: "10%",
              margin: "30px 50px",
              padding: "15px",
              paddingBottom: "50px",
              border: "1px solid lightgray",
            }}
          >
            <div
              style={{
                width: "95%",
                height: "50px",
                padding: "15px",
                border: "1px solid lightgray",
                color: "rgb(112 112 112)",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>Họ và tên: {s.username}</div>
                <div style={{ marginLeft: "30px" }}>
                  Số người: {s.amountOfPeople} người
                </div>
                <div style={{ marginLeft: "30px" }}>
                  Tổng tiền:
                  <span style={{ color: "red", fontWeight: "600" }}>
                    {" "}
                    {format(s.totalMoney)}
                  </span>{" "}
                  VNĐ
                </div>
                <div style={{ marginLeft: "30px" }}>
                  Ngày đặt: {s.dateCreated.slice(0, 10)}
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <div>
                    Từ:{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {s.startDate.slice(0, 10)}
                    </span>
                  </div>
                  <div>Đến: {s.endDate.slice(0, 10)}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  {s.status == false ? (
                    <>
                      <input
                        type="button"
                        value="Đã hủy"
                        disabled
                        style={{
                          width: "100px",
                          height: "30px",
                          color: "#7e7e7e",
                          backgroundColor: "rgb(251 193 193)",
                          border: "1px solid rgb(251 82 82))",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {s.isPay == true ? (
                        <>
                          <input
                            type="button"
                            value="Thanh toán"
                            disabled
                            style={{
                              width: "100px",
                              height: "30px",
                              color: "white",
                              backgroundColor: "rgb(171 171 171)",
                              border: "1px solid rgb(171 171 171)",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="button"
                            value="Hủy"
                            className="btn-cancel-order"
                            onClick={() => CancleOrder(s.id)}
                          />
                          <input
                            type="button"
                            value="Thanh toán"
                            className="btn-payment-order"
                            onClick={() => Payment(s.totalMoney)}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "80%",
                marginLeft: "5%",
                padding: "15px",
                marginTop: "30px",
                color: "rgb(112 112 112)",
              }}
            >
              {s.listRooms.map((v) => {
                return (
                  <>
                    <div
                      style={{
                        borderTop: "1px solid lightgray",
                        display: "flex",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          height: "110px",
                        }}
                      >
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={v.image}
                        />
                      </div>

                      <div
                        style={{
                          paddingLeft: "25px",
                          fontSize: "18px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "600",
                            fontFamily: "cursive",
                            marginTop: "10px",
                          }}
                        >
                          {v.roomName}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          Diện tích: {v.acreage}
                        </div>
                        <div>Loại giường: {v.typeBed}</div>
                      </div>
                    </div>
                  </>
                );
              })}
              {s.listServices.map((t) => {
                return (
                  <>
                    <div
                      style={{
                        borderTop: "1px solid lightgray",
                        display: "flex",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          height: "110px",
                        }}
                      >
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={t.image}
                        />
                      </div>

                      <div
                        style={{
                          paddingLeft: "25px",
                          fontSize: "18px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            color: "black",
                            fontWeight: "600",
                            fontFamily: "cursive",
                            marginTop: "10px",
                          }}
                        >
                          {t.name}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          Giá: {format(t.price)} VNĐ
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      });
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Lịch sử</h1>
      <div className="main-history">{Renderdata()}</div>
    </>
  );
};

export default History;
