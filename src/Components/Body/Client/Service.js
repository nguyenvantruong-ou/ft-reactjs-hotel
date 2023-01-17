import React, { useEffect, useState } from "react";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import "../Home.css";

const Services = () => {
  const [services, setServices] = useState([]);

  const GetData = () => {
    let api = URL + "Service/services";
    fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((results) => {
        setServices(results.data);
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

  const RenderData = () => {
    return services.map((s) => {
      return (
        <>
          <div className="service-item">
            <div
              className="room-home"
              style={{ width: "90%", marginBottom: "50px", marginLeft: "5%" }}
            >
              <div className="" style={{ height: "400px" }}>
                <img src={s.image} style={{ height: "100%" }} />
              </div>
              <div className="room-name-home">{s.name}</div>
              <div className="room-price-home">Giá: {format(s.price)} VNĐ</div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Dịch vụ</h1>
      <div className="service">{RenderData()}</div>
    </>
  );
};

export default Services;
