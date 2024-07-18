import { createContext } from "react";
import { formModeType } from "../../types";

const CustomContext = createContext({
	formMode: "create" as formModeType,
	setFormMode: (mode: formModeType) => {},
});

export default CustomContext;
