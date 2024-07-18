import { pasteDataTypeDefault } from "./../../types/default";
import {
    currentPasteType,
    formModeType,
    pasteDataType,
} from "./../../types/index";
import { createContext } from "react";
import { pasteContextType } from "../../types";
import { currentPasteTypeDefault } from "../../types/default";


const PasteContext = createContext<pasteContextType>({
    current: currentPasteTypeDefault,
    setCurrent: (paste: currentPasteType) => { },

    // handle current
    currentHandler: (key: keyof currentPasteType, value: any) => { },

    // handle data
    data: pasteDataTypeDefault,
    setData: (data: pasteDataType) => { },
    textChangeHandler: (data: string) => { },

    // handle form mode
    formMode: "create",
    setFormMode: (mode: formModeType) => { },

    // unlocked
    unlocked: false,
    setUnlocked: (unlocked: boolean) => { },

    // editMode
    editMode: false,
    setEditMode: (editMode: boolean) => { },
});

export default PasteContext;
