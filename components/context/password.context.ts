import { createContext } from "react";

export type stepFormType =
	| "login"
	| "forgot-password"
	| "mail-sent"
	| "reset-password"
	| "password-changed";

const PasswordContext = createContext<{
	step: stepFormType;
	setStep: (step: stepFormType) => void;
}>({
	step: "forgot-password",
	setStep: (step: stepFormType) => {},
});

export default PasswordContext;
