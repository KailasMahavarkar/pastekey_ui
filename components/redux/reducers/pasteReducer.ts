import ActionTypes from "../actions/ActionTypes";
import produce from "immer";
import { currentPasteType, pasteReducerType } from "@/types";

const initalState: pasteReducerType = {
	store: [],
	size: 0,
	sizeEncrypted: 0,
};

export const pasteReducer = (
	state: pasteReducerType = initalState,
	action: any
) => {
	switch (action.type) {
		case ActionTypes.SET_PASTES:
			state = action.payload;
			return state;

		case ActionTypes.UNSET_PASTES:
			return state;

		case ActionTypes.SET_PASTE:
			// const data: currentPasteType = ;
			return produce(state, (draft: any) => {
				// check if tag is already in the list
				// if exist fetch the index and update the tag
				// if not add the tag to the list
				const index = draft.store.findIndex(
					(item: any) => item?.tag === action.payload.tag
				);
				if (index !== -1) {
					draft.store[index] = action.payload;
				} else {
					draft.store.push(action.payload);
				}
			});

		default:
			return state;
	}
};
