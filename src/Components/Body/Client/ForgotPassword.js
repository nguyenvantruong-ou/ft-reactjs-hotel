import React from "react";
import '../css/General.css';
import Swal from "sweetalert2";
import ConfirmCode from "./Confirm";
import {URL} from "../../../Utils/Url";

const ForgotPassword = () => {
    const AlertWarning = (message) => {
        Swal.fire({
            title: "Lỗi",
            text: message,
            icon: "warning",
            confirmButtonText: "OK",
          });
    }
    const AlertError = (message) => {
        Swal.fire({
            title: "Lỗi",
            text: message,
            icon: "error",
            confirmButtonText: "OK",
        });
    }

    const AlertOk = (message) => {
        Swal.fire({
            title: "Thành công",
            text: message,
            icon: "success",
            confirmButtonText: "OK",
        });
    }

    const SendCode = () => {
        if(document.getElementById("email-fg").value.length < 6)
            AlertWarning("Vui lòng kiểm tra lại!");
        else {
            fetch(URL + 'Account/auth/code', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Email: document.getElementById("email-fg").value}),
        })
        .then((response) => response.json())
        .then((results) => { 
            if (results.code == 200) {
                AlertOk("Vui lòng kiểm tra email của bạn");
                localStorage.setItem("Email", document.getElementById("email-fg").value);
                document.getElementById("code-confirm-fg").value = "";
                document.getElementById("hidden-code").style.opacity = 1;
            }
            else {
                AlertError(results.message);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          })
          
        }
    }

    const ComfirmCodeFG = () => {
        if (document.getElementById("code-confirm-fg").value.length == 6) {
            fetch(URL + 'Account/auth/confirm', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
            },
                body: JSON.stringify({Code: document.getElementById("code-confirm-fg").value, 
                                        Email: localStorage.getItem("Email")}),
            })
            .then((response) => response.json())
            .then((results) => { 
                console.log(results);
                if (results.code == 200) { 
                    AlertOk("Vui lòng đặt lại mật khẩu");
                    document.getElementById("send-code-fg").style.display = "none";
                    document.getElementById("reset-pw-fg").style.display = "block";
                }
                else {
                AlertError(results.message);
                document.getElementById("code-confirm-fg").value = "";
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
          
        }
    }

    const ResetPw = () => {
        if(document.getElementById("password-fg").value.length < 5 || 
            document.getElementById("password-again-fg").value.length < 5 )
            AlertWarning("Mật khẩu phải trên 6 kí tự!")
        else if (document.getElementById("password-fg").value != document.getElementById("password-again-fg").value)
            AlertWarning("Mật khẩu không khớp")
            else {
                fetch(URL + 'Account/auth/password', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                },
                    body: JSON.stringify({Email: localStorage.getItem("Email"), 
                                        Password: document.getElementById("password-fg").value}),
                })
                .then((response) => response.json())
                .then((results) => { 
                    console.log(results);
                    if (results.code == 200) { 
                        window.location.href = window.location.href.slice(0, window.location.href.indexOf("/auth")) + "/auth/sign-in";
                    }
                    else {
                        AlertError(results.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                }
    }

    return <>
        <h1 className="h1-title">Quên mật khẩu</h1>
        <div id="send-code-fg" style={{ marginLeft: "41%", marginTop: "70px"}}>
                <label>Email của bạn: <br/>
                    <input id="email-fg" type="email" name="Email"  style={{width:"300px", height: "30px"}} />
                </label>
                <button className="button-send-pw" onClick={SendCode}>
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                </button> 
                <div id="hidden-code">
                    <div>Chúng tôi đã gửi mã xác nhận qua email của bạn.</div>
                    <div>Mã xác nhận của bạn là: <input type="text" id="code-confirm-fg"  style={{width:"100px"}} 
                        onKeyUp={ComfirmCodeFG}/></div>
                </div>
        </div>
        <div id="reset-pw-fg"  style={{ marginLeft: "41%", marginTop: "30px", display: "none"}}>
            <div>
                <label>
                    Mật khẩu: <br/>
                    <input id="password-fg" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div><br/>
            <div>
                <label>
                    Nhập lại mật khẩu: <br/>
                    <input id="password-again-fg" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            <div>
                <button className="button-reset-pw" onClick={ResetPw}>Xác nhận</button>
            </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
}

export default ForgotPassword