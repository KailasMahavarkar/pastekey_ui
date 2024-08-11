import { useTheme } from "next-themes";
import CodeMirrorComponent from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import Eclipse from '@uiw/codemirror-theme-eclipse';
import { LangListType } from "@/types";


type codeMirrorProps = {
    data: string;
    readOnly?: boolean;
    textChangeHandler: (value: string) => void;
    className?: string;
    language?: LangListType;
}


const CodeMirror = (props: codeMirrorProps) => {
    const { data, readOnly, textChangeHandler, className } = props;
    const { theme } = useTheme();
    const ux = useSelector((state: RootState) => state.ux);

    return (
        <CodeMirrorComponent
            className={`shadow
			text-[16px] 
			bg-transparent  border-[1px] p-3 rounded-b-md rounded-tr-md min-h-[calc(100vh_-_200px)]
            ${className}
            `}
            style={{
                outline: "none",
            }}
            basicSetup={{
                lineNumbers: ux.showLines,
                autocompletion: true,
                highlightActiveLineGutter: false,
                highlightSpecialChars: false,
                foldGutter: false,
                closeBrackets: true,
                tabSize: ux.tabSize || 4,
                highlightActiveLine: true,
                highlightSelectionMatches: false,
            }}
            readOnly={readOnly || false}
            indentWithTab={true}
            suppressHydrationWarning={true}
            autoFocus={true}
            extensions={
                ux.codeMode
                    ? [loadLanguage(ux.language) as any]
                    : [EditorView.lineWrapping]
            }
            minHeight="calc(100vh - 200px)"
            theme={theme === "light" ? Eclipse : "dark" as any}
            value={data}
            onChange={(value: any) => {
                textChangeHandler(value);
            }}
        />
    );
};

export default CodeMirror;
