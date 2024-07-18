import ActionTypes from "./ActionTypes";

export const addLogin = (loginPayload: any) => ({
	type: ActionTypes.ADD_LOGIN,
	user: loginPayload,
});

export const loginLoading = () => ({
	type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errMess: any) => ({
	type: ActionTypes.LOGIN_FAILED,
	payload: errMess,
});

export const removeLogin = () => ({
	type: ActionTypes.REMOVE_LOGIN,
	user: {},
});

export const renewAccessToken = (accessToken: any) => ({
	type: ActionTypes.RENEW_ACCESS_TOKEN,
	payload: accessToken,
});

export const setAccessToken = (accessToken: any) => ({
	type: ActionTypes.SET_ACCESS_TOKEN,
	payload: accessToken,
});

export const removeUserPaste = (id: any) => ({
	type: ActionTypes.REMOVE_USER_PASTE,
	payload: id,
});

export const addUserPaste = (id: any) => ({
	type: ActionTypes.ADD_USER_PASTE,
	payload: id,
});

// set balance
export const setBalance = (payload: any) => ({
	type: ActionTypes.SET_BALANCE,
	payload: payload,
});

// set user
export const setUser = (payload: any) => ({
	type: ActionTypes.SET_USER,
	payload: payload,
});
