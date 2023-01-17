import React from "react";
import Swal from "sweetalert2";

export const  AlertError = (message) => {
    Swal.fire({
        title: "Lỗi",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      });
}
