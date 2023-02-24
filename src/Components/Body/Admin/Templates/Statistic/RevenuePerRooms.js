import React, { useEffect, useState, useRef } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import { CanvasJSChart } from "canvasjs-react-charts";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";

const RevenuePerRooms = () => {
  const [data, setData] = useState([]);

  const getData = (fromDate, toDate) => {
    let api =
      URL +
      "Statistics/revenue-per-rooms?FromDate=" +
      fromDate +
      "&ToDate=" +
      toDate;
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) setData(results.data);
        else AlertError(results.message);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData("2020-01-01", "2050-01-01");
  }, []);

  const getDataByDate = () => {
    var from = document.getElementById("from-date").value;
    var to = document.getElementById("to-date").value;
    if (from.length > 0 && to.length > 0) getData(from, to);
  };

  const options = {
    animationEnabled: true,
    theme: "light1",
    title: {
      text:
        document.getElementById("from-date") != null &&
        document.getElementById("to-date") != null
          ? document.getElementById("from-date").value.slice(8, 10).length == 0
            ? "_"
            : document.getElementById("from-date").value.slice(8, 10) +
              "/" +
              document.getElementById("from-date").value.slice(5, 7) +
              "/" +
              document.getElementById("from-date").value.slice(0, 4) +
              " -> " +
              document.getElementById("to-date").value.slice(8, 10) +
              "/" +
              document.getElementById("to-date").value.slice(5, 7) +
              "/" +
              document.getElementById("to-date").value.slice(0, 4)
          : "__/__/____ -> __/__/____",
    },
    axisX: {
      title: "Tên phòng",
      reversed: true,
    },
    axisY: {
      title: "",
      includeZero: true,
      //   labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: data.map((s) => {
          return { y: s.totalMoney, label: s.roomName };
        }),
      },
    ],
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        Doanh thu theo phòng
      </h1>
      <div
        style={{
          width: "80%",
          marginLeft: "10%",
          marginBottom: "100px",
        }}
      >
        <div className="select-order">
          <span>Từ: </span>
          <input
            id="from-date"
            type="date"
            onChange={() => {
              getDataByDate();
            }}
          />
          <span style={{ marginLeft: "120px" }}>Đến: </span>
          <input
            id="to-date"
            type="date"
            onChange={() => {
              getDataByDate();
            }}
          />
        </div>
        <br />
        <br />
        <CanvasJSChart options={options} />
      </div>
    </>
  );
};

export default RevenuePerRooms;
