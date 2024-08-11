import { useTheme } from "next-themes";
import CodeMirrorComponent from "@uiw/react-codemirror";
import type { BasicSetupOptions } from "@uiw/react-codemirror"
import { EditorView } from "@codemirror/view";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import Eclipse from '@uiw/codemirror-theme-eclipse';
import { LangListType } from "@/types"
import React from "react";

declare type Extension = {
    extension: Extension;
} | readonly Extension[];

type codeMirrorProps = {
    data: string;
    readOnly?: boolean;
    textChangeHandler: (value: string) => void;
    className?: string;
    language?: LangListType;

    basicSetup?: BasicSetupOptions,
    extensions?: Extension[] | undefined,
    otherProps?: any,
    codeMode?: boolean,
    hasRoundedBorder?: boolean,
}

const classes = {
    codemirror: `shadow text-[16px] bg-transparent border-[1px] p-3 rounded-b-md rounded-tr-md min-h-[calc(100vh_-_200px)]`
}

const CodeBox: React.FC<codeMirrorProps> = (props) => {
    const { data, readOnly, textChangeHandler, className, language, basicSetup, codeMode, otherProps } = props;
    const { theme } = useTheme();

    return (
        <CodeMirrorComponent
            className={`${classes.codemirror} ${className}`}
            style={{
                outline: "none",
            }}
            basicSetup={{
                lineNumbers: true,
                autocompletion: true,
                highlightActiveLineGutter: false,
                highlightSpecialChars: false,
                foldGutter: false,
                closeBrackets: true,
                tabSize: 4,
                highlightActiveLine: true,
                highlightSelectionMatches: false,
                ...basicSetup
            }}
            readOnly={readOnly || false}
            indentWithTab={true}
            suppressHydrationWarning={true}
            autoFocus={true}
            extensions={
                codeMode
                    ? [loadLanguage(language as any) as any]
                    : [EditorView.lineWrapping]
            }
            minHeight="calc(100vh - 200px)"
            theme={theme === "light" ? Eclipse : "dark" as any}
            value={data}
            onChange={(value: any) => {
                textChangeHandler(value);
            }}
            {...otherProps}
        />
    );
};

export default CodeBox;
