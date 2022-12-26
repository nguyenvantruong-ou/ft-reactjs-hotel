import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

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

    const register = async () => {

        const formData = new FormData();
        formData.append("File", document.getElementById('avatar').files[0]);
        formData.append("Email" ,document.getElementById('email').value.trim());
        formData.append("Password" , document.getElementById('password').value.trim() );
        formData.append("FirstName" , document.getElementById('first-name').value.trim());
        formData.append("LastName" , document.getElementById('last-name').value.trim());
        formData.append("Gender" , getGenderValue());
        formData.append("CardId" , document.getElementById('card-id').value.trim());
        formData.append("PhoneNumber" , document.getElementById('phone-number').value.trim());
        formData.append("Address", null);
        console.log([...formData])

        try {
            const res = await axios.post("https://localhost:7109/api/Account/auth/sign-up", formData);

            console.log(res)
        } catch (e) { 
            console.log(e)
        }
        // fetch('https://localhost:7109/api/Account/auth/sign-up', {
        //   method: 'POST', // or 'PUT'
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   body: formData,
        // })
        //   .then((response) => response.json())
        //   .then((results) => {
        //     console.log('Success:', results);
        //     if(results['code'] != 200)
        //         showAlertError(results['message']);
        //     if(results['code'] == 200) {
        //         document.cookie= "Email=" + results['data'] + "end-email";
        //         window.location.href = "http://localhost:3000/auth/confirm-account";
        //     }
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });
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
                    <input id="gender-1" defaultChecked type="radio" name="gender" style={{marginLeft: "70px"}} value="Nam"/>Nam
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