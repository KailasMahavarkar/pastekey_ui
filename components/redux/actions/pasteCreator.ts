import ActionTypes from "./ActionTypes";

export const setPastes = (payload: any) => ({
	type: ActionTypes.SET_PASTES,
	payload: payload,
});

export const updatePaste = (payload: any) => ({
	type: ActionTypes.UPDATE_PASTE,
	payload: payload,
});

export const setPasteKeyValue = (key: string, value: any) => ({
	type: ActionTypes.SET_PASTE_KEY,
	payload: {
		key,
		value,
	},
});

export const setPaste = (payload: any) => ({
	type: ActionTypes.SET_PASTE,
	payload: payload,
});

export const removePaste = (tag: any) => ({
	type: ActionTypes.REMOVE_PASTE,
	payload: tag,
});

export const unsetPastes = () => ({
	type: ActionTypes.UNSET_PASTES,
});

export const setPasteMastekey = (tag: string, masterkeyHash: string) => ({
	type: ActionTypes.SET_PASTE_MASTERKEY,
	payload: {
		tag: tag,
		masterkey: masterkeyHash,
	},
});
