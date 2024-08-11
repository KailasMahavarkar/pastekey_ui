import { NextPage } from "next/types";
import { useContext } from "react";
import PasteInfo from "@/blocks/paste/PasteInfo";
import PasteTab from "@/blocks/paste/PasteTab";
import PasteContext from "@/context/paste.context";

import PasteCreateForm from "@/forms/paste.create.form";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import CodeBox from "@/library/CodeBox";

const Paste: NextPage = () => {
    const { data, textChangeHandler } = useContext(PasteContext);

    const ux = useSelector((state: RootState) => state.ux);

    return (
        <div id="paste">
            <PasteTab />
            <PasteInfo />

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
