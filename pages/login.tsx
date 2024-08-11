import { useForm } from "react-hook-form";
import { parseJwt, handleCustomError } from "@/helper";
import { useRouter } from "next/router";

import customToast from "@/toast";
import { sha512 } from "js-sha512";
import { env } from "@/env";
import Image from "next/image";
import AlertBox from "@/components/AlertBox";
import { userAPI } from "@/api";
import { userActions } from "@/redux/services/userService";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import PasswordResetMailForm from "@/forms/PasswordResetMailForm";
import PasswordContext, { stepFormType } from "@/context/password.context";
import Button from "@/components/Button";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { setStep } = useContext(PasswordContext);
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const errorMap = Object.keys(errors).map(
		(key: string) => (errors as any)[key].message as string
	);

	const onSubmit = async (formData: any) => {
		try {
			const result = await userAPI.login({
				username: formData.username,
				password: sha512(formData.password),
			});

			const payload = parseJwt(result.data.data.accessToken);

			// remove tokens from payload
			payload["accessToken"] = undefined;
			payload["refreshToken"] = undefined;

			// set token to local storage
			localStorage.setItem("accessToken", result.data.data.accessToken);
			localStorage.setItem("refreshToken", result.data.data.refreshToken);

			// trigger dispatch for login action
			dispatch(userActions.addLogin(payload));

			router.replace("/dashboard");
			customToast({
				message: "Login Successful",
				icon: "success",
			});
		} catch (error: any) {
			handleCustomError(error);
		}
	};

	return (
		<>
			{errorMap.length > 0 &&
				errorMap.map((error, index) => (
					<AlertBox
						icon="warning"
						className="mt-3 py-2 rounded-md text-base"
						key={index}
					>
						{error}
					</AlertBox>
				))}
			<div className="card-body">
				{errorMap.length === 0 && (
					<span className="text-lg font-bold text-center ">
						Login to {env.APP_WITH_DOMAIN}
					</span>
				)}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Username / Email</span>
					</label>
					<input
						type="text"
						className="input input-bordered"
						{...register("username", {
							required: "username is Required",
							pattern: {
								value: /^[A-Za-z0-9]+$/i,
								message: "invalid username type",
							},
						})}
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						type={showPassword ? "text" : "password"}
						placeholder=""
						className="input input-bordered"
						{...register("password", {
							required: "Password is required",
						})}
					/>
					<label className="label ">
						<span className="label-text-alt">
							<p
								className="error link"
								onClick={() => {
									setStep("forgot-password");
									// console.log("clicked", forgotPassword);
									// setForgotPassword();
								}}
							>
								Forgot password?
							</p>
						</span>
						<span className="label-text">
							<FontAwesomeIcon
								color={`${showPassword ? "red" : "gray"}`}
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								icon={faEye}
							/>
						</span>
					</label>
				</div>
				<div className="form-control mt-2">
					<Button
						className="btn btn-primary"
						onClick={handleSubmit(onSubmit)}
                        accessibleName="Login"
					>
						Login
					</Button>
				</div>
			</div>
		</>
	);
};

function Login() {
	const [step, setStep] = useState<stepFormType>("login");

	return (
		<PasswordContext.Provider
			value={{
				step: step,
				setStep: setStep,
			}}
		>
			<div className="grid place-content-center min-h-screen shadow m-auto">
				<div className="flex m-auto p-5 flex-col w-auto lg:flex-row justify-evenly ">
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						{step === "login" ? (
							<LoginForm />
						) : (
							<PasswordResetMailForm />
						)}
					</div>

					<div className="relative lg:w-1/2">
						<Image
							width={800}
							height={100}
							className="m-auto "
							src="/svg/LoginIcon.svg"
							alt={""}
						/>
					</div>
				</div>
			</div>
		</PasswordContext.Provider>
	);
}

export default Login;
