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
import CheckRefreshToken from "../../../../Utils/CheckRefreshToken";

import AOS from "aos";
import "aos/dist/aos.css";

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
        console.log(results.data);
        setComments(results.data);
      })
      .catch((error) => console.log("error", error));
  };

  const RenderImage = () => {
    var flag = 0;
    return images.map((s) => {
      return (
        <>
          {flag == 0 ? (
            <>
              <div className="carousel-div" style={{ height: "600px " }}>
                <video
                  style={{ width: "100%", height: "100%" }}
                  controls
                  autoplay
                >
                  <source
                    src="https://res.cloudinary.com/dykzla512/video/upload/v1675331560/HotelManagement/y2meta.com-Hotel_room_introduce_-_M%E1%BA%ABu_video_gi%E1%BB%9Bi_thi%E1%BB%87u_ph%C3%B2ng_kh%C3%A1ch_s%E1%BA%A1n_resort_KS_01_Shorts-_1080p60_kj4zfs.mp4"
                    type="video/mp4"
                  />
                  {(flag = 1)}
                </video>
              </div>
            </>
          ) : (
            <>
              <div className="carousel-div" style={{ height: "600px " }}>
                <img src={s} style={{ width: "100%", height: "100%" }} />
              </div>
            </>
          )}
        </>
      );
    });
  };

  const CancelUpdateComment = (id) => {
    document.getElementById("comment-update" + id).style.height = "150px";
    document.getElementById("edit-cmt-btn" + id).style.display = "block";
    document.getElementById("content-cmt" + id).style.display = "block";
    document.getElementsByClassName("edit-main-cmt" + id)[0].style.display =
      "none";
  };

  const UpdateComment = (id) => {
    document.getElementById("comment-update" + id).style.height = "210px";
    document.getElementById("edit-cmt-btn" + id).style.display = "none";
    document.getElementById("content-cmt" + id).style.display = "none";
    document.getElementsByClassName("edit-main-cmt" + id)[0].style.display =
      "initial";
  };

  const UpdateCommentFinal = (id) => {
    if (
      document
        .getElementsByClassName("content-update-cmt-text" + id)[0]
        .value.trim().length < 1
    )
      AlertWarning("Vui l??ng nh???p n???i dung!");
    else
      Swal.fire({
        title: "B???n mu???n ch???nh s???a b??nh lu???n?",
        text: 'Nh???n "?????ng ??" ????? ch???nh s???a b??nh lu???n c???a b???n',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "?????ng ??",
        cancelButtonText: "H???y",
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            Id: id,
            Content: document
              .getElementsByClassName("content-update-cmt-text" + id)[0]
              .value.trim(),
            Incognito: document.getElementsByClassName(
              "update-cmt-incognito" + id
            )[0].checked,
          };
          console.log(
            "???? ~ file: RoomDetail.js:93 ~ UpdateCommentFinal ~ data",
            data
          );

          let api = URL + "Comment/comment";
          CheckRefreshToken();
          fetch(api, {
            method: "PUT",
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
                Swal.fire(
                  "Th??nh c??ng",
                  "B??nh lu???n c???a b???n ???? ???????c c???p nh???t th??nh c??ng",
                  "success"
                );
                GetDataComment(document.getElementById("flag-more").name);
                CancelUpdateComment(id);
              } else {
                AlertError(res.message);
              }
            })
            .catch((error) => {
              AlertError(error.message);
              console.log("error", error);
            });
        }
      });
  };

  const DeleteComment = (id) => {
    Swal.fire({
      title: "B???n mu???n x??a b??nh lu???n n??y?",
      text: 'Ch???n "?????ng ??" ????? ti???p t???c x??a',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "?????ng ??",
      cancelButtonText: "H???y",
    }).then((result) => {
      if (result.isConfirmed) {
        CheckRefreshToken();
        fetch(URL + "Comment/comment/" + id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.code == 200) {
              AlertOk(res.message);
              GetDataComment(document.getElementById("flag-more").name);
            } else AlertError(res.message);
          })
          .catch((error) => {
            console.error(error);
            AlertWarning("Vui l??ng ki???m tra l???i!");
          });
      }
    });
  };

  const RenderComment = () => {
    if (comments.amountComment == 0)
      return (
        <>
          <div style={{ textAlign: "center" }}>
            <div>Ch??a c?? ????nh gi?? n??o.</div>
            <div>
              H??y l?? ng?????i ?????u ti??n nh???n x??t ???
              <span style={{ fontWeight: "700" }}>{room.roomName}</span>???.
            </div>
          </div>
        </>
      );
    else
      return comments.listComment.map((s) => {
        return (
          <>
            <div
              className="comment"
              id={"comment-update" + s.id}
              data-aos="zoom-in-up"
            >
              <img src={s.avatar} />{" "}
              <div style={{ fontWeight: "700" }}> {s.username}</div>
              <span> {s.dateCreated.slice(0, 10)}</span>
              <div id={"content-cmt" + s.id} className="content-cmt">
                {s.content}
              </div>
              {/* update comment */}
              <div id="edit-cmt" className={"edit-main-cmt" + s.id}>
                <textarea
                  id="content-update-cmt"
                  className={"content-update-cmt-text" + s.id}
                  placeholder={s.content}
                ></textarea>
                <div style={{ display: "flex" }}>
                  <p>
                    ???n th??ng tin c???a b???n?
                    <div>
                      <input
                        id="update-cmt-incognito"
                        className={"update-cmt-incognito" + s.id}
                        type="checkbox"
                        style={{
                          width: "20px",
                          marginLeft: "15px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </p>
                  <div style={{ marginLeft: "46%", display: "flex" }}>
                    <input
                      className="cancel-cmt-btn"
                      value="H???y"
                      style={{ marginRight: "15px" }}
                      onClick={() => CancelUpdateComment(s.id)}
                    />
                    <input
                      className="update-cmt-btn"
                      value="C???p nh???t"
                      onClick={() => UpdateCommentFinal(s.id)}
                    />
                  </div>
                </div>
              </div>
              {localStorage.getItem("Id") != null &&
              s.userId == localStorage.getItem("Id") ? (
                <>
                  <div id={"edit-cmt-btn" + s.id} className="edit-cmt-btn">
                    <span onClick={() => UpdateComment(s.id)}>
                      <i class="fa fa-pencil-square" aria-hidden="true"></i>{" "}
                      Ch???nh s???a
                    </span>
                    <span
                      style={{ marginLeft: "20px" }}
                      onClick={() => DeleteComment(s.id)}
                    >
                      <i class="fa fa-trash-o" aria-hidden="true"></i> X??a
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      });
  };

  useEffect(() => {
    GetData();
    GetDataComment(toIndex);
    AOS.init({
      duration: 700,
      easing: "ease-out",
      delay: 100,
    });
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
        title: "B???n mu???n ????ng nh???p?",
        text: "B???n c???n ????ng nh???p ????? xem th??m",
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        dangerMode: true,
        confirmButtonText: "?????ng ??",
        cancelButtonText: "H???y",
      }).then((willDelete) => {
        if (willDelete.isConfirmed) {
          window.location.href = "/auth/sign-in";
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontFamily: "Dancing Script",
          fontSize: "50px",
        }}
        data-aos="fade-up"
      >
        {room.roomName}
      </h1>
      <div className="info-room-main">
        <div className="des-room-detail" data-aos="zoom-in">
          {room.description}
        </div>
        <div className="info-gr" data-aos="fade-right">
          <div>
            Gi??: <span style={{ color: "red" }}> {format(room.price)} ?? </span>
          </div>
          <div>Lo???i gi?????ng: {room.bedType}</div>
          <div>Di???n t??ch: {room.acreage}</div>
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
          B??nh lu???n:
        </div>
        {localStorage.getItem("Id") == null ? (
          <>
            <p style={{ textAlign: "center", marginBottom: "50px" }}>
              <i>Vui l??ng ????ng nh???p!</i>
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
                value="Xem th??m"
                name="2"
              />
              <i class="fa fa-angle-double-down" aria-hidden="true"></i>
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
