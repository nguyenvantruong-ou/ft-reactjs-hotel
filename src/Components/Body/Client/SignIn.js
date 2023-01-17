import React from "react";
import "./SignIn.css"
import Swal from "sweetalert2";

const SignIn = () => {
    const AlertWarning = (message) => {
        Swal.fire({
            title: "Lỗi",
            text: message,
            icon: "warning",
            confirmButtonText: "OK",
          });
    }

    const logIn = () => {
        fetch('https://localhost:7109/api/Account/auth/sign-in', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Email: document.getElementById("email-si").value.trim(), 
                                Password : document.getElementById("password-si").value.trim()}),
        })
          .then((response) => response.json())
          .then((results) => { 
            console.log(results);
            if (results.code == 200) {
                // document.cookie= "Email=" + results.data.email + "end-email";
                // document.cookie= "Token=" + results.data.token + "end-token";
                localStorage.setItem("Id", results.data.id);
                localStorage.setItem("Email", results.data.email);
                localStorage.setItem("Token", results.data.token);
                localStorage.setItem("Role", results.data.role);
                localStorage.setItem("Avatar", results.data.avatar);
                localStorage.setItem("Name", results.data.name);
                
                window.location.href = window.location.href.slice(0, window.location.href.indexOf("/auth"));
            }
            else {
              AlertWarning(results.message);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            AlertWarning(error.message);
          })
    }

    const checkValue = () => { 
        if (document.getElementById("email-si").value.trim().length < 5 || document.getElementById("password-si").value.trim().length < 6)
            AlertWarning("Vui lòng kiểm tra lại!");
        else {
                logIn();
            }
    }

    return <>
        <h1 className="h1-title">Đăng nhập</h1> <br/>
        <div style={{marginLeft: "41%", marginTop: " 10px"}}>
            <div style={{marginBottom: "30px"}}>
                <label>Email: <br/>
                    <input id="email-si" type="email" name="Email"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>Mật khẩu: <br/>
                    <input id="password-si" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            <div>
                <button  id="button" onClick={checkValue}>Đăng nhập </button>
            </div>
            <a className="input-auth" href="/auth/forgot-password">Quên mật khẩu</a> 
            <a className="input-auth input-create-acc" href="/auth/sign-up">Tạo tài khoản</a> 

        </div> 
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
}

export default SignIn;


