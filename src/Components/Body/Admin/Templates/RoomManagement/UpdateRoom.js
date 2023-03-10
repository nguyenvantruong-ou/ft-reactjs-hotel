import { useLoaderData, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../../Utils/Url";
import axios from "axios";
import { AlertError } from "../../../../Alert/Error";
import Swal from "sweetalert2";
import CheckRefreshToken from "../../../../../Utils/CheckRefreshToken";

const UpdateRoomAdmin = () => {
  const { id } = useParams();

  const [room, setRoom] = useState({});
  const [roomImage, setRoomImage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setRoom((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const GetDataRoom = () => {
    let api = URL + "RoomManagement/room/" + id;
    CheckRefreshToken();
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRoom(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  const GetDataRoomImage = async () => {
    let api = URL + "RoomManagement/room-images/" + id;
    CheckRefreshToken();
    await fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRoomImage(res.data.result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetDataRoom();
    GetDataRoomImage();
  }, []);

  const SetImages = () => {
    return roomImage.map((s) => {
      return (
        <>
          <div style={{ width: "300px", margin: "5px" }}>
            <img src={s.link} style={{ width: "100%", height: "200px" }} />
          </div>
        </>
      );
    });
  };

  const UpdateRoom = () => {
    var Files = document.getElementById("images").files;
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("RoomName", document.getElementById("roomName").value);
    formData.append("Price", document.getElementById("price").value);
    formData.append(
      "Description",
      document.getElementById("description").value
    );
    formData.append("BedType", document.getElementById("bedType").value);
    formData.append("Acreage", document.getElementById("acreage").value);
    formData.append("Status", document.getElementById("status").checked);
    if (Files.length > 0) {
      for (var i = 0; i < Files.length; i++) {
        formData.append("ListImage", Files[i]);
      }
    }
    console.log([...formData]);

    try {
      CheckRefreshToken();
      axios
        .put(URL + "RoomManagement/room", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.location.href = "/admin/room-management";
          }
        });
    } catch (e) {
      console.log(e);
      AlertError(e["response"]["data"]["message"]);
    }

    let timerInterval;
    Swal.fire({
      title: "??ang c???p nh???t ...",
      html: "Qu?? tr??nh s??? k???t th??c sau <b></b> mili gi??y.",
      timer: 6500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
      >
        C???p nh???t th??ng tin ph??ng
      </h1>
      <table className="table-room-management">
        <thead>
          <tr>
            <th style={{ width: "20%" }}></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>T??n ph??ng:</b>
            </td>
            <td>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={room.roomName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Gi??:</b>
            </td>
            <td>
              <input
                type="text"
                id="price"
                name="price"
                value={room.price}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>M?? t???:</b>
            </td>
            <td>
              <textarea
                id="description"
                name="description"
                value={room.description}
                onChange={handleChange}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <b>Lo???i gi?????ng:</b>
            </td>
            <td>
              <input
                type="text"
                id="bedType"
                name="bedType"
                value={room.bedType}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Di???n t??ch:</b>
            </td>
            <td>
              <input
                type="text"
                id="acreage"
                name="acreage"
                value={room.acreage}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Tr???ng th??i:</b>
            </td>
            <td>
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={room.status}
                style={{ marginLeft: "-48.1%" }}
                onChange={handleChangeCheckbox}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="image-room-update">
        <h2>Danh s??ch ???nh</h2>
        <input id="images" type="file" multiple />
        <div style={{ display: "flex" }}>{SetImages()}</div>
      </div>
      <button className="update-room-btn" onClick={() => UpdateRoom()}>
        C???p nh???t
      </button>
    </>
  );
};

export default UpdateRoomAdmin;
