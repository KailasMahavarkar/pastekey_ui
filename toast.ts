import Swal from "sweetalert2";
import { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
export interface Itoast {
	message?: string;
	position?: SweetAlertPosition;
	icon?: SweetAlertIcon;
	timer?: number;
}

export interface ExtendedIToast extends Itoast {
	delay?: number | 2000;
}

const customToast = (toast: ExtendedIToast) => {
	let timer = toast.timer || 2000;
	let position = toast.position || "top-end";
	let icon = toast.icon || "error";

	let message = toast.message || "something went wrong";
	let delay = toast.delay || 0;

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
		});
	}, delay);
};

export const customToastChain = ({
	toasts,
	delay,
}: {
	toasts: ExtendedIToast[];
	delay?: number;
}) => {

	let maxAllowedDelay = 6000;

	let minDelay = 3000;
	let maxDelay = 5000;

	toasts.forEach((toast) => {
		toast.delay = toast.delay || 0;

		minDelay = Math.min(minDelay, toast.delay);
		maxDelay = Math.max(maxDelay, toast.delay);
	})

	let finalDelay = delay || 0;

	minDelay = Math.max(minDelay, finalDelay);
	maxDelay = Math.min(maxDelay, maxAllowedDelay);


	// loop through toasts
	toasts.forEach((toast, index) => {
		// first toast will be shown immediately all subsequent toasts will be shown after the delay
		if (index === 0) {
			customToast(toast);
		}
		// if delay is not provided then default delay will be 2000
		else {
			customToast({
				...toast,
				delay: (minDelay + finalDelay) * index,
			});
		}
	});
};

export const networkDownToast: Function = (): void => {
	customToast({
		message: "Network down",
		position: "top-right",
		icon: "error",
		timer: 3000,
	});
};

export const serverDownToast: Function = (): void => {
	customToast({
		message: "Network error",
		position: "top-right",
		icon: "error",
		timer: 3000,
	});
};

export const keyErrorToast: Function = (
	type: "password" | "masterkey"
): void => {
	if (type === "password") {
		customToast({
			message: "Password mismatch",
			position: "top-right",
			icon: "error",
			timer: 3000,
		});
	}

	if (type === "masterkey") {
		customToast({
			message: "Masterkey mismatch",
			position: "top-right",
			icon: "error",
			timer: 3000,
		});
	}
};

export const toast = {
	networkDownToast,
	serverDownToast,
	keyErrorToast,
};

export default customToast;
