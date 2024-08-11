import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRupeeSign, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleNetworkError, useEffectAsync } from "@/helper";
import customToast from "@/toast";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import axios from "@/service/axios.service";
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "@/redux/actions/paymentCreator";
import { RootState } from "@/redux/configureStore";
import { updatePayment } from "@/redux/services/userService";
import Button from "../Button";

// social form
const PastePaymentForm = () => {
	// profile form state
	const user = useSelector((state: RootState) => state.user);
	const payment = user.payment;
	const dispatch = useDispatch();

	useEffectAsync(async () => {
		// get payment info
		try {
			const result = await axios.get("/user/payment-profile");
			const payment: any = result.data.data.payment;

			setPayment({
				paypal: payment?.paypal?.vpa || "",
				upi: payment?.upi?.vpa || "",
				selected: payment?.selected || "paypal",
			});
		} catch (error: any) {
			if (handleNetworkError(error)) return;

			customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	}, []);

	const formSubmitHandler = async () => {
		try {
			// const result = await axios.patch("/user/payment-update", {
			// 	...payment,
			// });

			return customToast({
				icon: "info",
				message: "Profile updated",
			});
		} catch (error: any) {
			if (handleNetworkError(error)) return;

			if (error.response?.data?.msg === "payment info already updated") {
				return customToast({
					icon: "info",
					message: error.response?.data?.msg,
				});
			}

			return customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	};

	return (
		<>
			<h1 className="flex justify-center items-center">
				Update Payment Info
			</h1>
			<div className="divider-100"></div>

			{/* paypal */}
			<div className="form-control">
				<label className="label">
					<span className="label-text">Paypal</span>
				</label>
				<label className="input-group">
					<span className="bg-transparent">
						<FontAwesomeIcon
							icon={faPaypal as IconProp}
							size="lg"
						/>
					</span>
					<input
						type="text"
						placeholder=""
						className="flex-1 input input-bordered"
						value={payment.paypal}
						onChange={(e) => {
							dispatch(
								updatePayment({
									...payment,
									paypal: e.target.value,
								})
							);
						}}
					/>
				</label>
			</div>

			{/* bhim upi */}
			<div className="form-control">
				<label className="label">
					<span className="label-text">UPI (india)</span>
				</label>
				<label className="input-group">
					<span className="bg-transparent">
						<FontAwesomeIcon
							icon={faRupeeSign as IconProp}
							size="lg"
						/>
					</span>
					<input
						type="text"
						placeholder=""
						className="flex-1 input input-bordered"
						value={payment.upi}
						onChange={(e) => {
							dispatch(
								updatePayment({
									...payment,
									upi: e.target.value,
								})
							);
						}}
					/>
				</label>
			</div>

			{/* preferance */}
			<div className="form-control">
				<label className="label">
					<span className="label-text">Preference</span>
				</label>
				<label className="input-group">
					<span className="bg-transparent">
						<FontAwesomeIcon
							icon={faWallet as IconProp}
							size="lg"
						/>
					</span>
					<select
						className="flex-1 input input-bordered"
						value={payment.selected}
						onChange={(e) => {
							dispatch(
								updatePayment({
									...payment,
									selected: e.target.value as
										| "upi"
										| "paypal",
								})
							);
						}}
					>
						<option value="paypal">Paypal (worldwide)</option>
						<option value="upi">UPI (india)</option>
					</select>
				</label>
			</div>

			{/* Button */}
			<div className="form-control">
				<Button
					className="btn btn-outline mt-4"
					onClick={formSubmitHandler}
                    accessibleName="Update Payment"
				>
					Update Payment
				</Button>
			</div>
		</>
	);
};

export default PastePaymentForm;
