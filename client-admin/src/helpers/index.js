import Swal from "sweetalert2";

const Toast = Swal.mixin({
  color: "white",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
    toast.addEventListener("click", Swal.close);
  },
});

export function dateFormat(date) {
  const option = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  date = new Date(date);
  return date.toLocaleDateString("id-ID", option);
}

export function rupiahFormat(num) {
  return `Rp. ${num.toLocaleString("id-ID")}`;
}

export function handleError(message) {
  Toast.fire({
    background: "#600000",
    icon: "error",
    title: message,
  });
}

export function handleSuccess(message) {
  Toast.fire({
    background: "#006000",
    icon: "success",
    title: message,
  });
}
