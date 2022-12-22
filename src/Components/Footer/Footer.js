import React from "react";
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Khách sạn Trường Văn</h3>
                <p>Địa chỉ: M16, đường số 10</p>
                <div className="footer-bottom" style={{width:'100%'}}>
                </div>
                <p>VanTruong &copy;2022 </p>
            </div>
        </footer>
    );
}

export default Footer