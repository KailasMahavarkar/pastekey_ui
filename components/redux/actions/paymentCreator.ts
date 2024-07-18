import ActionTypes from "./ActionTypes";

export const setProfile = (payload: any) => ({
	type: ActionTypes.SET_PROFILE_DATA,
	payload: payload,
});

export const setPayment = (payload: any) => ({
	type: ActionTypes.SET_PAYMENT_DATA,
	payload: payload,
});

export const clearPayment = () => ({
	type: ActionTypes.CLEAR_PAYMENT_DATA,
});
