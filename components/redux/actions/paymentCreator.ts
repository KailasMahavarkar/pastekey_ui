import ActionTypes from "./ActionTypes";


export const setPayment = (payload: any) => ({
	type: ActionTypes.SET_PAYMENT_DATA,
	payload: payload,
});


