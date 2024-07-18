import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
	url,
	tail,
	useEffectAsync,
	isEmpty,
	handleNetworkError,
} from "@/helper";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import { cres } from "@/types";
import customToast from "@/toast";
import { sha512 } from "js-sha512";

const style_login = {
	wrapper: {
		sm: "flex flex-col w-full",
		lg: "lg:flex-row ",
	},
	form: {
		sm: "flex items-center flex-col  p-3 m-3 rounded-md ",
		lg: "lg:w-1/2",
	},
	head: {
		sm: "font-lg text-lg font-bold",
	},
	form_child: {
		sm: "flex items-center w-full flex-col",
	},

	input: {
		sm: "input input-bordered  w-full max-w-xs m-2",
	},
	banner: {
		sm: "hidden md:block",
		md: "md:flex md:items-center md:justify-center md:w-full md:h-full lg:w-1/2",
	},
	login_button: {
		sm: "btn btn-primary w-[100%] max-w-xs m-2",
	},
	register_button: {
		sm: "btn btn-accent w-[100%] max-w-xs m-2",
	},

	checkbox_span: {
		sm: "text-xs leading-3",
	},
	checkbox_div: {
		sm: "flex justify-between pl-20 pr-20",
	},
	checkbox: {
		sm: "mr-3 text-lg",
	},
};

const style = tail(style_login);

function RegisterForm() {
	const { register, setFocus, handleSubmit } = useForm({
		shouldFocusError: true,
	});

	const router = useRouter();

	// handling server side errors
	const [serverError, setServerError] = useState({
		user_exists: false,
		email_exists: false,
	});

	useEffect(() => {
		setFocus("email");
	}, [setFocus]);

	useEffectAsync(async () => {
		if (!router.isReady) return;

		if (!isEmpty(router.query?.mailtoken)) {
			// api call to verify mail token
			try {
				const result: cres = await axios.post(url("/auth/mailverify"), {
					token: router.query?.mailtoken,
				});

				if (result.data.status === "success") {
					customToast({
						icon: "success",
						message: "Mail verified successfully",
					});
				}
			} catch (error: any) {
				if (handleNetworkError(error)) return;

				// push to register page if token is invalid
				router.push("/register");

				return customToast({
					icon: "error",
					message: error?.response?.data?.msg,
				});
			}
		}
	}, [router.isReady]);

	const formSubmitHandler = async (data: any) => {
		setFocus("username");

		if (serverError.email_exists) {
			setFocus("email");
			return;
		}
		if (serverError.user_exists) {
			setFocus("username");
			return;
		}

		if (data.check) {
			try {
				await axios.post(url("/auth/register"), {
					...data,
					password: sha512(data?.password),
				});

				customToast({
					icon: "success",
					timer: 5000,
					message:
						"Email has been sent please check primary/spam/promotion folder",
				});
				router.push("/login");
			} catch (error: any) {
				if (handleNetworkError(error)) return;

				if (error.response?.data?.success === "resend") {
					customToast({
						icon: "warning",
						message: error.response?.data?.msg,
					});
				}
				const msg = error.response?.data?.msg;

				if (msg === "Username already exists") {
					setServerError({ ...serverError, user_exists: true });
				} else if (msg === "Email is linked with another username") {
					setServerError({ ...serverError, email_exists: true });
				}
			}
		}
	};
	return (
		<div className={style.wrapper}>
			<form
				onSubmit={handleSubmit(formSubmitHandler)}
				className={style.form}
			>
				<p className={style.head}>Register to become member</p>

				<input
					type="email"
					placeholder="Enter Email"
					className={style.input}
					{...register("email", {
						required: "email is Required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "invalid email address",
						},
						onChange: (e: any) => {
							setServerError({
								...serverError,
								email_exists: false,
							});
						},
					})}
				/>
				{serverError.email_exists && (
					<label className="label">
						<span className="label-text text-red-400 ">
							Email already linked with another username
						</span>
					</label>
				)}

				<input
					type="text"
					placeholder="Enter Username"
					className={style.input}
					{...register("username", {
						required: "username is Required",
						pattern: {
							value: /^[A-Za-z0-9]+$/i,
							message: "invalid username type",
						},

						onChange: (e: any) => {
							setServerError({
								...serverError,
								user_exists: false,
							});
						},
					})}
				/>
				{serverError.user_exists && (
					<label className="label">
						<span className="label-text text-red-400 ">
							Username already exists
						</span>
					</label>
				)}

				<input
					type="password"
					placeholder="Enter Password"
					className={style.input}
					{...register("password", {
						required: "Password is required",
					})}
				/>

				<label className="label flex flex-row cursor-pointer">
					<input
						type="checkbox"
						// checked={true}
						required={true}
						className="checkbox checkbox-primary mr-3"
						{...register("check")}
					/>
					<span className="label-text text-xs ">
						You must agree to the terms and conditions
					</span>
				</label>

				<button className={style.login_button} type="submit">
					Submit
				</button>
				<Link href="/login" passHref>
					<button className={style.register_button}>
						Already Registered ? Login Now
					</button>
				</Link>
			</form>
			<div className={style.banner}>
				<Image
					width={400}
					height={300}
					src="/svg/LoginIcon.svg"
					alt="login-icon"
					// scroll to top
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				/>
			</div>
		</div>
	);
}

export default RegisterForm;
