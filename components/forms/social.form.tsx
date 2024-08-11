import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleNetworkError } from "@/helper";
import customToast from "@/toast";
import { useDispatch, useSelector } from "react-redux";
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { RootState } from "@/redux/configureStore";
import { updateSocials } from "@/redux/services/userService";
import axios from "axios";

const SocialForm = () => {
	// profile form state
	const user = useSelector((state: RootState) => state.user);
	const social = user.socials;
	const dispatch = useDispatch();

	const formSubmitHandler = async () => {
		try {
			const result = await axios.patch("/user/social-update", {
				...user.socials,
			});

			// set new Access Token
			localStorage.setItem("accessToken", result.data.data.accessToken);

			return customToast({
				icon: "info",
				message: "Profile updated",
			});
		} catch (error: any) {
			if (handleNetworkError(error)) return;

			return customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	};

	return (
		<>
			<h1 className="flex justify-center items-center">
				Update Social Media
			</h1>
			<div className="divider-100"></div>

			{/* facebook */}
			<div className="form-control">
				<div className="div">
					<span className="div-text">Facebook</span>
				</div>
				<div className="input-group">
					<span className=" bg-transparent">
						<FontAwesomeIcon
							icon={faFacebook as IconProp}
							size="2x"
						/>
					</span>
					<input
						type="text"
						placeholder=""
						className="flex-1 input input-bordered"
						onChange={(e) =>
							dispatch(
								updateSocials({
									...social,
									facebook: e.target.value,
								})
							)
						}
						value={social.facebook}
					/>
				</div>
			</div>

			{/* Instagram */}
			<div className="form-control">
				<div className="div">
					<span className="div-text">Instagram</span>
				</div>
				<div className="input-group">
					<span className="bg-transparent">
						<FontAwesomeIcon
							icon={faInstagram as IconProp}
							size="2x"
						/>
					</span>
					<input
						type="text"
						placeholder=""
						className="flex-1 input input-bordered"
						value={social.instagram}
						onChange={(e) =>
							dispatch(
								updateSocials({
									...social,
									instagram: e.target.value,
								})
							)
						}
					/>
				</div>
			</div>

			{/* twitter */}
			<div className="form-control">
				<div className="div">
					<span className="div-text">Twitter</span>
				</div>
				<div className="input-group">
					<span className=" bg-transparent">
						<FontAwesomeIcon
							icon={faTwitter as IconProp}
							size="2x"
						/>
					</span>
					<input
						type="text"
						placeholder=""
						value={social.twitter}
						className="flex-1 input input-bordered"
						onChange={(e) =>
							dispatch(
								updateSocials({
									...social,
									twitter: e.target.value,
								})
							)
						}
					/>
				</div>
			</div>

			{/* Button */}
			<div className="form-control">
				<button
					className="btn btn-outline mt-4"
					onClick={formSubmitHandler}
				>
					Apply changes
				</button>
			</div>
		</>
	);
};

export default SocialForm;
