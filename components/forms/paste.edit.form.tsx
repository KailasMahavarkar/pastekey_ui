import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "@/service/axios.service";
import { sha512 } from "js-sha512";
import { useRouter } from "next/router";
import { useContext } from "react";
import { handleNetworkError, isNetworkError, randomBase62 } from "@/helper";
import customToast from "@/toast";
import { encryptAES } from "@/utils/crypto";
import PasteContext from "@/context/paste.context";
import { style } from "@/forms/paste.create.form";

const PasteEditForm = () => {
	const { currentHandler, current, data, tools } = useContext(PasteContext);
	const router = useRouter();

	const formSubmitHandler = async (e: any) => {
		e.preventDefault();

		try {
			const tag = router?.query?.tag || "";
			const previousVseed = current.vseed;
			const vseed = randomBase62(64);
			const passwordHash = sha512(current.password);

			const vct = encryptAES(vseed, passwordHash);

			// encrypt the data
			const encryptedData = data.pasteMap.map((item) => {
				return encryptAES(item, passwordHash);
			});

			const mydata = {
				tag: tag,
				eseed: current.eseed,
				vseed: previousVseed,
				updateProps: {
					title: current.title,
					category: current.category,
					vseed: vseed,
					data: encryptedData,
					vct: vct,
				},
				tools: tools,
			};

			const updatedResult = await axios.patch("/paste", mydata);

			if (updatedResult.status === 200) {
				customToast({
					icon: "success",
					message: "Paste updated successfully",
				});
			}
		} catch (error: any) {
			if (isNetworkError(error)) {
				return handleNetworkError(error);
			}

			customToast({
				message: error.response.data.msg,
				icon: "error",
			});
		}
	};

	return (
		<div>
			<form className={style.feature} onSubmit={formSubmitHandler}>
				<div className={style.form_child}>
					{/* START: Category */}
					<div className={style.form_child_item}>
						<label className={style.form_child_item_label}>
							<span className={style.form_child_item_label_span}>
								Paste Category
							</span>
							<span
								className={style.form_child_item_label_span_alt}
							></span>
						</label>

						<select
							className={style.form_child_item_select}
							name="category"
							onChange={(e) => {
								currentHandler("category", e.target.value);
							}}
							defaultValue={current.category}
						>
							<option value="general">general</option>
							<option value="programming">programming</option>
							<option value="key:value">key:value</option>
							<option value="others">others</option>
						</select>
					</div>
					{/* END: Category */}
				</div>
				{/* title and privacy */}
				<div className={style.form_child}>
					{/* START: Title */}
					<div className={style.form_child_item}>
						<label className={style.form_child_item_label}>
							<span className={style.form_child_item_label_span}>
								Paste Title
							</span>
							<span
								className={style.form_child_item_label_span_alt}
							></span>
						</label>
						<input
							type="text"
							placeholder="Type here"
							className={style.form_child_item_input}
							onChange={(e) => {
								currentHandler("title", e.target.value);
							}}
							name="title"
							value={current.title}
						></input>
					</div>
					{/* END: Title */}

					{/* START: Password */}
					<div className={style.form_child_item}>
						<label className={style.form_child_item_label}>
							<span className={style.form_child_item_label_span}>
								Paste Password (view key)
							</span>
							<span
								className={style.form_child_item_label_span_alt}
							>
								<FontAwesomeIcon
									icon={faEye}
									className="w-4 h-4 "
									onClick={() => {
										currentHandler(
											"showPassword",
											!current.showPassword
										);
									}}
									color={
										current.showPassword ? "red" : "black"
									}
								/>
							</span>
						</label>
						<input
							type={current.showPassword ? "text" : "password"}
							defaultValue={current.password}
							className={style.form_child_item_input}
							placeholder="Create Password"
							name="password"
							disabled={
								current.privacy === "public" ||
								current.privacy === "unlisted"
							}
							onChange={(e) => {
								currentHandler("password", e.target.value);
							}}
							required={
								current.masterkey && current.password === ""
									? true
									: false
							}
							autoComplete="on"
						/>

						<label className={style.form_child_item_label}>
							<span
								className={style.form_child_item_label_span}
							></span>
							<span
								className={style.form_child_item_label_span_alt}
							>
								{/* {errors.password && "Password is Required"} */}
							</span>
						</label>
					</div>
					{/* END: Password */}
				</div>

				{/* submit */}
				<div className={style.form_child}>
					<div className={style.form_child_item}>
						<input
							type="submit"
							value="save paste"
							className="btn btn-primary"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PasteEditForm;
