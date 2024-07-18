import { NextPage } from "next/types";
import { useContext } from "react";
import PasteInfo from "@/blocks/paste/PasteInfo";
import PasteTab from "@/blocks/paste/PasteTab";
import PasteContext from "@/context/paste.context";

import PasteCreateForm from "@/forms/paste.create.form";
import CodeMirror from "./CodeMirror";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";

const Paste: NextPage = () => {
    const { data, textChangeHandler } = useContext(PasteContext);

    return (
        <div id="paste">
            <PasteTab />
            <PasteInfo />

            <CodeMirror
                data={data?.pasteMap[data?.active]}
                textChangeHandler={textChangeHandler}
                readOnly={false}
            />

            <PasteCreateForm />
        </div>
    );
};

export default Paste;
