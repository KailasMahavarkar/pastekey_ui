import { AxiosError } from "axios";
import { useEffect } from "react";
import { env } from "./env";
import { tailcss, Mapper } from "./types/index";
import customToast from "./toast";

export const url = (endpoint: string) => {
	return `${env.SERVER_URL}${endpoint}`;
};

export const handleNetworkError = (error: any) => {
	let hasError = false;
	if (!window.navigator.onLine) {
		// internet is not working
		hasError = true;
		return customToast({
			message: "Internet connection is not available",
			icon: "error",
		});
	} else if (isNetworkError(error)) {
		hasError = true;
		return customToast({
			message: "Server is not available",
			icon: "error",
		});
	}
	return hasError;
};

export const isEmpty = (arg: any) => {
	if (arg == null) {
		return true;
	} else if (typeof arg === "undefined") {
		return true;
	} else if (arg.length === 0) {
		return true;
	} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
		return true;
	}
	return false;
};

export function useEffectAsync(effect: any, inputs: any) {
	useEffect(() => {
		effect();
	}, inputs);
}





// round number to 2 decimal places





export const randomBase62 = (length = 24) => {
	const characters =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
};

export function parseJwt(token: string) {
	try {
		const base64Payload = token.split(".")[1];
		const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	} catch (error) {
		console.log("token does not exists");
	}
}

// const HEADER_PAYLOAD = {
//     "content-type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
// }


export function isNetworkError(err: any) {
	return !!err.isAxiosError && !err.response;
}



const clover = (prefix: string, str = "") => {
	let result = "";

	const propMap = str.split(" ");

	// loop through each property
	for (let i = 0; i < propMap.length; i++) {
		if (propMap[i].startsWith(prefix)) {
			result += propMap[i] + " ";
		}
	}
	return result.trim();
};


export const copyHandler = (tag: string, service: "files" | "paste") => {
	let rPath = "";
	if (service === "files") {
		rPath = `${env.URL}/f/${tag}`;
	} else if (service === "paste") {
		rPath = `${env.URL}/r/${tag}`;
	}
	if (typeof navigator.clipboard == "undefined") {
		console.log("navigator.clipboard");
		const textArea = document.createElement("textarea");
		textArea.value = rPath;
		textArea.style.position = "fixed"; //avoid scrolling to bottom
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			const msg = successful ? "successful" : "unsuccessful";

			console.log("Copying text command was " + msg);
		} catch (err) {
			console.log("Oops, unable to copy");
		}
		document.body.removeChild(textArea);
	} else {
		navigator.clipboard?.writeText(rPath);
	}

	return rPath;
};

export const copyHandlerRaw = (text: string) => {
	if (typeof navigator.clipboard == "undefined") {
		console.log("navigator.clipboard");
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed"; //avoid scrolling to bottom
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			const msg = successful ? "successful" : "unsuccessful";
			console.log("Copying text command was " + msg);
		} catch (err) {
			console.log("Oops, unable to copy");
		}
		document.body.removeChild(textArea);
	} else {
		navigator.clipboard?.writeText(text);
	}
};

// typescript
// tail() function takes input as Type
// and returns key of Type with value of type string
export function tail<T>(
	object: Mapper<T, tailcss>,
	options = {
		hideKey: false,
	}
): Mapper<T, string> {
	const res: any = {};

	// loop through object
	for (const key in object) {
		// if key is not hidden
		const value: any = object[key];

		const smRes = value.sm;
		const mdRes = clover("md", value.md);
		const lgRes = clover("lg", value.lg);
		const xlRes = clover("xl", value.xl);

		res[key] = `${options.hideKey ? "" : key
			} ${smRes} ${mdRes} ${lgRes} ${xlRes}`.trim();
	}
	return res;
}

// // supports max depth of 2
// export function tailify<T>(object: T): MakeLastType<T, string> {
// 	const base: any = {};

// 	// loop through object
// 	for (const key in object) {
// 		base[key] = tail(object[key]);
// 	}
// 	return base;
// }








// export const useImage = (src: string) => {
// 	return new Promise((resolve, reject) => {
// 		resolve(src);
// 	},)
// }

interface IError {
	msg: string;
	data: any;
	error?: string;
	errors?: string[];
}

export const handleCustomError = (error: AxiosError<IError>) => {
	const errors = error.response?.data;

	// check if error exists and is an array
	if (errors && Array.isArray(errors)) {
		// show single error at top of stack
		return customToast({
			message: errors[0],
			icon: "error",
		});
	}

	if (error.response?.data.msg) {
		return customToast({
			message: error.response?.data.msg,
			icon: "error",
		});
	}
};
