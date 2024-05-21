import React, { useCallback } from "react";
import Swal from "sweetalert2";

const useNotifications = () => {
  const showNotification = useCallback((icon, title = "") => {
    const toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    toast.fire({
      icon,
      title,
      padding: "10px 20px",
      background: "#3b3f5c",
      color: "#fff",
    });
  }, []);

  const showAlertConfirmation = useCallback((icon, title, text) => {
    return Swal.fire({
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });
  }, []);

  return {
    showNotification,
    showAlertConfirmation,
  };
};

export default useNotifications;
