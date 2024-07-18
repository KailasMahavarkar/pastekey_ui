import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Iprofile {
	email: string;
	fullname: string;
	country: string;
}

interface Ipayment {
	paypal: string;
	upi: string;
	selected: "paypal" | "upi";
}


interface Isocial {
	facebook: string;
	twitter: string;
	instagram: string;
}

export interface IUserState {
	_id: string;
	username: string;

	// tokens
	accessToken: string;
	refreshToken: string;

	// password
	password: string;
	role: string;
	datejoined: number;
	pastes: string[];
	status: "active" | "inactive" | "banned" | "deleted";
	paidViews: number;
	unpaidViews: number;
	paidEarnings: number;
	unpaidEarnings: number;

	// socials
	socials: Isocial;
	profile: Iprofile;
	payment: Ipayment;

	// counter
	pasteCounter: {
		pasteCreated: number;
		pasteCreatedToday: number;

		pasteRead: number;
		pasteReadToday: number;

		pasteUpdated: number;
		pasteUpdatedToday: number;
	};
}

// create initial state using interface
const initialUserState: IUserState = {
	_id: "",
	username: "",

	accessToken: "",
	refreshToken: "",

	// profile
	profile: {
		fullname: "",
		email: "",
		country: "",
	},

	// password
	password: "",
	role: "",
	datejoined: 0,
	pastes: [],
	status: "active",
	paidViews: 0,
	unpaidViews: 0,
	paidEarnings: 0,
	unpaidEarnings: 0,

	// socials
	socials: {
		facebook: "",
		instagram: "",
		twitter: "",
	},

	// counter
	pasteCounter: {
		pasteCreated: 0,
		pasteCreatedToday: 0,

		pasteRead: 0,
		pasteReadToday: 0,

		pasteUpdated: 0,
		pasteUpdatedToday: 0,
	},
	payment: {
		paypal: "",
		upi: "",
		selected: "paypal",
	},
};
const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		addLogin: (state, action) => ({
			...state,
			...action.payload,
		}),
		removeLogin: (state) => ({
			...state,
			...initialUserState,
		}),

		updateSocials: (state, action: PayloadAction<Isocial>) => {
			state["socials"] = action.payload;
		},

		updatePayment(state, action: PayloadAction<Ipayment>) {
			state["payment"] = action.payload;
		},

		updateProfile(state, action: PayloadAction<Iprofile>) {
			state["profile"] = action.payload;
		},

		setAccessToken(state, action) {
			state.accessToken = action.payload;
		},
		removeAccessToken(state, action) {
			state.accessToken = action.payload;
		},

		removeUserPaste(state, action) {
			state.pastes = state.pastes.filter(
				(paste: any) => paste.id !== action.payload
			);
		},
		addUserPaste(state, action) {
			state.pastes.push(action.payload as string);
		},
	},
});

export const userActions = userSlice.actions;

// destruct and export
export const {
	addLogin,
	removeLogin,
	updateSocials,
	updatePayment,
	updateProfile,
	setAccessToken,
	removeAccessToken,
	removeUserPaste,
	addUserPaste,
} = userActions;

// export all actions
export default userSlice;
