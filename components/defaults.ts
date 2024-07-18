import { timeAt, timeSpanType } from "../timing";
import { pastePrivacyType, pasteCategoryType, formModeType } from "../types";

export const defaultCurrentPaste = {
	title: "",
	createAt: Date.now(),
	updateAt: Date.now(),
	expireAt: timeAt("5 years"),
	expiry: "5 years" as timeSpanType,
	privacy: "public" as pastePrivacyType,
	category: "general" as pasteCategoryType,
	masterkey: "",
	password: "",
	showPassword: false,
	showMasterkey: false,
	tag: "",
	eseed: "",
	vseed: "",
	vct: "",
	ect: "",
	available: true,
	maxviews: 10000,
	formMode: "create" as formModeType,
	settings: {
		lineNumber: false,
		lineWrapping: false,
		language: "python",
	},
};

export const defaultCurrentPasteData = {
	pasteMap: [""],
	encryptedPasteMap: [""],
	encryptedPasteMapSize: [0],
	pasteMapSize: [0],
	active: 0,
	size: 0,
	tabcount: 1,
};
