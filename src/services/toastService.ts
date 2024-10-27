import { toast, ToastOptions } from "react-toastify";

const Toastobjects: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showSuccessToast = (message: string = "Action successful") => {
  toast.success(message, Toastobjects);
};

export const showErrorToast = (message: string = "Action failed") => {
  toast.error(message, Toastobjects);
};
