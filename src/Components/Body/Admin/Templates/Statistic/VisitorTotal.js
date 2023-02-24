import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";
import { AlertError } from "../../../../Alert/Error";
import { CanvasJSChart } from "canvasjs-react-charts";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";

const VisitorTotal = () => {
  const [amount, setAmount] = useState([
    { year: 0, amount: 0 },
    { year: 0, amount: 0 },
    { year: 0, amount: 0 },
  ]);

  const getData = () => {
    let api = URL + "Statistics/amount-customer";
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setAmount(results.data);
        console.log(results.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const options2 = {
    animationEnabled: true,
    theme: "dark1",
    title: {
      text: "Số lượng khách hàng theo các năm",
    },
    axisY: {
      title: "Số người",
      scaleBreaks: {
        autoCalculate: true,
        type: "wavy",
        lineColor: "white",
      },
    },
    data: [
      {
        type: "column",
        indexLabel: "{y}",
        indexLabelFontColor: "white",
        dataPoints: [
          { label: amount[0].year, y: amount[0].amount },
          { label: amount[1].year, y: amount[1].amount },
          { label: amount[2].year, y: amount[2].amount },
        ],
      },
    ],
  };
  return (
    <div style={{ width: "80%", marginLeft: "10%", marginBottom: "100px" }}>
      <div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontFamily: "Dancing Script",
            fontSize: "50px",
          }}
        >
          Khách hàng
        </h1>
        <CanvasJSChart options={options2} />
      </div>
    </div>
  );
};

export default VisitorTotal;
