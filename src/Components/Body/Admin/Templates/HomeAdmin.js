import React from "react";
import Revenue from "./Statistic/Revenue";
import Visitor from "./Statistic/Visitor";
import VisitorTotal from "./Statistic/VisitorTotal";
import HeaderAdmin from "../../Admin/Header/HeaderAdmin";

const HomeAdmin = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Doanh thu</h1>
      <div style={{ marginBottom: "200px" }}>
        <div>
          <Revenue />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
