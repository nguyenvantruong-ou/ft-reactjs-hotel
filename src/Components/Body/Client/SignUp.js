import React from "react";
import Swal from "sweetalert2";

const SignUp = () =>{
    const getGenderValue = () => {
        var checkbox = document.getElementsByName("gender");
            for (var i = 0; i < checkbox.length; i++){
                if (checkbox[i].checked === true){
                    if (checkbox[i].value == "Nam")
                        return 1;
                    if (checkbox[i].value == "Nữ")
                        return 2;
                        return 3;
                }
            }
    }

    const showAlertError = (message) => {
        Swal.fire({
            title: "Lỗi",
            text: message,
            icon: "error",
            confirmButtonText: "OK",
          });
    }

    // getGenderValue()
    const checkValue = () => {
        if (document.getElementById('last-name').value.trim().length == 0 || 
        document.getElementById('first-name').value.trim().length == 0 ||
        document.getElementById('phone-number').value.trim().length == 0 ||
        document.getElementById('card-id').value.trim().length == 0 ||
        document.getElementById('last-name').value.trim().length == 0 ||
        document.getElementById('email').value.trim().length == 0 ||
        document.getElementById('password').value.trim().length == 0 ||
        document.getElementById('re-password').value.trim().length == 0 
        )
            showAlertError("Vui lòng nhập đầy đủ thông tin!")
        else {
            if(document.getElementById('password').value != document.getElementById('re-password').value)
            showAlertError("Mật khẩu không khớp")
            else {
                register()
            }
        }
    }

    const register = () => {

        const data = { 
            File : null,
            Email : document.getElementById('email').value.trim(), 
            Password : document.getElementById('password').value.trim(), 
            FirstName : document.getElementById('first-name').value.trim(), 
            LastName : document.getElementById('last-name').value.trim(), 
            Gender : getGenderValue(), 
            CardId : document.getElementById('card-id').value.trim(), 
            PhoneNumber : document.getElementById('phone-number').value.trim(),
            Address : null
        };
        console.log(data)
        fetch('https://localhost:7109/api/Account/auth/sign-up', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((results) => {
            console.log('Success:', results);
            if(results['code'] != 200)
                showAlertError(results['message']);
            if(results['code'] == 200) {
                document.cookie= "Email=" + results['data'] + "end-email";
                window.location.href = "http://localhost:3000/auth/confirm-account";
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }

    return <>
        <h1 style={{textAlign: "center"}}>Đăng ký</h1>
        <form style={{paddingLeft: "40%"}}>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Họ: <br/>
                    <input id="last-name" type="text" name="name" style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Tên: <br/>
                    <input id="first-name" type="text" name="name"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Giới tính: <br/>
                    <input id="gender-1" checked type="radio" name="gender" style={{marginLeft: "70px"}} value="Nam"/>Nam
                    <input id="gender-2" type="radio" name="gender" style={{marginLeft: "70px"}} value="Nữ" /> Nữ
                    <input id="gender-3" type="radio" name="gender" style={{marginLeft: "70px"}} value="Khác" /> Khác
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Ảnh đại diện: <br/>
                    <input id="avatar" type="file" name="avatar"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    CMND/CCCD: <br/>
                    <input id="card-id" type="text" name="card-id"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Số điện thoại: <br/>
                    <input id="phone-number" type="text" name="phone-number"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Địa chỉ:  <br/>
                    <input type="address" name="name"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Email: <br/>
                    <input id="email" type="email" name="Email"  style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Mật khẩu: <br/>
                    <input id="password" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            <div style={{marginBottom: "10px"}}>
                <label>
                    Nhập lại mật khẩu: <br/>
                    <input id="re-password" type="password" name="password" style={{width:"300px"}} />
                </label>
            </div>
            
            <input  style={{backgroundColor: "green", border: "2px solid #4CAF50", marginTop: "10px", marginLeft: "24%", padding: "10px"}} 
            type="button" value="Submit" onClick={checkValue} />
        </form>
        <br/><br/><br/><br/><br/><br/>
    </>
}

export default SignUp;