import { useState } from "react";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
import config from "@/config";
import { handleNetworkError, useEffectAsync } from "@/helper";
import customToast from "@/toast";
// import { reduxType } from "@/types";
import { useRouter } from "next/router";
import produce from "immer";
// import { NextPage } from "next";
import axios from "axios";

interface countryMapType {
	ca: number; // canada
	au: number; // australia
	uk: number; // united kingdom
	us: number; // united states
	in: number; // india
	id: number; // indonesia
	np: number; // nepal
	pk: number; // pakistan
	bd: number; // bangladesh
	fr: number; // france
	ww: number; // world wide
}

// const defaultCountryMap = {
// 	ca: 0, // canada
// 	au: 0, // australia
// 	uk: 0, // united kingdom
// 	us: 0, // united states
// 	in: 0, // india
// 	id: 0, // indonesia
// 	np: 0, // nepal
// 	pk: 0, // pakistan
// 	bd: 0, // bangladesh
// 	fr: 0, // france
// 	ww: 0, // world wide,
// };

interface singlePasteMetaType {
	status: "active" | "deleted" | "expired" | "inactive" | "banned";
	tag: string;
	createdAt: number;
	updateAt: number;
	expireAt: number;
	privacy: "private" | "public" | "unlisted";
	maxviews: number;
	paidViewsCount: number;
	paidViews: countryMapType;
	totalViews: countryMapType;
	uniqueViews: countryMapType;
	totalViewsCount: number;
	uniqueViewsCount: number;
	unpaidEarnings: number;
	paidEarnings: number;
}

interface pasteMetaType {
	pastes: singlePasteMetaType[];
	totalPaidViews: number;
	totalViews: number;
	totalUnpaidViews: number;
	totalPaidEarnings: number;
	totalUnpaidEarnings: number;
}

// JSX  -  React Component
// const SinglePaste: NextPage<{
// 	paste: singlePasteMetaType;
// 	index: number;
// }> = ({ paste }) => {
// 	const [active, setActive] = useState(0);
// 	// const currentEarning = paste.unpaidEarnings;
// 	// const paidEarning = paste.;
// 	// const totalEarning = currentEarning + paidEarning;
// 	const router = useRouter();

// 	const pasteStatusColor = () => {
// 		if (paste.status === "active") {
// 			return "bg-green-500 text-white";
// 		} else if (paste.status === "deleted") {
// 			return "bg-red-500 text-white";
// 		} else if (paste.status === "inactive") {
// 			return "bg-orange-500 text-white";
// 		} else if (paste.status === "banned") {
// 			return "bg-black text-white";
// 		}
// 	};

// 	const pasteDeleteHandler = () => {
// 		const swalWithBootstrapButtons = Swal.mixin({
// 			customClass: {
// 				confirmButton: "btn btn-success m-3 text-white",
// 				cancelButton: "btn btn-danger m-3 text-white",
// 			},
// 			buttonsStyling: false,
// 		});

// 		swalWithBootstrapButtons
// 			.fire({
// 				title: "Are you sure?",
// 				text: "You won't be able to revert this!",
// 				icon: "warning",
// 				showCancelButton: true,
// 				confirmButtonText: "Yes, delete it!",
// 				cancelButtonText: "No, cancel!",
// 				reverseButtons: true,
// 			})
// 			.then((result) => {
// 				if (result.isConfirmed) {
// 					axios
// 						.delete("/paste/user/delete", {
// 							data: {
// 								tag: paste.tag,
// 							},
// 						})
// 						.then(() => {
// 							customToast({
// 								message: "Paste deleted successfully",
// 								icon: "success",
// 							});

// 							// setSinglePaste(
// 							// 	index,
// 							// 	produce(paste, (draft) => {
// 							// 		draft.status = "deleted";
// 							// 	})
// 							// );
// 						})
// 						.catch((error) => {
// 							if (handleNetworkError(error)) return;
// 							customToast({
// 								message: error.response.data.msg,
// 								icon: "error",
// 							});
// 						});
// 				}
// 			});
// 	};

