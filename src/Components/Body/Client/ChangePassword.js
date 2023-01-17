import React from "react";
import {URL} from "../../../Utils/Url";
import {AlertWarning} from "../../Alert/Warning"
import { AlertError } from "../../Alert/Error";
import { AlertOk } from "../../Alert/AlertOk";
import Swal from "sweetalert2";

const CheckValue =() => {
    if(document.getElementById("re-password-change").value.length < 6 || document.getElementById("password-change").value.length < 6
            || document.getElementById("old-password-change").value.length < 6)
        AlertWarning("Mật khẩu phải nhiều hơn 6 kí tự");
    else if(document.getElementById("re-password-change").value != document.getElementById("password-change").value)
            AlertWarning("Mật khẩu không khớp");
            else ChangePW();
        
}

const ChangePW = () => {
    fetch( URL + 'Account/auth/password', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Email: localStorage.getItem("Email"), 
                                NewPassword : document.getElementById("re-password-change").value,
                                OldPassword : document.getElementById("old-password-change").value
                                }),
        })
          .then((response) => response.json())
          .then((results) => { 
            console.log(results);
            if (results.code == 200) {
                Swal.fire({
                    title: "Đổi mật khẩu thành công",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                    confirmButtonText: "OK",
                  })
                  .then((willDelete) => {
                    if (willDelete.isConfirmed) { 
                        window.location.href = window.location.href.slice(0, window.location.href.indexOf("localhost") +  14);
                    } 
                    else {}
                  });
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
const ChangePassword = () => {
    return <>
        <h1 className="h1-title">Đổi mật khẩu</h1> <br/>
        <div className="change-pw-main">
            <div style={{marginBottom: "10px", marginTop: "40px"}}>
                <label>
                    Mật khẩu cũ: <br/>
                    <input id="old-password-change" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div><div style={{marginBottom: "10px"}}>
                <label>
                    Mật khẩu mới: <br/>
                    <input id="password-change" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Nhập lại mật khẩu mới: <br/>
                    <input id="re-password-change" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            <button className="btn-change-pw" onClick={CheckValue}>Cập nhật</button>
        </div>
    </>
}
export default  ChangePassword;