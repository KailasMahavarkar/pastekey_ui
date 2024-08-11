import { handleCustomError } from "@/helper";
import { userAPI } from "@/api";
import customToast from "@/toast";
import { env } from "process";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import AlertBox from "@/components/AlertBox";
import PasswordContext from "@/context/password.context";
import Button from "../Button";

const PasswordResetMailForm = () => {
	const { setStep } = useContext(PasswordContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			token: "",
			password: "",
			confirmPassword: "",
		},
	});

	const errorMap = Object.keys(errors).map(
		(key: string) => (errors as any)[key].message as string
	);

	const sendRecoveryEmail = async (formData: any) => {
		try {
			const result = await userAPI.resetPassword({
				email: formData.email,
			});

			if (result.status === 200) {
				customToast({
					message: `Mail sent, Kindly check your primary, spam and promotions folder`,
					icon: "warning",
					timer: 5000,
				});
			}
		} catch (error: any) {
			handleCustomError(error);
		}

		setTimeout(() => {
			setStep("login");
		}, 3000);
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
			<form
				className="card-body"
				onSubmit={handleSubmit(sendRecoveryEmail)}
			>
				{errorMap.length === 0 && (
					<span className="text-lg font-bold text-center ">
						Login to {env.APP_WITH_DOMAIN}
					</span>
				)}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Registered Email</span>
					</label>
					<input
						type="email"
						className="input input-bordered"
						placeholder="Enter your email"
						{...register("email", {
							required: "Email is required",
						})}
					/>
				</div>
				<div className="form-control mt-2">
					<Button
						type="submit"
						className="btn btn-primary"
						value="submit"
                        accessibleName="Send Recovery Email"
					>
						Send Recovery Email
					</Button>
				</div>
				<div
					className="text-center text-sm text-primary cursor-pointer mt-2"
					onClick={(e) => {
						e.preventDefault();
						setStep("login");
					}}
				>
					{/* back arrow unicode */}
					&#8592; back to Login
				</div>
			</form>
		</>
	);
};

export default PasswordResetMailForm;
