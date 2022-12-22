import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import "./Header.css"

import Services from "../Body/Client/Service";
// import 'bootstrap/dist/css/bootstrap.min.css';

//

const Header = () => {
    return(
        <>
            <Navbar>
                <Container className="background-header">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="item-menu">
                        Trang chủ
                        </Nav.Link>
                        <Nav.Link href="/" className="item-menu">
                        Phòng
                        </Nav.Link>
                        <Nav.Link href="/service" className="item-menu">
                        Dịch vụ
                        </Nav.Link>
                        <Nav.Link href="/order" className="item-menu">
                        Đặt phòng
                        </Nav.Link> 
                        <Nav.Link href="/feedback" className="item-menu">
                        Phản hồi
                        </Nav.Link>
                        <Nav.Link href="/auth/sign-up" className="item-menu">
                        Đăng ký
                        </Nav.Link>
                        <Nav.Link href="/auth/sign-in" className="item-menu">
                        Đăng nhập
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            
        </>
    )
}


export default Header;