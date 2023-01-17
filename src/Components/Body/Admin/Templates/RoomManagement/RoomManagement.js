import React from "react";
import { URL } from "../../../../../Utils/Url";
import "../../Templates/StyleAdmin.css";
import { Link } from "react-router-dom";
import { AlertWarning } from "../../../../Alert/Warning";
import { AlertOk } from "../../../../Alert/AlertOk";

export default class RoomManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  getSort() {
    var type = document.getElementById("sort-room-management").value;
    if (type == "Mặc định") return 0;
    if (type == "Tăng dần") return 1;
    return -1;
  }

  getData(kw) {
    let api =
      URL +
      "RoomManagement/rooms?Kw=" +
      kw +
      "&Sort=" +
      this.getSort() +
      "&Page=1&PageSize=1000";
    console.log(api);
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          response: results.data,
        });
      })
      .catch((error) => console.log("error", error));
  }

  componentDidMount() {
    this.getData("");
  }

  deleteRoom(id) {
    fetch(URL + "RoomManagement/room/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.code == 200) {
          AlertOk(res.message);
          this.getData("");
        }
      })
      .catch((error) => {
        console.error(error);
        AlertWarning("Vui lòng kiểm tra lại!");
      });
  }

  format(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  }

  rederTableData() {
    return this.state.response.map((data) => {
      return (
        <>
          <tr>
            <td>{data.roomName}</td>
            <td>{data.description.slice(0, 40) + "..."}</td>
            <td>{this.format(data.price)}</td>
            <td>{data.bedType}</td>
            <td>{data.acreage}</td>
            <td>{data.status == true ? "Đang hoạt động" : "Đã ngưng"}</td>
            <td>
              <button className="update-btn-room">
                <a href={"room-management/" + data.id + "/" + data.slug}>Sửa</a>
              </button>
            </td>
            <td>
              {data.status == true ? (
                <button
                  className="delete-btn-room"
                  onClick={() => this.deleteRoom(data.id)}
                >
                  Xóa
                </button>
              ) : (
                <button
                  disabled
                  onClick={() => this.deleteRoom(data.id)}
                  style={{ color: "white" }}
                >
                  Xóa
                </button>
              )}
            </td>
          </tr>
        </>
      );
    });
  }

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Quản lý phòng
        </h1>
        <div className="search-room">
          <span>Tìm kiếm:</span>
          <input
            id="kw-room-management"
            type="text"
            onChange={() =>
              this.getData(document.getElementById("kw-room-management").value)
            }
            // onChange={() => this.getData()}
          />
          <span className="price-room">Giá:</span>
          <select
            id="sort-room-management"
            onChange={() =>
              this.getData(document.getElementById("kw-room-management").value)
            }
          >
            <option>Mặc định</option>
            <option>Tăng dần</option>
            <option>Giảm dần</option>
          </select>
          <a href="/admin/room-management/create">
            Thêm phòng <i class="fa fa-plus-square-o" aria-hidden="true"></i>
          </a>
        </div>
        <div className="main-room">
          <table className="table-room">
            <thead>
              <tr>
                <th>Tên phòng</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Loại giường</th>
                <th>Diện tích</th>
                <th>Trạng thái</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.rederTableData()}</tbody>
          </table>
        </div>
      </>
    );
  }
}
