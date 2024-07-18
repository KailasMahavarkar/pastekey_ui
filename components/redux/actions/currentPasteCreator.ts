import ActionTypes from "./ActionTypes";
import { sha512 } from "js-sha512";
import { timeSpanType } from "@/timing";
import { currentPasteType, pasteDataType } from "@/types";

// ------- PASTE TAB CODE: START ------
export const setTab = (data: string, index?: number) => ({
	type: ActionTypes.SET_TAB,
	payload: {
		index: index,
		data: data,
	},
});

export const updateTab = (data: string, index: number) => ({
	type: ActionTypes.UPDATE_TAB,
	payload: {
		index: index,
		data: data,
	},
});

export const removeTab = (index: any) => ({
	type: ActionTypes.REMOVE_TAB,
	payload: {
		index: index,
	},
});

export const setActiveTab = (index: number) => ({
	type: ActionTypes.SET_ACTIVE_TAB,
	payload: {
		index: index,
	},
});

// ------- PASTE TAB CODE: END ------

export const setCurrentTag = (tag: string) => ({
	type: ActionTypes.SET_CURRENT_TAG,
	payload: {
		tag: tag,
	},
});

export const setCurrentPaste = (payload: currentPasteType) => ({
	type: ActionTypes.SET_CURRENT_PASTE,
	payload: payload,
});

export const setCurrentPasteData = (data: pasteDataType) => {
	return {
		type: ActionTypes.SET_CURRENT_PASTE_DATA,
		payload: data,
	};
};

export const setCurrentTitle = (title: string) => {
	return {
		type: ActionTypes.SET_CURRENT_PASTE_TITLE,
		payload: title,
	};
};

export const setCurrentPassword = (password: string) => {
	return {
		type: ActionTypes.SET_CURRENT_PASTE_PASSWORD,
		payload: sha512(password || ""),
	};
};

export const setCurrentMasterkey = (masterkey: string) => {
	return {
		type: ActionTypes.SET_CURRENT_PASTE_MASTERKEY,
		payload: sha512(masterkey || ""),
	};
};

export const setCurrentmaxViews = (maxViews: number) => ({
	type: ActionTypes.SET_CURRENT_PASTE_MAXVIEWS,
	payload: maxViews,
});

export const setCurrentPrivacy = (privacy: string) => ({
	type: ActionTypes.SET_CURRENT_PASTE_PRIVACY,
	payload: privacy,
});

export const setCurrentExpiry = (expiry: timeSpanType) => ({
	type: ActionTypes.SET_CURRENT_PASTE_EXPIRY,
	payload: expiry,
});

export const setCurrentFormMode = (mode: string) => ({
	type: ActionTypes.SET_CURRENT_FORM_MODE,
	payload: mode,
});

export const clearCurrentPaste = () => ({
	type: ActionTypes.CLEAR_CURRENT_PASTE,
});

export const setCurrentVSeed = (seed: string) => ({
	type: ActionTypes.SET_CURRENT_PASTE_VSEED,
	payload: seed,
});

export const setCurrentESeed = (seed: string) => ({
	type: ActionTypes.SET_CURRENT_PASTE_ESEED,
	payload: seed,
});

export const setECT = (ect: string) => ({
	type: ActionTypes.SET_CURRENT_PASTE_ECT,
	payload: ect,
});

export const setVCT = (vct: string) => ({
	type: ActionTypes.SET_CURRENT_PASTE_VCT,
	payload: vct,
});
