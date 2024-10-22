import { toast, ToastOptions } from "react-toastify";

// Use a regular variable to track toastId outside of React components
let toastId: string | number | null = null;

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
  // Ensure that the toast is only shown if there's no active toast
  if (toastId === null || !toast.isActive(toastId)) {
    toastId = toast.success(message, Toastobjects);
  }
};

export const showErrorToast = (message: string = "Action failed") => {
  // Ensure that the toast is only shown if there's no active toast
  if (toastId === null || !toast.isActive(toastId)) {
    toastId = toast.error(message, Toastobjects);
  }
};

export const resetToast = () => {
  // Reset the toastId
  toastId = null;
};
