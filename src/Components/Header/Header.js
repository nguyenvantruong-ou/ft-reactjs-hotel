import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";
import Swal from "sweetalert2";

import Services from "../Body/Client/Service";

const HeaderAdmin = () => {
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
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("Role");
        localStorage.removeItem("Name");
        localStorage.removeItem("Email");
        localStorage.removeItem("Avatar");
        localStorage.removeItem("Id");
        window.location.href = "/";
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
              Trang chủ
            </Nav.Link>
            <Nav.Link href="/#rooms" className="item-menu">
              Phòng
            </Nav.Link>
            <Nav.Link href="/service" className="item-menu">
              Dịch vụ
            </Nav.Link>
            {localStorage.getItem("Role") == "USER" ? (
              <>
                <Nav.Link href="/feedback" className="item-menu">
                  Phản hồi
                </Nav.Link>
                <Nav.Link href="/order" className="item-menu">
                  Đặt phòng
                </Nav.Link>
                <Nav.Link href="/history" className="item-menu">
                  Lịch sử
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {localStorage.getItem("Role") == "STAFF" ||
            localStorage.getItem("Role") == "ADMIN" ? (
              <>
                <Nav.Link href="/list-order" className="item-menu">
                  Hóa đơn
                </Nav.Link>
                <Nav.Link href="/create-order" className="item-menu">
                  Tạo đơn
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {localStorage.getItem("Role") == "ADMIN" ? (
              <>
                <Nav.Link href="/admin" className="item-menu">
                  Quản lý
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            {localStorage.getItem("Token") != null ? (
              <>
                <Nav.Link className="item-menu" onClick={LogOut}>
                  Đăng xuất
                </Nav.Link>
                <div style={{ marginTop: "-40px" }}>
                  <Nav.Link
                    href="/profile"
                    className="item-menu"
                    style={{
                      float: "right",
                    }}
                  >
                    <span>{localStorage.getItem("Name").slice(0, 20)}</span>
                    <img
                      id="img-user-header"
                      style={{
                        width: "30px",
                        height: "18px",
                        borderRadius: "50%",
                        marginBottom: "-5px",
                        marginLeft: "2px",
                        border: "2px solid white",
                      }}
                      src={
                        localStorage.getItem("Avatar").length < 10
                          ? "https://res.cloudinary.com/dykzla512/image/upload/v1672894851/HotelManagement/ng8l2mgr4xaykbzxwtby.jpg"
                          : localStorage.getItem("Avatar")
                      }
                    />
                  </Nav.Link>
                </div>
              </>
            ) : (
              <>
                <Nav.Link href="/auth/sign-up" className="item-menu">
                  Đăng ký
                </Nav.Link>
                <Nav.Link href="/auth/sign-in" className="item-menu">
                  Đăng nhập
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderAdmin;
