import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./services/userService";
import storage from "redux-persist/lib/storage";

import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import uxSlice from "./services/uxService";

const persistedReducer = persistReducer(
	{
		key: "root",
		version: 1,
		storage,
	},
	combineReducers({
		[userSlice.name]: userSlice.reducer,
		[uxSlice.name]: uxSlice.reducer,
	})
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
