import { LangListType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserExperience {
    language: LangListType
    fontsize: number;
    showLines: boolean;
    codeMode: boolean;
    tabSize: number;
}

const initialUserState: IUserExperience = {
    language: "python",
    fontsize: 16,
    showLines: false,
    codeMode: false,
    tabSize: 4,
};

const uxSlice = createSlice({
    name: "ux",
    initialState: initialUserState,
    reducers: {
        updateLanguage: (state, action: PayloadAction<LangListType>) => ({
            ...state,
            language: action.payload,
        }),
        updateFontSize: (state, action: PayloadAction<number>) => ({
            ...state,
            fontsize: action.payload,
        }),
        updateShowLines: (state, action: PayloadAction<boolean>) => ({
            ...state,
            showLines: action.payload,
        }),
        updateCodeMode: (state, action: PayloadAction<boolean>) => ({
            ...state,
            codeMode: action.payload,
        }),
        updateTabSize: (state, action: PayloadAction<number>) => ({
            ...state,
            tabSize: action.payload,
        }),
    },
});

export const {
    updateFontSize,
    updateLanguage,
    updateShowLines,
    updateCodeMode,
    updateTabSize,
} = uxSlice.actions;

// export all actions
export default uxSlice;
