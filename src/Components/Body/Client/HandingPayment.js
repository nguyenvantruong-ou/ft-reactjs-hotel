import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { URL } from "../../../Utils/Url";
import CheckRefreshToken from "../../../Utils/CheckRefreshToken";

const HandingPayment = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const { id, total } = useParams();
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: "Đang xử lý ...",
      html: "Quá trình xử lý sẽ kết thúc sau <b></b> milli giây.",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        HandlingPayment(id, total);
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }, []);

  const HandlingPayment = (orderId, total) => {
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
        StaffId: 1,
        CostIncurred: 0,
        TotalMoneyInOrder: total,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          // SendSMS();
          window.location.href = "/history?result=success";
        } else window.location.href = "/history?result=error";
      })
      .catch((error) => {
        window.location.href = "/history?result=error";
      });
  };

  return (
    <>
      <div style={{ height: "470px" }}></div>
    </>
  );
};

export default HandingPayment;
