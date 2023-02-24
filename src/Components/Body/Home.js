import React, { useEffect } from "react";
import CarouselHome from "./Carousel";
import { ReactDOM } from "react";
import Rooms from "./Client/Rooms";
import "../../Library/animate/animate.css";
import "../../Library/animate/animate.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      delay: 100,
    });
  }, []);

  return (
    <>
      {/* <div>
        <CarouselHome />
      </div> */}
      <div className="content-banner">
        <div>
          <div className="animated zoomIn">Truong Van</div>
          <div className=" animated slideInLeft">HOTEL</div>
        </div>
        <div
          style={{ marginTop: "150px", zIndex: "1", position: "relative" }}
          className="animated slideInRight"
        >
          <hr className="line1" style={{ marginTop: "40px" }} />
          <hr className="line2" />
          <hr className="line1" />
        </div>
        <div
          style={{
            marginTop: "40px",
            color: "white",
            position: "relative",
            zIndex: 13,
            letterSpacing: "0.03em",
            fontSize: "18px",
          }}
          className="animated slideInUp"
        >
          In our hotel you will find everything you need to enjoy your vacation
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="info-intro">
        <div
          data-aos="fade-right"
          style={{
            visibility: "visible",
            animationName: "slideInLeft",
          }}
        >
          <h1>Khách sạn Trường Văn</h1>
          <div
            style={{ backgroundColor: "black", height: "2px", width: "30%" }}
          ></div>
          <p>
            Khám phá Trường Văn tại Huế, khách sạn ngay sát sông Hương, có vị
            trí và tầm nhìn đẹp nhất Thành phố Huế, kết hợp dịch vụ tận tâm cùng
            những trải nghiệm văn hóa độc đáo sẽ để lại trong bạn những dấu ấn
            khó quên.
          </p>
          <p>
            Khách sạn có không gian rộng lớn nhất nội đô Huế, Trường Văn giống
            như một resort tọa lạc giữa một khu vườn xanh mát, ngay trong khu
            vực trung tâm nhìn ra khu “Phố Tây”, nơi mang vẻ đẹp của quá khứ và
            tương lai trộn lẫn. Kinh Thành cổ kính với cầu Trường Tiền, nơi con
            sông Hương ngàn năm tuổi uốn lượn qua những bảo tàng hay phòng tranh
            hiện đại, những con phố Tây sầm uất, nhộn nhịp ngày đêm với cửa
            hàng, bar, pub mang lại vẻ đẹp thật sống động cho Huế.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <div className="img-info-home">
            <div data-aos="fade-down-right">
              <img src="https://res.cloudinary.com/dykzla512/image/upload/v1676864132/HotelManagement/Home1_t6ezeh.jpg" />
            </div>
            <div data-aos="zoom-in-up">
              <img src="https://res.cloudinary.com/dykzla512/image/upload/v1676864187/HotelManagement/Home2_bri3qp.jpg" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <hr style={{ color: "#d37428" }} />
      <div className="intro-2">
        <div>
          <div data-aos="zoom-in-right">
            <img src="https://res.cloudinary.com/dykzla512/image/upload/v1676975610/HotelManagement/bn3_axh9xe.jpg" />
          </div>
          <div data-aos="flip-left">
            <div>LƯU TRÚ RỘNG RÃI TRONG THÀNH PHỐ</div>
            <hr style={{ color: "black", width: "30%" }} />
            <p>
              Đắm mình trong khung cảnh ngoạn mục của sông Hương của chúng tôi
              từ các phòng và dãy phòng khách sạn lớn nhất của Thành phố Huế.
            </p>
          </div>
        </div>
      </div>
      <hr style={{ color: "#d37428" }} id="rooms" />
      <div>
        <h2 id="list-rooms" className="wow zoomIn" data-aos="fade-up">
          Danh sách phòng
        </h2>
        <hr
          data-aos="fade-left"
          style={{ height: "2px", width: "7%", background: "#935f00" }}
        />

        <br />
        <Rooms />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};
export default Home;
