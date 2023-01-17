import { render } from "@testing-library/react";
import React from "react";
import Swal from "sweetalert2";

export const AlertWarning = (message) => {
    Swal.fire({
        title: "Lỗi",
        text: message,
        icon: "warning",
        confirmButtonText: "OK",
      });
}
