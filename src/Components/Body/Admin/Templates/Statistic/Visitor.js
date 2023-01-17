import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import { CanvasJSChart, CanvasJS } from "canvasjs-react-charts";

const Visitor = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    let api = URL + "Statistics/visitor";
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setData(results.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const options = {
    exportEnabled: true,
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label}  ",
        dataPoints: [
          { y: data[0], label: "1 người", i: 0 },
          { y: data[1], label: "2 người" },
          { y: data[2], label: "3 người" },
          { y: data[3], label: "4 người" },
          { y: data[4], label: "5 người" },
        ],
      },
    ],
  };

  return (
    <div
      style={{
        width: "80%",
        marginLeft: "10%",
        marginBottom: "100px",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Số khách/phòng
        </h1>
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default Visitor;
