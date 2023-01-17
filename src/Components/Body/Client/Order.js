import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../Utils/Url";
import { AlertWarning } from "../../Alert/Warning";
import { AlertOk } from "../../Alert/AlertOk";
import { AlertError } from "../../Alert/Error";
import Swal from "sweetalert2";
import "../css/General.css";

const Order = () => {
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);

  const GetDataRooms = (fMonth, fDay, fYear, tMonth, tDay, tYear, capId) => {
    let api =
      URL +
      "Order/rooms-order?StartDate=" +
      fMonth +
      "-" +
      fDay +
      "-" +
      fYear +
      "&EndDate=" +
      tMonth +
      "-" +
      tDay +
      "-" +
      tYear +
      "&CapitaId=" +
      capId;
    console.log(api);
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setRooms(results.data);
        console.log(results.data);
      })
      .catch((error) => console.log("error", error));
  };
  const GetDataServices = () => {
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
    GetDataRooms("01", "01", "2000", "01", "01", "2000", 1);
    GetDataServices();
  }, []);

  const format = (n) => {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  };

  const RenderRooms = () => {
    return rooms.map((s) => {
      return (
        <>
          <div style={{ marginTop: "50px", display: "flex" }}>
            <div style={{ marginTop: "25px" }}>
              <input
                className="checkbox-room"
                type="checkbox"
                name={s.roomId}
                id={"room-order-" + s.roomId}
                style={{ width: "30px", marginTop: "-10px" }}
              />
            </div>
            <div style={{ marginLeft: "15px" }}>
              <img
                src={s.image}
                style={{ width: "20%", marginBottom: "-50px" }}
              />
              <span style={{ marginLeft: "15px" }}>{s.roomName}</span>
              <div style={{ marginLeft: "119px", color: "red" }}>
                {format(s.price)} VNĐ
              </div>
              <div style={{ marginLeft: "120px" }}>
                <i class="fa fa-bed" aria-hidden="true"></i> {s.typeBed}
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const RenderServices = () => {
    return services.map((s) => {
      return (
        <>
          <div style={{ marginTop: "50px", display: "flex" }}>
            <div style={{ marginTop: "25px" }}>
              <input
                className="checkbox-service"
                type="checkbox"
                name={s.id}
                id={"service-order-" + s.id}
                style={{ width: "30px", marginTop: "-10px" }}
              />
            </div>
            <div style={{ marginLeft: "15px" }}>
              <img
                src={s.image}
                style={{
                  width: "100px",
                  height: "70px",
                  marginBottom: "-50px",
                }}
              />
              <span style={{ marginLeft: "15px" }}>{s.name}</span>
              <div style={{ marginLeft: "114px", color: "red" }}>
                {format(s.price)} VNĐ
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const GetListRoomId = () => {
    var checkboxs = document.getElementsByClassName("checkbox-room");
    var listRoom = [];
    var index = 0;
    for (var i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked == true) {
        listRoom[index] = parseInt(checkboxs[i].name);
        index++;
      }
    }
    return listRoom;
  };

  const GetListServiceId = () => {
    var checkboxs = document.getElementsByClassName("checkbox-service");
    var listService = [];
    var index = 0;
    for (var i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked == true) {
        listService[index] = parseInt(checkboxs[i].name);
        index++;
      }
    }
    return listService;
  };

  const FinishOrder = () => {
    let api = URL + "Order/order";
    let data = {
      AccountId: localStorage.getItem("Id"),
      CapitaId: document.getElementById("capitaId").value,
      StartDate: document.getElementById("from-date").value,
      EndDate: document.getElementById("end-date").value,
      RoomId: GetListRoomId(),
      ServiceId: GetListServiceId(),
    };
    console.log(data);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          Swal.fire({
            title: "Thành công",
            text: 'Nhấn "Đồng ý" để tới hóa đơn',
            icon: "success",
            buttons: true,
            dangerMode: true,
            confirmButtonText: "Đồng ý",
          }).then((willDelete) => {
            if (willDelete.isConfirmed) {
              window.location.href =
                window.location.href.slice(
                  0,
                  window.location.href.indexOf("localhost") + 14
                ) + "/history";
            } else {
            }
          });
        } else AlertError(res.message);
      })
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
      });
  };

  const GetTotalMoney = () => {
    let api = URL + "Order/total-money";
    let data = {
      CapitaId: document.getElementById("capitaId").value,
      StartDate: document.getElementById("from-date").value,
      EndDate: document.getElementById("end-date").value,
      RoomId: GetListRoomId(),
      ServiceId: GetListServiceId(),
    };
    console.log(data);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          Swal.fire({
            title: "Hóa đơn",
            text: "Tổng tiền của bạn là " + format(res.data) + " VNĐ. ",
            icon: "warning",
            buttons: true,
            showCancelButton: true,
            dangerMode: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
          }).then((willDelete) => {
            if (willDelete.isConfirmed) {
              FinishOrder();
            } else {
            }
          });
        } else AlertError(res.message);
      })
      .catch((error) => {
        AlertError(error.message);
        console.log("error", error);
      });
  };

  const GetListRoom = () => {
    var fD = document.getElementById("from-date").value;
    var tD = document.getElementById("end-date").value;
    if (fD.length > 0 && tD.length > 0 && fD < tD) {
      GetDataRooms(
        fD.slice(5, 7),
        fD.slice(8, 10),
        fD.slice(0, 4),
        tD.slice(5, 7),
        tD.slice(8, 10),
        tD.slice(0, 4),
        document.getElementById("capitaId").value
      );
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Đặt phòng</h1>
      <div className="main-order">
        <div className="select-order">
          <span>Từ: </span>
          <input
            id="from-date"
            type="date"
            onChange={() => {
              GetListRoom();
            }}
          />
          <span style={{ marginLeft: "120px" }}>Đến: </span>
          <input
            id="end-date"
            type="date"
            onChange={() => {
              GetListRoom();
            }}
          />
          <span style={{ marginLeft: "120px" }}>Số người(> 10 tuổi): </span>
          <select
            id="capitaId"
            onChange={() => {
              GetListRoom();
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="main-order-select">
          <div className="list-room-order">{RenderRooms()}</div>
          <div className="list-service-order">{RenderServices()}</div>
        </div>
        <input
          type="button"
          value="Đặt phòng"
          className="btn-order"
          onClick={() => GetTotalMoney()}
        />
      </div>
    </>
  );
};

export default Order;
