import React from "react";
import { URL } from "../../../../../Utils/Url";
import axios from "axios";
import { AlertError } from "../../../../Alert/Error";
import { AlertWarning } from "../../../../Alert/Warning";

const CreateRoom = () => {
  const SetImages = () => {
    var file = document.getElementById("images");
    if (file.files && file.files[0]) {
      for (
        var i = 0;
        i < (file.files.length > 5 ? 5 : file.files.length);
        i++
      ) {
        var render = new FileReader();
        render.onload = function (e) {
          document.getElementById("create-room-im" + (i - 1)).src =
            e.target.result;
        };
        render.readAsDataURL(file.files[i]);
      }
    }
  };

  const Create = () => {
    var Files = document.getElementById("images").files;
    const formData = new FormData();
    formData.append("RoomName", document.getElementById("roomName").value);
    formData.append("Price", document.getElementById("price").value);
    formData.append(
      "Description",
      document.getElementById("description").value
    );
    formData.append("BedType", document.getElementById("bedType").value);
    formData.append("Acreage", document.getElementById("acreage").value);
    formData.append("Status", true);
    if (Files.length > 0) {
      for (var i = 0; i < Files.length; i++) {
        formData.append("ListImage", Files[i]);
      }
    }
    console.log([...formData]);

    try {
      axios
        .post(URL + "RoomManagement/room", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            window.location.href =
              window.location.href.slice(
                0,
                window.location.href.indexOf("localhost") + 14
              ) + "/admin/room-management";
          }
        });
    } catch (e) {
      console.log(e);
      AlertError(e["response"]["data"]["message"]);
    }
  };

  const CheckValue = () => {
    if (
      document.getElementById("roomName").value.trim().length == 0 ||
      document.getElementById("price").value.trim().length == 0 ||
      document.getElementById("description").value.trim().length == 0 ||
      document.getElementById("bedType").value.trim().length == 0 ||
      document.getElementById("acreage").value.trim().length == 0
    )
      AlertWarning("Vui lòng kiểm tra lại!");
    else if (document.getElementById("images").files.length == 0)
      AlertWarning("Vui lòng chọn ảnh!");
    else Create();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Tạo phòng</h1>
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
              <b>Tên phòng:</b>
            </td>
            <td>
              <input
                type="text"
                id="roomName"
                name="roomName"
                placeholder="Nhập tên phòng"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Giá:</b>
            </td>
            <td>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Nhập giá phòng"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Mô tả:</b>
            </td>
            <td>
              <textarea
                id="description"
                name="description"
                placeholder="Mô tả"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <b>Loại giường:</b>
            </td>
            <td>
              <input
                type="text"
                id="bedType"
                name="bedType"
                placeholder="Loại giường"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Diện tích:</b>
            </td>
            <td>
              <input
                type="text"
                id="acreage"
                name="acreage"
                placeholder="Diên tích"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="image-room-update">
        <h2>
          Chọn ảnh:
          <input
            id="images"
            type="file"
            style={{ marginLeft: "90px" }}
            multiple
            onChange={() => SetImages()}
          />
        </h2>
        <div id="image-create-room">
          <img
            id="create-room-im0"
            style={{ width: "180px", height: "150px" }}
          />
          <img
            id="create-room-im1"
            style={{ width: "180px", height: "150px" }}
          />
          <img
            id="create-room-im2"
            style={{ width: "180px", height: "150px" }}
          />
          <img
            id="create-room-im3"
            style={{ width: "180px", height: "150px" }}
          />
          <img
            id="create-room-im4"
            style={{ width: "180px", height: "150px" }}
          />
        </div>
        <div style={{ display: "flex" }}></div>
      </div>
      <button className="create-room-btn" onClick={() => CheckValue()}>
        Tạo
      </button>
    </>
  );
};

export default CreateRoom;
