import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import Swal from "sweetalert2";
import "../css/General.css";
import CheckRefreshToken from "../../../Utils/CheckRefreshToken";

// paypal
import axios from "axios";
const clientId =
  "AQ-2GZEt7QTO8Udw2-dupOowuXzz-vRhBhroeC1oOQYZV70EuJwDSm8oR0GpIbEg-sF9VPfquOFgcfKa";
const secret =
  "EF4EsEvpmr3leQ_yGw8kVU4XyXnl6T9slSYJTrTicTQCj5Pg43oWITS1y29jhrrDmj5U5ogV3Zl2NX7T";
const auth = btoa(`${clientId}:${secret}`);

const History = () => {
  const [data, setData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [params] = useSearchParams();

  var toastMixin = Swal.mixin({
    toast: true,
    icon: "success",
    title: "General Title",
    animation: false,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const GetData = () => {
    let api = URL + "History/history/" + localStorage.getItem("Id");
    CheckRefreshToken();
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
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    GetData();
    if (params.get("result") == "error")
      toastMixin.fire({
        title: "Thanh toán thất bại",
        icon: "error",
      });
    else if (params.get("result") == "success")
      toastMixin.fire({
        animation: true,
        title: "Thanh toán thành công",
      });
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

  const Payment = (orderId, total) => {
    Swal.fire({
      title: "Thanh toán",
      icon: "question",
      html:
        '<img id="paypal-payment" style="width: 120px; height: 80px; cursor: pointer; margin-right: 40px" src="https://quyetdao.com/wp-content/uploads/2019/04/paypal-logo.png"/> ' +
        '<img id="momo-payment" style="width: 120px; height: 80px; cursor: pointer;" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"/>',
      showCancelButton: true,
      showConfirmButton: false,
      dangerMode: true,
      cancelButtonText: "Hủy",
    });
    const momo = document.getElementById("momo-payment");
    momo.addEventListener("click", () => {
      PaymentMoMo(total);
    });

    const paypal = document.getElementById("paypal-payment");
    paypal.addEventListener("click", async () => {
      // alert(await getTokenPaypal());
      PaymentPaypal(await getTokenPaypal(), orderId, total);
    });
  };

  const PaymentPaypal = (token, orderId, totalMoney) => {
    console.log("token: " + token);
    fetch("https://api-m.sandbox.paypal.com/v1/payments/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: totalMoney,
              currency: "USD",
            },
            description: "This is the payment description.",
          },
        ],
        redirect_urls: {
          return_url:
            currentUrl.slice(0, currentUrl.lastIndexOf("history")) +
            "payment/handling/" +
            orderId +
            "/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW/" +
            totalMoney,
          cancel_url: currentUrl,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(data);
        // window.open(data.links[1].href, "_blank");
        window.location.href = data.links[1].href;
      })
      .catch((error) => {
        // Handle error
      });
  };

  const getTokenPaypal = async () => {
    var result = "";
    await axios
      .post(
        "https://api.sandbox.paypal.com/v1/oauth2/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const token = response.data.access_token;
        console.log("GetToken: " + token);
        result = token;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  };

  const PaymentMoMo = (total) => {
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
                            onClick={() => Payment(s.id, s.totalMoney)}
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        Lịch sử
      </h1>
      <div className="main-history">{Renderdata()}</div>
    </>
  );
};

export default History;
