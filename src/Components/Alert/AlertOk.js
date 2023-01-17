import React from "react";
import Swal from "sweetalert2";

export const  AlertOk = (message) => {
    Swal.fire({
        title: "Thành công",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
      });
}
