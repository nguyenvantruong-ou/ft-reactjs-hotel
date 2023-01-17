import React, { useEffect, useState } from "react";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import "../Home.css";
import { Alert } from "bootstrap";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [maxPage, setMaxPage] = useState();
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
    return rooms.map((s) => {
      return (
        <>
          <div className="room-home">
            <div className="img-hover-zoom">
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
            <a href={"/room/" + s.roomId + "/" + s.slug}>
              Xem thêm<i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>
        </>
      );
    });
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
    GetData("");
  }, []);

  return (
    <>
      <div style={{ marginLeft: "10%" }}>
        <span>Tìm kiếm tên:</span>
        <input
          id="text-search"
          style={{ width: "200px", height: "30px", marginLeft: "15px" }}
          type={"text"}
          onChange={() =>
            GetData(document.getElementById("text-search").value.trim())
          }
        />
        <span className="price-room">Giá:</span>
        <select
          id="sort-room-management-hoom"
          style={{ marginLeft: "15px", width: "100px", height: "30px" }}
          onChange={() =>
            GetData(document.getElementById("text-search").value.trim())
          }
        >
          <option>Mặc định</option>
          <option>Tăng dần</option>
          <option>Giảm dần</option>
        </select>
      </div>
      <div className="main-rooms-home">{RenderDataRooms()}</div>
      <div className="page-button">{PageButton()}</div>
    </>
  );
};

export default Rooms;
