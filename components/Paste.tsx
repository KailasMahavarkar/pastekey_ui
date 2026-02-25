import { NextPage } from "next/types";
import { useContext } from "react";
import PasteInfo from "@/blocks/paste/PasteInfo";
import PasteTab from "@/blocks/paste/PasteTab";
import PasteContext from "@/context/paste.context";

import PasteCreateForm from "@/forms/paste.create.form";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import dynamic from "next/dynamic";

const CodeBox = dynamic(() => import("@/library/CodeBox"), {
    ssr: false,
    loading: () => (
        <div className="shadow text-[16px] bg-transparent border-[1px] p-3 rounded-b-md rounded-tr-md min-h-[calc(100vh_-_200px)] flex items-center justify-center">
            Loading Editor...
        </div>
    ),
});

const Paste: NextPage = () => {
    const { data, textChangeHandler } = useContext(PasteContext);

    const ux = useSelector((state: RootState) => state.ux);

    return (
        <div id="paste">
            <PasteTab />
            <PasteInfo
                showCodeMode
            />

            <CodeBox
                data={data?.pasteMap[data?.active] || ''}
                textChangeHandler={textChangeHandler}
                readOnly={false}
                className="rounded-md"
                codeMode={ux.codeMode}
                language={ux.language}
                basicSetup={{
                    lineNumbers: ux.showLines
                }}
            />

            <PasteCreateForm />
        </div>
    );
};

export default Paste;
