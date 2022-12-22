import logo from './logo.svg';
import Header from './Components/Header/Header';
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Components/Body/Home';

//client
import Services from './Components/Body/Client/Service';
import Feedback  from './Components/Body/Client/Service';
import Order from './Components/Body/Client/Order';
import SignUp from './Components/Body/Client/SignUp';
import ConfirmCode from './Components/Body/Client/Confirm';
//
import { Routes, Route } from 'react-router-dom';
import SignIn from './Components/Body/Client/SignIn';

function App() {
  return (
    <>
      <Header/>
        <Routes>
          
          <Route path="/" element={<Home/>}></Route>
          <Route path="/service" element={<Services/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
          <Route path="/feedback" element={<Feedback/>}></Route>
          <Route path='/auth/sign-up' element={<SignUp/>}></Route>
          <Route path='/auth/confirm-account' element={<ConfirmCode/>}></Route>
          <Route path='/auth/sign-in' element={<SignIn/>}></Route>


        </Routes>


      <Footer/>
    </>
  );
}

export default App;
