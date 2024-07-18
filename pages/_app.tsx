import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import MaintenanceBlock from "@/components/blocks/site/Maintenance.block";
import {
	currentPasteType,
	formModeType,
	pasteDataType,
	toolType,
} from "@/types";
import "react-toastify/dist/ReactToastify.css";
import "../styles/main.scss";
import { env } from "@/env";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import axios from "@/service/axios.service";
import store from "@/components/redux/configureStore";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import PasteContext, {
	pasteDefaultTools,
} from "@/components/context/paste.context";
import {
	defaultCurrentPaste,
	defaultCurrentPasteData,
} from "@/components/defaults";
import produce from "immer";
let persistor = persistStore(store);

axios.defaults.baseURL = env.SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
	const [formMode, setFormMode] = useState<formModeType>("create");
	const [current, setCurrent] =
		useState<currentPasteType>(defaultCurrentPaste);
	const [data, setData] = useState<pasteDataType>(defaultCurrentPasteData);
	const [tools, setTools] = useState<toolType>(pasteDefaultTools);

	const [unlocked, setUnlocked] = useState<boolean>(true);
	const [editMode, setEditMode] = useState<boolean>(false);

	useEffect(() => {
		console.log("formMode", formMode);
	}, [formMode]);

	if (env.MAINTAINANCE == true) {
		return <MaintenanceBlock />;
	}

	const textChangeHandler = (value: string) => {
		const newData = produce(data, (draft: pasteDataType) => {
			draft.pasteMap[draft.active] = value;
			const tempSize = value.length / 1024;
			draft.pasteMapSize[draft.active] = tempSize;
			draft.size = draft.pasteMapSize.reduce((a, b) => a + b, 0);
		});
		setData(newData);
	};

	const currentHandler = (key: keyof currentPasteType, value: any) => {
		setCurrent(
			produce(current, (draft: any) => {
				draft[key] = value;
			})
		);
	};
    

	return (
		<Provider store={store}>
			<PersistGate
				loading={
					<div className="flex items-center justify-center w-screen h-screen">
						<div className="spinner">
							<FontAwesomeIcon
								className="rotate w-[50px] h-[50px]"
								icon={faSpinner}
							/>
						</div>
					</div>
				}
				persistor={persistor}
			>
				<ThemeProvider>
					<PasteContext.Provider
						value={{
							current,
							setCurrent,
							currentHandler,
							data,
							setData,
							textChangeHandler,
							tools,
							setTools,
							formMode,
							setFormMode,
							unlocked,
							setUnlocked,
							editMode,
							setEditMode,
						}}
					>
						<Meta />
						<div className="md:container mx-auto px-5 ">
							<Header />
						</div>

						<div className="md:container mx-auto px-5">
							<Component {...pageProps} />
						</div>
						<div className="md:container mx-auto px-5 ">
							<Footer />
						</div>
					</PasteContext.Provider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
