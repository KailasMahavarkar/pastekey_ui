import Swal from "sweetalert2";
import { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import { callbackFunctionType } from "@/types";
interface Itoast {
    message?: string;
    position?: SweetAlertPosition;
    icon?: SweetAlertIcon;
    timer?: number;
}

interface ExtendedIToast extends Itoast {
    delay?: number | 2000;
}

const customToast = (toast: ExtendedIToast, callback?: callbackFunctionType) => {
    const timer = toast.timer || 2000;
    const position = toast.position || "top-end";
    const icon = toast.icon || "error";

    const message = toast.message || "something went wrong";
    const delay = toast.delay || 0;

    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    setTimeout(() => {
        Toast.fire({
            icon: icon,
            title: message,
        }).then(() => {
            callback && callback();
        });
    }, delay)
};






export default customToast;
