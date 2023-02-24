import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { URL } from "../../../../Utils/Url";
import Swal from "sweetalert2";
import "./HeaderAdmin.css";

const Header = () => {
  const [fb, setFb] = useState(0);

  const countUnreadFeedback = () => {
    setTimeout(countUnreadFeedback, 1000);
    let api = URL + "Feedback/feedback-unread";
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFb(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    countUnreadFeedback();
  }, []);

  const LogOut = () => {
    Swal.fire({
      title: "Bạn muốn đăng xuất?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        localStorage.removeItem("Token");
        localStorage.removeItem("Role");
        localStorage.removeItem("Name");
        localStorage.removeItem("Email");
        localStorage.removeItem("Avatar");
        localStorage.removeItem("Id");
        window.location.href = window.location.href.slice(
          0,
          window.location.href.indexOf("localhost") + 14
        );
      } else {
      }
    });
  };
  return (
    <>
      <Navbar>
        <Container className="background-header">
          <Nav className="me-auto" style={{ paddingTop: "14px" }}>
            <Nav.Link href="/" className="item-menu">
              Quay lại trang chủ
            </Nav.Link>
            <Nav.Link
              href="/admin"
              className="item-menu"
              id="statictis-revenue"
            >
              Thống kê
              <ul>
                <li>
                  <Nav.Link
                    href="/admin/revenue-per-rooms"
                    className="item-menu"
                  >
                    Doanh thu phòng
                  </Nav.Link>
                </li>
                <li>
                  {" "}
                  <Nav.Link href="/admin/visitor-total" className="item-menu">
                    Số lượng khách
                  </Nav.Link>
                </li>
                <li>
                  {" "}
                  <Nav.Link
                    href="/admin/visitor-statistics"
                    className="item-menu"
                  >
                    Khách/phòng
                  </Nav.Link>
                </li>
              </ul>
            </Nav.Link>

            <Nav.Link href="/admin/feedback-management" className="item-menu">
              Phản hồi{" "}
              {fb > 0 ? (
                <>
                  <span className="amount-feeback">{fb}</span>
                </>
              ) : (
                <></>
              )}
            </Nav.Link>
            <Nav.Link href="/admin/room-management" className="item-menu">
              Quản lý phòng
            </Nav.Link>
            <Nav.Link
              href="/admin/account-management?Kw&Page=1"
              className="item-menu"
            >
              Quản lý tài khoản
            </Nav.Link>
            {/* <Nav.Link href="/admin/service-management" className="item-menu">
              Quản lý dịch vụ
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