// 	// pause paste
// 	const pastePauseHandler = async () => {
// 		// setSinglePaste(
// 		// 	index,
// 		// 	produce(paste, (draft) => {
// 		// 		if (draft.status === "active") {
// 		// 			draft.status = "inactive";
// 		// 		} else if (draft.status === "inactive") {
// 		// 			draft.status = "active";
// 		// 		}
// 		// 	})
// 		// );

// 		try {
// 			await axios.post("/paste/user/pause", {
// 				tag: paste.tag,
// 			});
// 		} catch (error: any) {
// 			if (handleNetworkError(error)) return;
// 			customToast({
// 				icon: "error",
// 				message: error.response?.data?.msg,
// 			});
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col w-full shadow max-w-md m-3">
// 			<div className="dropdown">
// 				<div tabIndex={0} className="bg-opacity-100">
// 					<div className="flex tabs w-full flex-grow-0">
// 						<a
// 							className={`flex-1 tab tab-bordered ${
// 								active === 0 ? "tab-active" : ""
// 							}`}
// 							onClick={() => {
// 								setActive(0);
// 							}}
// 						>
// 							Stats
// 						</a>
// 						<a
// 							className={`flex-1 tab tab-bordered ${
// 								active === 1 ? "tab-active" : ""
// 							}`}
// 							onClick={() => {
// 								setActive(1);
// 							}}
// 						>
// 							Details
// 						</a>
// 						<a
// 							className={`flex-1 tab tab-bordered ${
// 								active === 2 ? "tab-active" : ""
// 							}`}
// 							onClick={() => {
// 								setActive(2);
// 							}}
// 						>
// 							Manage
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="bg-base-100 grid w-full flex-grow gap-3 rounded-xl rounded-tl-none p-6">
// 				{active === 0 && (
// 					<>
// 						<div>
// 							<div className="flex justify-between text-lg font-extrabold">
// 								<div>Tag: {paste.tag}</div>
// 								<div className="justify-end">
// 									<button
// 										className={`btn btn-disabled btn-sm ${pasteStatusColor()}`}
// 									>
// 										{paste.status}
// 									</button>
// 								</div>
// 							</div>
// 							<div className="text-base-content/70 text-sm">
// 								{paste.totalViewsCount} views
// 							</div>
// 						</div>

// 						<div className="text-lg font-extrabold">Analytics</div>
// 						<div className="grid gap-3">
// 							<div className="dropdown dropdown-top">
// 								<div tabIndex={0}>
// 									{/* paid views */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Paid Views
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											{paste.paidViewsCount} views
// 										</div>
// 									</div>

// 									{/* unpaid views */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											UnPaid Views
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											{paste.uniqueViewsCount} views
// 										</div>
// 									</div>

// 									{/* earnings */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Paste Balance Earnings
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											$ {paste.unpaidEarnings}
// 										</div>
// 									</div>

// 									{/* withdrawn */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Paste Withdrawn Earnings
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											$ {paste.paidEarnings}
// 										</div>
// 									</div>

