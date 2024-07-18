import { currentPasteType, pasteDataType } from "./index";
export const currentPasteTypeDefault: currentPasteType = {
	title: "",
	expiry: "5 years",
	createAt: 0,
	updateAt: 0,
	expireAt: 0,
	category: "general",
	privacy: "public",
	masterkey: "",
	password: "",
	showPassword: false,
	showMasterkey: false,
	available: true,
	ect: "",
	vct: "",
	tag: "",
	maxviews: 10000,
	formMode: "read",
	eseed: "",
	vseed: "",
};

export const pasteDataTypeDefault: pasteDataType = {
	pasteMap: [],
	encryptedPasteMap: [],
	encryptedPasteMapSize: [],
	pasteMapSize: [],
	size: 0,
	tabcount: 0,
	active: 0,
};
