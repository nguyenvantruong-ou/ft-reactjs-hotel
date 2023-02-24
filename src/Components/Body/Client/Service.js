import React, { useEffect, useState } from "react";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import "../Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({
      duration: 700,
      easing: "ease-out",
      delay: 100,
    });
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
          {/* <div className="">
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
          </div> */}
          <div className="service-item">
            <div
              style={{
                width: "90%",
                marginBottom: "50px",
                marginLeft: "5%",
                display: "flex",
              }}
              data-aos="fade-right"
            >
              <div className="service-img-left">
                <img
                  src={s.image}
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                />
              </div>
              <div className="info-service-right" data-aos="zoom-in-left">
                <div>{s.name}</div>
                <div>
                  Giá: <span style={{ color: "red" }}>{format(s.price)}</span>{" "}
                  VNĐ
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="content-banner-service">
        <div>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "50px",
              fontFamily: "Dancing Script",
              fontSize: "60px",
              marginTop: "200px",
            }}
            data-aos="fade-up"
          >
            Dịch vụ
          </h1>
        </div>
      </div>
      <hr
        style={{
          width: "20%",
          height: "2px",
          backgroundColor: "#5f5f5f",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      />
      <p
        style={{
          fontSize: "20px",
          color: "#5f5f5f",
          textAlign: "center",
          width: "80%",
          marginLeft: "10%",
          marginBottom: "100px",
        }}
        data-aos="zoom-out-down"
      >
        Phương châm của chúng tôi là mang đến những không gian tiệc, sự kiện
        tinh tế xứng tầm với giá trị thương hiệu của doanh nghiệp. Thực đơn
        phong phú kết hợp đặc sản địa phương để mang đến những món ăn hoàn hảo.
      </p>
      <div className="service">{RenderData()}</div>
    </>
  );
};

export default Services;
