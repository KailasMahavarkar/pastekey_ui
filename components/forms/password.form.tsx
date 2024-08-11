import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sha512 } from "js-sha512";
import { useState } from "react";
import { handleNetworkError } from "@/helper";
import axios from "@/service/axios.service";
import customToast from "@/toast";
import Button from "../Button";

const PasswordForm = () => {
	const [pass, setPassword] = useState({
		password: "",
		confirmPassword: "",
		showPassword: false,
		showConfirmPassword: false,
		error: false,
	});

	// password change handler
	const formSubmitHandler = async (e: any) => {
		e.preventDefault();

		// if password is empty
		if (!pass.password || !pass.confirmPassword) {
			return customToast({
				icon: "error",
				message: "Password cannot be empty",
			});
		}

		// if password and confirm password are not same
		if (pass.password !== pass.confirmPassword) {
			return customToast({
				icon: "error",
				message: "Password mismatch",
			});
		}

		// if password is less than 8 characters
		if (pass.password.length < 6) {
			return customToast({
				icon: "error",
				message: "Password must be at least 6 characters",
			});
		}

		try {
			const result = await axios.patch("/user/password-update", {
				password: sha512(pass.password),
			});

			// clear password fields
			setPassword({
				password: "",
				confirmPassword: "",
				showPassword: false,
				showConfirmPassword: false,
				error: false,
			});

			customToast({
				icon: "success",
				message: result.data?.msg,
			});
		} catch (error: any) {
			if (handleNetworkError(error)) return;

			customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	};

	// password change handler
	const passwordChangeHandler = (e: any) => {
		setPassword({
			...pass,
			password: e.target.value,
			error: e.target.value !== pass.confirmPassword,
		});
	};

	// confirm password change handler
	const confirmPasswordChangeHandler = (e: any) => {
		setPassword({
			...pass,
			confirmPassword: e.target.value,
			error: e.target.value !== pass.password,
		});
	};

	return (
		<>
			<h1 className="flex w-full justify-center">Update Password</h1>
			<div className="divider-100"></div>

			<div className="form-control ">
				<p className="label text-red-500 justify-center ">
					{pass.error && "password does not match"}
				</p>
			</div>

			{/* password */}
			<div className="form-control ">
				<label className="label">
					<span className="label-text">New Password</span>

					<span className="label-text">
						<FontAwesomeIcon
							icon={faEye as IconProp}
							onClick={() => {
								setPassword({
									...pass,
									showPassword: !pass.showPassword,
								});
							}}
							color={pass.showPassword ? "red" : "black"}
						/>
					</span>
				</label>
				<input
					type={pass.showPassword ? "text" : "password"}
					className="input input-bordered"
					value={pass.password}
					onChange={(e) => passwordChangeHandler(e)}
				/>
			</div>

			{/* confirm password */}
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Confirm Password</span>
					<span className="label-text">
						<FontAwesomeIcon
							icon={faEye as IconProp}
							onClick={() => {
								setPassword({
									...pass,
									showConfirmPassword:
										!pass.showConfirmPassword,
								});
							}}
							color={pass.showConfirmPassword ? "red" : "black"}
						/>
					</span>
				</label>
				<input
					type={pass.showConfirmPassword ? "text" : "password"}
					className="input input-bordered"
					value={pass.confirmPassword}
					onChange={(e) => confirmPasswordChangeHandler(e)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							formSubmitHandler(e);
						}
					}}
				/>
			</div>

			{/* Button */}
			<div className="form-control flex">
				<Button
					className="btn btn-outline placeholder:btn-primary mt-4"
					onClick={formSubmitHandler}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							formSubmitHandler(e);
						}
					}}
                    accessibleName="Apply changes"
				>
					Apply changes
				</Button>
			</div>
		</>
	);
};

export default PasswordForm;
