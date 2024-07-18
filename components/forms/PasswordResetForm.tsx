import { handleCustomError } from "@/helper";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { env } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "@/components/AlertBox";

const PasswordResetForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const user = useSelector((state: any) => state.user);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const errorMap = Object.keys(errors).map(
		(key: string) => (errors as any)[key].message as string
	);

	const onSubmit = async (formData: any) => {
		try {
			// const result = await userAPI.login({
			// 	username: formData.username,
			// 	password: sha512(formData.password),
			// });
			// const payload = {
			// 	...parseJwt(result.data.data.accessToken),
			// 	accessToken: result.data.data.accessToken,
			// 	refreshToken: result.data.data.refreshToken,
			// };
			// // trigger dispatch for login action
			// dispatch(userActions.addLogin(payload));
			// // dispatch(addLogin(payload));
			// // router.replace("/");
			// customToast({
			// 	message: "Login Successful",
			// 	icon: "success",
			// });
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
						<span className="label-text">Password</span>
					</label>
					<input
						type={showPassword ? "text" : "password"}
						className="input input-bordered"
						{...register("password", {
							required: "password is Required",
						})}
					/>
					<label className="label-text">
						<FontAwesomeIcon
							onClick={() => {
								setShowPassword(!showPassword);
							}}
							icon={showPassword ? faEye : faEyeSlash}
						/>
					</label>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Confirm Password</span>
					</label>
					<input
						type={showConfirmPassword ? "text" : "password"}
						className="input input-bordered"
						{...register("confirmPassword", {
							required: "password is Required",
						})}
					/>
					<label className="label-text">
						<FontAwesomeIcon
							onClick={() => {
								setShowConfirmPassword(!showConfirmPassword);
							}}
							icon={showConfirmPassword ? faEye : faEyeSlash}
						/>
					</label>
				</div>
				<div className="form-control mt-2">
					<button
						className="btn btn-primary"
						onClick={handleSubmit(onSubmit)}
					>
						Change Password
					</button>
				</div>
			</div>
		</>
	);
};

export default PasswordResetForm;
