import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { URL } from "../../../../Utils/Url";
import { AlertWarning } from "../../../Alert/Warning";
import { AlertOk } from "../../../Alert/AlertOk";
import { AlertError } from "../../../Alert/Error";
import "../../Home.css";
import "../RoomDetail/Room.css";
import { Carousel } from "react-responsive-carousel";
import Comment from "./Comment";
import Swal from "sweetalert2";

const RoomDetail = () => {
  const [room, setRoom] = useState({});
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState({
    amountComment: 0,
    listComment: [],
  });
  const { id } = useParams();
  let toIndex = 2;

  const GetData = () => {
    let api = URL + "Room/room/" + id;
    fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((results) => {
        setRoom(results.data);
        setImages(results.data.listImages);
      })
      .catch((error) => console.log("error", error));
  };

  const GetDataComment = (to) => {
    let api = URL + "Comment/comments?RoomId=" + id + "&ToIndex=" + to;
    fetch(api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((results) => {
        setComments(results.data);
      })
      .catch((error) => console.log("error", error));
  };

  const RenderImage = () => {
    return images.map((s) => {
      return (
        <>
          <div className="carousel-div">
            <img src={s} style={{ width: "100%" }} />
          </div>
        </>
      );
    });
  };

  const RenderComment = () => {
    if (comments.amountComment == 0)
      return (
        <>
          <div style={{ textAlign: "center" }}>
            <div>Chưa có đánh giá nào.</div>
            <div>
              Hãy là người đầu tiên nhận xét “
              <span style={{ fontWeight: "700" }}>{room.roomName}</span>”.
            </div>
          </div>
        </>
      );
    else
      return comments.listComment.map((s) => {
        return (
          <>
            <div className="comment">
              {" "}
              <img src={s.avatar} />{" "}
              <div style={{ fontWeight: "700" }}> {s.username}</div>
              <span> {s.dateCreated.slice(0, 10)}</span>
              <div className="content-cmt">{s.content}</div>
            </div>
          </>
        );
      });
  };

  useEffect(() => {
    GetData();
    GetDataComment(toIndex);
  }, []);

  const format = (n) => {
    if (n > 0)
      return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
      });
  };

  const GetMoreComments = () => {
    if (localStorage.getItem("Id") == null) {
      Swal.fire({
        title: "Bạn muốn đăng nhập?",
        text: "Bạn cần đăng nhập để xem thêm",
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        dangerMode: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((willDelete) => {
        if (willDelete.isConfirmed) {
          window.location.href =
            window.location.href.slice(
              0,
              window.location.href.indexOf("localhost") + 14
            ) + "/auth/sign-in";
        } else {
        }
      });
    } else {
      var flag = parseInt(document.getElementById("flag-more").name) + 2;
      document.getElementById("flag-more").name = flag;
      GetDataComment(flag);

      if (flag >= comments.amountComment)
        document.getElementById("more-cmt").style.display = "none";
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Carousel>{RenderImage()}</Carousel>
        {/* </Slider> */}
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        {room.roomName}
      </h1>
      <div className="info-room-main">
        <div className="des-room-detail">{room.description}</div>
        <div className="info-gr">
          <div>
            Giá: <span style={{ color: "red" }}> {format(room.price)} đ </span>
          </div>
          <div>Loại giường: {room.bedType}</div>
          <div>Diện tích: {room.acreage}</div>
        </div>
      </div>
      <div className="list-comment">
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "inherit",
            marginBottom: "15px",
            marginTop: "140px",
          }}
        >
          Bình luận:
        </div>
        {localStorage.getItem("Id") == null ? (
          <>
            <p style={{ textAlign: "center", marginBottom: "50px" }}>
              <i>Vui lòng đăng nhập!</i>
            </p>
          </>
        ) : (
          <>
            <Comment />
          </>
        )}
        <hr /> <br />
        <div>{RenderComment()}</div>
        {comments.amountComment > 2 ? (
          <>
            <div id="more-cmt" className="more-comment">
              <input
                id="flag-more"
                type="button"
                onClick={() => GetMoreComments()}
                value="Xem thêm"
                name="2"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default RoomDetail;
