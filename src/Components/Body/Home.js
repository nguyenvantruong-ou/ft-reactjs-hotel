import React from "react";
import CarouselHome from "./Carousel";
import { ReactDOM } from "react";
import Rooms from "./Client/Rooms";

const Home = () => {
  return (
    <>
      {" "}
      <div>
        <CarouselHome />
      </div>
      <hr style={{ color: "#d37428" }} />
      <div>
        <h2 id="list-rooms">Phòng</h2>
        <Rooms />
      </div>
    </>
  );
};
export default Home;
