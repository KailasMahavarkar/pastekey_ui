import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAdd, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useTheme } from "next-themes";
import { useContext } from "react";
import Swal from "sweetalert2";
import { settings } from "@/env";
import { pasteDataType } from "@/types";
import PasteContext from "@/context/paste.context";

const PasteTab = () => {
	const { theme } = useTheme();
	const { data, setData, formMode } = useContext(PasteContext);

	const manageTab = {
		// set tabs
		setTab: () => {
			if (data.tabcount < settings.MAX_TABS_ALLOWED) {
				if (data.tabcount !== settings.MAX_TABS_ALLOWED) {
					setData(
						produce(data, (draft: pasteDataType) => {
							draft.tabcount = draft.tabcount + 1;
							draft.encryptedPasteMap.push("");
							draft.pasteMap.push("");
							draft.pasteMapSize.push(0);
							draft.encryptedPasteMapSize.push(0);
							draft.active = draft.tabcount - 1;
							draft.size = data.pasteMapSize.reduce(
								(a, b) => a + b,
								0
							);
						})
					);
				}
			}
		},

		// remove tabs
		removeTab: (index: number) => {
			Swal.fire({
				title: `delete tab ${index} ?`,
				showCancelButton: true,
				background: theme === "dark" ? "#1e1e1e" : "#fff",
				color: theme === "dark" ? "#fff" : "#000",
				confirmButtonText: "Yes, delete it",
			}).then((result) => {
				if (result.isConfirmed) {
					if (index >= -1 && index <= settings.MAX_TABS_ALLOWED) {
						setData(
							produce(data, (draft: pasteDataType) => {
								draft.tabcount -= 1;
								draft.pasteMap.splice(index, 1);
								draft.pasteMapSize.splice(index, 1);

								draft.encryptedPasteMap.splice(index, 1);
								draft.encryptedPasteMapSize.splice(index, 1);

								if (index === 0) {
									draft.active = 0;
								} else {
									draft.active = index - 1;
								}

								draft.size = draft.pasteMapSize.reduce(
									(a, b) => a + b,
									0
								);
							})
						);
					}
				}
			});
		},

		// set active tab
		setActive: (index: number) => {
			setData(
				produce(data, (draft: pasteDataType) => {
					draft.active = index;
				})
			);
		},

		// clear all tabs
		clearAll: () => {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				// icon: "",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, clear all!",
			}).then((result) => {
				if (result.isConfirmed) {
					setData(
						produce(data, (draft: pasteDataType) => {
							draft.tabcount = 1;
							draft.pasteMap = [""];
							draft.pasteMapSize = [0];
							draft.encryptedPasteMap = [""];
							draft.encryptedPasteMapSize = [0];
							draft.active = 0;
							draft.size = 0;
						})
					);
				}
			});
		},
	};

	return (
		<div className="flex ">
			<div className="flex flex-col md:flex-row flex-1 flex-wrap md:order-1 ">
				<div className="flex flex-1 flex-wrap">
					<div className="tabs">
						{data?.pasteMapSize?.map((_: any, index: number) => {
							const tabSlice = data?.pasteMap[index]?.slice(0, 8);
							return (
								<div key={index}>
									<a
										key={index}
										className={
											`tab tab-lifted ` +
											(data.active === index
												? "tab-active"
												: "")
										}
										onClick={() => {
											manageTab.setActive(index);
										}}
									>
										{data?.pasteMap[index]?.trim() === ""
											? `tab ${index}`
											: tabSlice}

										{data.tabcount > 1 && (
											<button
												className="btn btn-ghost btn-square btn-xs"
												onClick={() => {
													if (formMode !== "read") {
														manageTab.removeTab(
															index
														);
													}
												}}
											>
												<FontAwesomeIcon
													icon={faTimes as IconProp}
													name="delete"
												/>
											</button>
										)}
									</a>
									{index + 1 === data?.tabcount &&
										data?.tabcount <
											settings.MAX_TABS_ALLOWED && (
											<button
												key={index + 1000}
												className="btn btn-primary btn-circle btn-sm mx-2"
												onClick={() => {
													manageTab.setTab();
												}}
												disabled={formMode === "read"}
											>
												<FontAwesomeIcon
													icon={faAdd as IconProp}
													name="add"
												/>
											</button>
										)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasteTab;
