import React, { useEffect } from "react";
import "./Footer.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      delay: 100,
    });
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <h3 data-aos="fade-zoom-in">Khách sạn Trường Văn</h3>
        <p>Địa chỉ: M16, đường số 10</p>
        <div className="footer-bottom" style={{ width: "97%" }}></div>
        <p>VanTruong &copy;2022 </p>
      </div>
    </footer>
  );
};

export default Footer;
