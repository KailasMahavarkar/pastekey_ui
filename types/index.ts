import { javascript } from "@codemirror/lang-javascript";
import { timeSpanType } from "@/timing";
import type { NextRouter } from "next/router";
import { AxiosResponse } from "axios";
import { LanguageName } from "@uiw/codemirror-extensions-langs";

export const LangList = {
    javascript: "javascript",
    html: "html",
    css: "css",
    json: "json",
    python: "python",
    xml: "xml",
    sql: "sql",
    java: "java",
    rust: "rust",
    cpp: "cpp",
    php: "php",
};

// extract types from LangList
export type LangListType = keyof typeof LangList;

// reducer types
export type pasteReducerType = {
    store: currentPasteType[];
    size: number;
    sizeEncrypted: number;
};

export type iRouter = NextRouter & {
    components?: any;
};

export type modalType = {
    view: boolean;
    edit: boolean;
    unlock: boolean;
    tabdelete: boolean;
    data: any;
};

export interface customDataContextType {
    data: pasteDataType;
    size: number;
    setData: (data: pasteDataType) => void;
    setActive: (active: number) => void;
    clearData: () => void;
}

export interface customContextType {
    width: number;
    formMode: formModeType;
    setFormMode: (mode: formModeType) => void;
    theme: string;
    setTheme: (theme: string) => void;
}

export interface tailcss {
    // sm
    sm: string;
    effect_sm?: string;

    // md
    md?: string;
    effect_md?: string;

    // lg
    lg?: string;
    effect_lg?: string;

    // xl
    xl?: string;
    effect_xl?: string;

    // nulled
    nulled?: string;
}

export type Mapper<T, V> = {
    [key in keyof T]: V;
};

export type Map<T> = {
    [key in keyof T]: T[key];
};

export type MakeLastType<T, Z> = {
    [A in keyof T]: {
        [B in keyof T[A]]: Z;
    };
};

export type LeafsToGeneric<T, E> = T extends string | number | boolean
    ? E // If primitive transform to number
    : {
        [P in keyof T]: T[P] extends (infer U)[]
        ? LeafsToGeneric<U, E>[]
        : LeafsToGeneric<T[P], E>;
    }; // Otherwise recursively map, with a special case for arrays.

export type SkipFirstDepth<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<string, infer Item> ? Item : T[K];
};

export type pastePrivacyType = "public" | "private" | "unlisted";
export type pasteCategoryType =
    | "general"
    | "key:value"
    | "programming"
    | "document"
    | "other";

export type formModeType = "create" | "read" | "unlock" | "edit"

export interface pasteDataType {
    pasteMap: string[];

    encryptedPasteMap: string[];
    encryptedPasteMapSize: number[];

    pasteMapSize: number[];

    size: number;
    tabcount: number;
    active: number;
}

export interface currentPasteType {
    title: string;
    expiry: timeSpanType;
    createAt: number;
    updateAt: number;
    expireAt: number;
    category: pasteCategoryType;
    privacy: pastePrivacyType;
    masterkey: string;
    password: string;
    showPassword: boolean;
    showMasterkey: boolean;
    available: boolean;
    ect: string;
    vct: string;
    tag: string;
    maxviews: number;
    formMode: formModeType;
    eseed: string;
    vseed: string;
}

export interface pasteFormType {
    title: string;
    expiry: timeSpanType;
    masterkey: string;
    password: string;
    privacy: pastePrivacyType;
    showPassword: boolean;
    showMasterkey: boolean;
    datasize: number;
    tag: string;
    data: pasteDataType;
    maxviews: number;
}

export interface loginReducerType {
    isLoading: boolean;
    errMess: any;
    user: any;
    balance: object;
    paste: object;
}

export interface commonResponseType {
    msg: string;
    status?: "exited" | "success" | "failed" | "unauthorized" | "overflow";
    error?: {
        exists?: true | false;
        msg?: string;
        trace?: any;
        error?: Error;
    };
    extra?: any;
    code?: number;
    data?: any;
    fix?: any;
}

export interface cres extends AxiosResponse {
    data: commonResponseType;
}

export type reduxType = {
    pastes: pasteReducerType;
    current: currentPasteType;
    login: loginReducerType;
};

export type localType = {
    paste: {
        fontsize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
    };
};

export type toolType = {
    highlight: boolean;
    codeMode: boolean;
    fontsize: number;
    language: LangListType;
    showLines: boolean;
    tabSize: 2 | 4;
};

export interface pasteContextType {
    current: currentPasteType;
    setCurrent: (current: currentPasteType) => void;
    currentHandler: (key: keyof currentPasteType, value: any) => void;
    data: pasteDataType;
    setData: (data: pasteDataType) => void;
    textChangeHandler: (data: string) => void;
    formMode: formModeType;
    setFormMode: (mode: formModeType) => void;

    // unlocked
    unlocked: boolean;
    setUnlocked: (unlocked: boolean) => void;

    // editMode
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}
