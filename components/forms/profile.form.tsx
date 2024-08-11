import { useDispatch, useSelector } from "react-redux";
import { handleNetworkError } from "@/helper";
import customToast from "@/toast";
import { countries } from "@/data/country";
import { RootState } from "@/redux/configureStore";
import { userActions } from "@/redux/services/userService";
import axios from "@/service/axios.service";
import Button from "../Button";

// profile form
const ProfileForm = () => {
	const store = useSelector((state: RootState) => state.user);
	const profile = store.profile;

	const dispatch = useDispatch();
	const { updateProfile, setAccessToken } = userActions;

	const formSubmitHandler = async () => {
		const store: any = {};

		// if store is empty, do nothing
		if (Object.keys(store).length === 0) {
			return customToast({
				icon: "info",
				message: "Profile already updated",
			});
		}

		try {
			const result = await axios.patch("/user/profile-update", profile);
			const newAT: string = result.data.data.accessToken;

			// set new Access Token
			localStorage.setItem("accessToken", newAT);

			// update redux
			dispatch(setAccessToken(newAT));

			return customToast({
				icon: "info",
				message: "Profile updated",
			});
		} catch (error: any) {
			if (handleNetworkError(error)) return;

			if (error.response?.data?.msg === "profile already updated") {
				return customToast({
					icon: "info",
					message: "Profile already updated",
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
			<h1 className="text-center">Update Profile</h1>
			<div className="divider-100"></div>
			{/* Full Name */}
			<div className="form-control">
				<label className="label">
					<span className="label-text">Full name</span>
					<span className="label-text"></span>
				</label>
				<input
					type="email"
					className="input input-bordered"
					value={profile["fullname"]}
					onChange={(e) => {
						dispatch(
							updateProfile({
								...profile,
								fullname: e.target.value,
							})
						);
					}}
				/>
			</div>

			{/* Email */}
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Email</span>
					<span className="label-text"></span>
				</label>
				<input
					type="email"
					className="input input-bordered"
					value={profile["email"]}
					onChange={(e) => {
						dispatch(
							updateProfile({
								...profile,
								email: e.target.value,
							})
						);
					}}
				/>
			</div>

			{/* Country */}
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Country</span>
					<span className="label-text"></span>
				</label>
				<select
					className="input input-bordered"
					name="country"
					value={profile["country"]}
					onChange={(e) =>
						dispatch(
							updateProfile({
								...profile,
								country: e.target.value,
							})
						)
					}
				>
					<option value="">Select Country</option>
					{countries.map((country, index) => {
						return (
							<option key={index} value={country.name}>
								{country.name}
							</option>
						);
					})}
				</select>
			</div>

			{/* Button */}
			<div className="form-control">
				<Button
					className="btn btn-outline mt-4"
					onClick={formSubmitHandler}
                    accessibleName="Update profile"
				>
					Update profile
				</Button>
			</div>
		</>
	);
};

export default ProfileForm;