// 									{/* balance */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Balance
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											$ {paste.unpaidEarnings}
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</>
// 				)}
// 				{active === 1 && (
// 					<>
// 						<div className="text-lg font-extrabold">Details</div>
// 						<div className="grid gap-3">
// 							<div className="dropdown dropdown-top">
// 								<div tabIndex={0}>
// 									{/* paid views */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Created At
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											{new Date(
// 												paste.createdAt
// 											).toDateString()}
// 										</div>
// 									</div>

// 									{/* unpaid views */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Updated At
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											{new Date(
// 												paste.updateAt
// 											).toDateString()}
// 										</div>
// 									</div>

// 									{/* earnings */}
// 									<div className="flex items-center p-1 ">
// 										<span className="flex-1 text-sm ">
// 											Expire At
// 										</span>
// 										<div className="flex-1 text-sm ">
// 											{new Date(
// 												paste.expireAt
// 											).toDateString()}
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</>
// 				)}

// 				{active === 2 && (
// 					<>
// 						<div>
// 							<div className="text-lg font-extrabold">
// 								Manage Paste
// 							</div>
// 							<div className="text-base-content/70 text-sm">
// 								<div className="form-control">
// 									<div className="label cursor-pointer">
// 										<span className="label-text">
// 											Pause Paste
// 										</span>
// 										<label className="label cursor-pointer">
// 											<input
// 												type="checkbox"
// 												className="toggle toggle-primary"
// 												onClick={pastePauseHandler}
// 												defaultChecked={
// 													!(paste.status === "active")
// 												}
// 												disabled={[
// 													"deleted",
// 													"expired",
// 													"banned",
// 												].includes(paste.status)}
// 											/>
// 										</label>
// 									</div>
// 								</div>
// 								<div className="form-control">
// 									<div className="label cursor-pointer">
// 										<span className="label-text">
// 											Delete Paste
// 										</span>
// 										<button
// 											className="btn btn-error btn-sm text-white"
// 											disabled={paste.status !== "active"}
// 											onClick={pasteDeleteHandler}
// 										>
// 											Delete
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</>
// 				)}
// 				<button
// 					className="btn btn-primary"
// 					disabled={paste?.status !== "active"}
// 					onClick={() => {
// 						router.push(`/r/${paste?.tag}`);
// 					}}
// 				>
// 					Go To Paste
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

const ManagePage = () => {
	// const redux = useSelector((state: reduxType) => state);
	const [meta, setMeta] = useState<pasteMetaType>({
		pastes: [],
		totalPaidViews: 0,
		totalViews: 0,
		totalPaidEarnings: 0,
		totalUnpaidViews: 0,
		totalUnpaidEarnings: 0,
	});
	const router = useRouter();

	useEffectAsync(async () => {
		try {
			const result = await axios.get("/paste/user/meta");
			// const pastes = result.data.data.pastes;

			const data = produce(meta, (draft) => {
				draft.pastes = result.data.data.pastes;
				draft.totalPaidViews = result.data.data.totalPaidViews;
				draft.totalViews = result.data.data.totalViews;
				draft.totalUnpaidViews = result.data.data.totalUnpaidViews;
				draft.totalUnpaidEarnings =
					result.data.data.totalUnpaidEarnings;
			});

			setMeta(data);
		} catch (error: any) {
			if (handleNetworkError(error)) return;
			console.log(error.response);
			customToast({
				icon: "error",
				message: error.response?.data?.msg,
			});
		}
	}, []);

	const withdrawHandler = async () => {
		if (Number(meta.totalUnpaidEarnings || 0) < config.MIN_PAYOUT) {
			return customToast({
				icon: "error",
				message: "You don't have enough money to withdraw",
			});
		}

		// request a transaction token from the server
	};

	const transactionHistoryViewHandler = () => {
		router.push("/transactions");
	};

	const StatsComponent = () => {
		return (
			<div>
				<div className="stats stats-vertical lg:stats-horizontal shadow">
					<div className="stat">
						<div className="stat-figure text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-8 h-8 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<div className="stat-title">Net Income</div>
						<div className="stat-value text-primary">
							${meta.totalPaidEarnings + meta.totalUnpaidEarnings}
						</div>
						{/* <div className="stat-desc">
							21% more than last month
						</div> */}
					</div>
					<div className="stat">
						<div className="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-8 h-8 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<div className="stat-title">Withdrawn</div>
						<div className="stat-value text-secondary">
							${meta.totalPaidEarnings}
						</div>
						{/* <div className="stat-desc">
							21% more than last month
						</div> */}
					</div>
					<div className="stat">
						<div className="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-8 h-8 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<div className="stat-title">Available Balance</div>
						<div className="stat-value text-secondary">
							$ {meta.totalUnpaidEarnings}
						</div>
						{/* <div className="stat-desc">
							21% more than last month
						</div> */}
					</div>
					<div className="stat">
						<div className="flex flex-col stat-actions">
							<button
								className="btn btn-sm m-1 btn-success text-white"
								onClick={withdrawHandler}
							>
								Withdraw
							</button>
							<button
								className="btn btn-sm m-1"
								onClick={transactionHistoryViewHandler}
							>
								History
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	// const setSinglePaste = (key: number, value: singlePasteMetaType) => {
	// 	setMeta(
	// 		produce(meta, (draft) => {
	// 			draft.pastes[key] = value;
	// 		})
	// 	);
	// };

	return (
		<>
			<div className="flex m-3 justify-center  ">
				<StatsComponent />
			</div>
			<div className="flex flex-wrap justify-center "></div>
		</>
	);
};

export default ManagePage;
