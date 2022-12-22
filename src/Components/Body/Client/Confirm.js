import React from "react";

const ConfirmCode = () => {
    const CheckCode = () => {
        var cookie = document.cookie; 
        var email = cookie.slice(cookie.indexOf("Email=") + 6, cookie.indexOf("end-email"))

        fetch('https://localhost:7109/api/Account/auth/confirm', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Code: GetCode(), Email: email}),
        })
          .then((response) => response.json())
          .then((results) => {
            console.log('Success:', results);

            window.location.href = "http://localhost:3000/auth/sign-in";
          })
          .catch((error) => {
            console.error('Error:', error);
          })
    }


    const GetCode = () => {
        var code1 = document.getElementById("code1").value;
        var code2 = document.getElementById("code2").value;
        var code3 = document.getElementById("code3").value;
        var code4 = document.getElementById("code4").value;
        var code5 = document.getElementById("code5").value;
        var code6 = document.getElementById("code6").value;
        var code = parseInt(code1 + code2 + code3 + code4 + code5 + code6);
        return code;
    }
    return <>
        <h1 style={{textAlign: "center"}}>Xác nhận</h1>
        <input id="code1" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px", marginLeft: "39%"}}/>
        <input id="code2" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px"}}/>
        <input id="code3" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px"}}/>
        <input id="code4" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px"}}/>
        <input id="code5" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px"}}/>
        <input id="code6" type="text" maxLength="1" style={{width: "40px", height: "40px", fontSize: "30px", paddingLeft: "20px", marginTop: "100px"}}
        onKeyDown={CheckCode}/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
}

export default ConfirmCode;