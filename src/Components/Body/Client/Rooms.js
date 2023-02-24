import React, { useEffect, useState } from "react";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import "../Home.css";
import { Alert } from "bootstrap";
import { useLoaderData } from "react-router-dom";
import "../css/SwitchButton.scss";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [maxPage, setMaxPage] = useState();
  const [view, setView] = useState(localStorage.getItem("ViewHome"));

  var page = 1;

  const GetData = (kw) => {
    let api =
      URL +
      "Room/rooms?Kw=" +
      kw +
      "&Sort=" +
      GetSort() +
      "&Page=" +
      page +
      "&PageSize=6";
    fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setRooms(results.data.data);
        setMaxPage(results.data.pageMax);
      })
      .catch((error) => console.log("error", error));
  };

  const format = (n) => {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  };

  const RenderDataRooms = () => {
    if (rooms.length == 0)
      return (
        <>
          <div
            style={{
              textAlign: "center",
              margin: "70px auto",
            }}
          >
            <i>Không có phòng bạn tìm kiếm!</i>
          </div>
        </>
      );
    else if (view == 1)
      return rooms.map((s) => {
        return (
          <>
            <div className="room-home">
              <div className="img-hover-zoom" data-aos="">
                <img alt="This zooms-in really well and smooth" src={s.image} />
              </div>
              <div className="room-name-home">{s.roomName}</div>
              <div className="room-price-home">Giá: {format(s.price)} VNĐ</div>
              <div>
                <span>
                  <i class="fa fa-bed" aria-hidden="true"></i> {s.typeBed}
                </span>
                <span style={{ marginLeft: "80px" }}>
                  <i class="fa fa-hand-o-right" aria-hidden="true"></i>{" "}
                  {s.acreage}
                </span>{" "}
                <br />
              </div>
              <a className="a" href={"/room/" + s.roomId + "/" + s.slug}>
                Xem thêm<i class="fa fa-chevron-right" aria-hidden="true"></i>
              </a>
            </div>
          </>
        );
      });
    else {
      var flag = 0;
      return rooms.map((s) => {
        if (flag == 0) {
          flag = 1;
          return (
            <>
              <div className="view-room-2">
                <div className="img-room-view2" data-aos="zoom-in">
                  <img
                    src={s.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxShadow: "0px 0px 12px #0000004d",
                    }}
                  />
                </div>
                <div className="info-room-view2" data-aos="fade-left">
                  <p>{s.roomName}</p>
                  <hr />
                  <div
                    style={{
                      padding: "10px 20px",
                      height: "200px",
                      marginBottom: "20px",
                    }}
                  >
                    {s.description.length > 470
                      ? s.description.slice(0, 470) + "..."
                      : s.description}
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "17px",
                          fontWeight: "600",
                        }}
                      >
                        Diện tích:
                      </span>{" "}
                      {s.acreage} ({s.typeBed})
                    </div>
                    <div>
                      <span style={{ fontSize: "17px", fontWeight: "600" }}>
                        Giá:
                      </span>{" "}
                      <span style={{ color: "red" }}>
                        {format(s.price)} VNĐ
                      </span>
                      /ngày
                    </div>
                  </div>
                  <div>
                    <a
                      href={"/room/" + s.roomId + "/" + s.slug}
                      class="snip1582"
                    >
                      Chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        } else {
          flag = 0;
          return (
            <>
              <div className="view-room-2">
                <div className="info-room-view2" data-aos="fade-right">
                  <p>{s.roomName}</p>
                  <hr />
                  <div
                    style={{
                      padding: "10px 20px",
                      height: "200px",
                      marginBottom: "20px",
                    }}
                  >
                    {s.description.length > 470
                      ? s.description.slice(0, 470) + "..."
                      : s.description}
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "17px",
                          fontWeight: "600",
                        }}
                      >
                        Diện tích:
                      </span>{" "}
                      {s.acreage} ({s.typeBed})
                    </div>
                    <div>
                      <span style={{ fontSize: "17px", fontWeight: "600" }}>
                        Giá:
                      </span>{" "}
                      <span style={{ color: "red" }}>
                        {format(s.price)} VNĐ
                      </span>
                      /ngày
                    </div>
                  </div>
                  <div>
                    <a
                      href={"/room/" + s.roomId + "/" + s.slug}
                      class="snip1582"
                    >
                      Chi tiết
                    </a>
                  </div>
                </div>
                <div className="img-room-view2" data-aos="zoom-out">
                  <img
                    src={s.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxShadow: "0px 0px 12px #0000004d",
                    }}
                  />
                </div>
              </div>
            </>
          );
        }
      });
    }
  };

  const GetSort = () => {
    var type = document.getElementById("sort-room-management-hoom").value;
    if (type == "Mặc định") return 0;
    if (type == "Tăng dần") return 1;
    return -1;
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
    GetData(document.getElementById("text-search").value.trim());
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
    if (localStorage.getItem("ViewHome") == null)
      localStorage.setItem("ViewHome", 2);
    GetData("");
  }, []);

  const setViewRoomHome = () => {
    if (localStorage.getItem("ViewHome") == 1) {
      document.getElementById("table-view").style.display = "inherit";
      document.getElementById("list-view").style.display = "none";
      setView(2);
      localStorage.setItem("ViewHome", 2);
    } else {
      document.getElementById("table-view").style.display = "none";
      document.getElementById("list-view").style.display = "inherit";
      setView(1);
      localStorage.setItem("ViewHome", 1);
    }
  };

  return (
    <>
      <div style={{ textAlign: "right", userSelect: "none" }}>
        <span data-aos="fade-up" data-aos-anchor-placement="top-center">
          Tra cứu:
        </span>
        <input
          id="text-search"
          style={{
            width: "200px",
            height: "30px",
            marginLeft: "15px",
            borderRadius: "20px",
            paddingLeft: "14px",
            fontSize: "17px",
          }}
          placeholder="Tìm kiếm theo tên"
          type={"text"}
          onChange={() =>
            GetData(document.getElementById("text-search").value.trim())
          }
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
          data-aos-duration="300"
        />
        <span
          style={{ marginLeft: "2%" }}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          Giá:
        </span>
        <select
          id="sort-room-management-hoom"
          style={{ marginLeft: "15px", width: "100px", height: "35px" }}
          onChange={() =>
            GetData(document.getElementById("text-search").value.trim())
          }
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
          data-aos-duration="300"
        >
          <option>Mặc định</option>
          <option>Tăng dần</option>
          <option>Giảm dần</option>
        </select>
        <span
          className="view-home-room"
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
          data-aos-duration="700"
        >
          <i
            id="table-view"
            class="fa fa-table view-room-icon"
            aria-hidden="true"
            onClick={() => setViewRoomHome()}
          ></i>
          <i
            id="list-view"
            class="fa fa-sliders view-room-icon"
            aria-hidden="true"
            onClick={() => setViewRoomHome()}
          ></i>
        </span>
      </div>
      <div className="main-rooms-home">{RenderDataRooms()}</div>
      <div className="page-button">{PageButton()}</div>
    </>
  );
};

export default Rooms;
