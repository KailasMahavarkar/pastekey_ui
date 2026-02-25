import { LangListType } from "@/types";
import { LanguageName } from "@uiw/codemirror-extensions-langs";

export const mapLanguage = (lang: LangListType): LanguageName => {
    switch (lang) {
        case "javascript":
            return "js";
        case "python":
            return "py";
        case "rust":
            return "rs";
        default:
            return lang as LanguageName;
    }
};
