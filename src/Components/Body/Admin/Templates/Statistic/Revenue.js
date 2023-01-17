import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import { CanvasJSChart } from "canvasjs-react-charts";
import { redirect } from "react-router-dom";

const Revenue = () => {
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const getData = () => {
    let api =
      URL +
      "Statistics/revenue?Year=" +
      document.getElementById("year-sta").value;
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setRooms(results.data.rooms);
        setServices(results.data.services);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const options3 = {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: " - ",
    },
    axisY: {
      title: "Đơn vị VNĐ",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        name: "Phòng",
        showInLegend: true,
        dataPoints: [
          { y: rooms[0], label: "Jan" },
          { y: rooms[1], label: "Feb" },
          { y: rooms[2], label: "Mar" },
          { y: rooms[3], label: "Apr" },
          { y: rooms[4], label: "May" },
          { y: rooms[5], label: "Jun" },
          { y: rooms[6], label: "Jul" },
          { y: rooms[7], label: "Aug" },
          { y: rooms[8], label: "Sept" },
          { y: rooms[9], label: "Oct" },
          { y: rooms[10], label: "Nov" },
          { y: rooms[11], label: "Dec" },
        ],
      },
      {
        type: "spline",
        name: "Dịch vụ",
        showInLegend: true,
        dataPoints: [
          { y: services[0], label: "Tháng 1" },
          { y: services[1], label: "Tháng 2" },
          { y: services[2], label: "Tháng 3" },
          { y: services[3], label: "Tháng 4" },
          { y: services[4], label: "Tháng 5" },
          { y: services[5], label: "Tháng 6" },
          { y: services[6], label: "Tháng 7" },
          { y: services[7], label: "Tháng 8" },
          { y: services[8], label: "Tháng 9" },
          { y: services[9], label: "Tháng 10" },
          { y: services[10], label: "Tháng 11" },
          { y: services[11], label: "Tháng 12" },
        ],
      },
    ],
  };
  return (
    <div style={{ width: "80%", marginLeft: "10%" }}>
      <div>
        <span
          style={{ fontWeight: "800", marginRight: "15px", fontSize: "17px" }}
        >
          Năm:
        </span>
        <select
          id="year-sta"
          onChange={() => getData()}
          style={{
            width: "100px",
            textAlign: "center",
            fontSize: "17px",
            marginBottom: "30px",
          }}
        >
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
        </select>
      </div>
      <CanvasJSChart options={options3} />
    </div>
  );
};

export default Revenue;
