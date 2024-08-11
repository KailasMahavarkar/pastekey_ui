/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-empty-function: 0 */
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
    setCurrent: (_paste: currentPasteType) => { },

    // handle current
    currentHandler: (_key: keyof currentPasteType, _value: any) => { },

    // handle data
    data: pasteDataTypeDefault,
    setData: (_data: pasteDataType) => { },
    textChangeHandler: (_data: string) => { },

    // handle form mode
    formMode: "create",
    setFormMode: (_mode: formModeType) => { },

    // unlocked
    unlocked: false,
    setUnlocked: (_unlocked: boolean) => { },

    // editMode
    editMode: false,
    setEditMode: (_editMode: boolean) => { },
});

export default PasteContext;
