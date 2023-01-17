import logo from "./logo.svg";
import Header from "./Components/Header/Header";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Body/Home";

import ScrollToTopButton from "./Utils/ScrollToTopButton";

//client
import Services from "./Components/Body/Client/Service";
import Feedback from "./Components/Body/Client/Feedback";
import Order from "./Components/Body/Client/Order";
import SignUp from "./Components/Body/Client/SignUp";
import ConfirmCode from "./Components/Body/Client/Confirm";
import RoomDetail from "./Components/Body/Client/RoomDetail/RoomDetail";
import History from "./Components/Body/Client/History";

//
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/Body/Client/SignIn";
import ForgotPassword from "./Components/Body/Client/ForgotPassword.js";
import Profile from "./Components/Body/Client/Profile";
import ChangePassword from "./Components/Body/Client/ChangePassword";

// admin
import HeaderAdmin from "./Components/Body/Admin/Header/HeaderAdmin.js";
import HomeAdmin from "./Components/Body/Admin/Templates/HomeAdmin.js";
import AccountManagement from "./Components/Body/Admin/Templates/AccountManagement/AccountManagement";
import RoomManagement from "./Components/Body/Admin/Templates/RoomManagement/RoomManagement";
import ServiceManagement from "./Components/Body/Admin/Templates/ServiceManagement";
import UpdateRoom from "./Components/Body/Admin/Templates/RoomManagement/UpdateRoom";
import CreateRoom from "./Components/Body/Admin/Templates/RoomManagement/CreateRoom";
import Updateaccount from "./Components/Body/Admin/Templates/AccountManagement/UpdateAccount";
import CreateAccount from "./Components/Body/Admin/Templates/AccountManagement/CreateAccount";
import Visitor from "./Components/Body/Admin/Templates/Statistic/Visitor";
import VisitorTotal from "./Components/Body/Admin/Templates/Statistic/VisitorTotal";
import ListOrder from "./Components/Body/Client/ListOrder";
import CreateOrder from "./Components/Body/Client/CreateOrder";

function App() {
  return (
    <>
      {window.location.href.slice(
        window.location.href.indexOf("localhost") + 15,
        window.location.href.indexOf("localhost") + 20
      ) == "admin" ? (
        <>
          <HeaderAdmin />
          <Routes>
            <Route path="/admin" element={<HomeAdmin />}></Route>
            <Route
              path="/admin/visitor-total"
              element={<VisitorTotal />}
            ></Route>
            <Route
              path="/admin/visitor-statistics"
              element={<Visitor />}
            ></Route>
            <Route
              path="/admin/room-management"
              element={<RoomManagement />}
            ></Route>
            <Route
              path="/admin/room-management/:id/:slug"
              element={<UpdateRoom />}
            ></Route>
            <Route
              path="/admin/room-management/create"
              element={<CreateRoom />}
            ></Route>
            <Route
              path="/admin/account-management"
              element={<AccountManagement />}
            ></Route>
            <Route
              path="/admin/account-management/:id/:card"
              element={<Updateaccount />}
            ></Route>
            <Route
              path="/admin/account-management/create"
              element={<CreateAccount />}
            ></Route>
            <Route
              path="/admin/service-management"
              element={<ServiceManagement />}
            ></Route>
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/service" element={<Services />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/create-order" element={<CreateOrder />}></Route>
            <Route path="/history" element={<History />}></Route>
            <Route path="/feedback" element={<Feedback />}></Route>
            <Route path="/auth/sign-up" element={<SignUp />}></Route>
            <Route path="/list-order" element={<ListOrder />}></Route>
            <Route
              path="/auth/confirm-account"
              element={<ConfirmCode />}
            ></Route>
            <Route path="/auth/sign-in" element={<SignIn />}></Route>
            <Route
              path="/auth/forgot-password"
              element={<ForgotPassword />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
            <Route path="/room/:id/:slug" element={<RoomDetail />}></Route>
          </Routes>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
