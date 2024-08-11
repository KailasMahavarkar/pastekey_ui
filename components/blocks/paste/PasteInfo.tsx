import {
    faAdd,
    faCode,
    faCopy,
    faListOl,
    faSubtract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { env } from "@/env";
import { copyHandler, copyHandlerRaw } from "@/helper";
import PasteContext from "@/context/paste.context";
import { useRouter } from "next/router";
import customToast from "@/toast";
import { LangList } from "@/types";
import { useDispatch, useSelector } from 'react-redux';
import { updateCodeMode, updateFontSize, updateLanguage, updateShowLines } from "@/components/redux/services/uxService";
import { RootState } from "@/components/redux/configureStore";
import Button from "@/components/Button";

const copyPasteTag = (tag: string) => {
    if (typeof tag === "string") {
        const copyRes = copyHandler(tag, "paste");
        if (copyRes) {
            customToast({
                message: `tag ${tag} copied to clipboard`,
                icon: "info",
            });
        } else {
            customToast({
                message: `failed to copy tag`,
                icon: "info",
            });
        }
    } else {
        customToast({
            message: "kindly create paste then copy tag",
            icon: "info",
        });
    }
};

const PasteInfo = () => {
    const { current, data, currentHandler } = useContext(PasteContext);
    const router = useRouter();
    const dispatch = useDispatch();
    const ux = useSelector((state: RootState) => state.ux);

    const computed = {
        tag: () => `${env.URL}/r/${router.query.tag?.slice(0, 20) || "tag"}`,
    };

    const incrementFontSize = () => {
        if (ux.fontsize >= 36) {
            return customToast({
                message: "font size cannot be more than 36",
                icon: "warning",
            });
        }
        // add tolls to redux
        dispatch(updateFontSize(ux.fontsize + 2))

        // change font size .CodeMirror
        if (document) {
            const cm = document.querySelector(".cm-editor");
            if (cm) {
                (cm as any).style.fontSize = `${ux.fontsize}px`;
            }
        }
    };

    const decrementFontSize = () => {
        if (ux.fontsize <= 10) {
            return customToast({
                message: "font size cannot be less than 10",
                icon: "warning",
            });
        }

        dispatch(updateFontSize(ux.fontsize - 2))

        // change font size .CodeMirror
        if (document) {
            const cm = document.querySelector(".cm-editor");
            if (cm) {
                (cm as any).style.fontSize = `${ux.fontsize}px`;
            }
        }
    };

    useEffect(() => {
        // change font size .CodeMirror
        if (document) {
            const cm = document.querySelector(".cm-editor");
            if (cm) {
                (cm as any).style.fontSize = `${ux.fontsize}px`;
            }
        }
    }, [ux.fontsize]);

    return (
        <div className="flex flex-col md:flex-row child:p-1 child:md:p-2">
            <div className="flex w-full justify-between items-center lg:flex-1">
                {/* Title */}
                <div className="flex flex-1 w-full bg-base-100">
                    {current?.title?.slice(0, 32) || `Untitled`}
                </div>
                {/* Size */}
                <div className="flex font-bold">
                    {`${Math.floor(data?.size * 1000) / 1000} kb`}
                </div>
            </div>
            <div className="inline-flex flex-col lg:flex-row gap-1 justify-end ">
                {/* info */}
                <div className="inline-flex items-center">
                    <div
                        className="inline-flex border-2 dark:border-primary dark:text-primary px-2 py-1 
					justify-between selection:bg-yellow-500 rounded-full w-full h-full items-center text-xs font-bold lowercase"
                    >
                        <span className="px-2">
                            {computed.tag().toLocaleLowerCase()}{" "}
                        </span>
                        <Button
                            className="btn btn-xs dark:text-primary py-1 px-2 rounded-full"
                            onClick={() => {
                                copyPasteTag(router.query?.tag as string);
                            }}
                            accessibleName="copy tag"
                        >
                            <FontAwesomeIcon icon={faCopy} />
                        </Button>
                    </div>
                </div>

                <div className="inline-flex  gap-1 flex-wrap items-center justify-end">
                    {/* tools */}
                    <div className="btn-group">
                        <Button
                            className="tooltip btn btn-sm btn-square btn-circle rounded-left"
                            data-tip="decrease font"
                            onClick={() => decrementFontSize()}
                            accessibleName="decrease font"
                        >
                            <FontAwesomeIcon icon={faSubtract} />
                        </Button>
                        <Button
                            accessibleName="font size"
                            className="btn btn-sm btn-square btn-circle ">
                            {ux.fontsize}
                        </Button>
                        <Button
                            className="tooltip btn btn-sm btn-square btn-circle rounded-right"
                            data-tip="increase font"
                            onClick={() => incrementFontSize()}
                            accessibleName="increase font"
                        >
                            <FontAwesomeIcon icon={faAdd} />
                        </Button>
                    </div>

                    <Button
                        className={`btn btn-sm btn-square btn-circle md:btn-n ${ux.codeMode ? "btn-primary" : ""
                            }`}
                        onClick={() => {
                            dispatch(updateCodeMode(!ux.codeMode))

                            if (ux.codeMode) {
                                currentHandler("category", "general");
                            } else {
                                currentHandler("category", "programming");
                            }

                            customToast({
                                message: `codemode is ${!ux.codeMode ? "on" : "off"
                                    }`,
                                icon: "info",
                            });
                        }}
                        accessibleName="code mode"
                    >
                        <FontAwesomeIcon icon={faCode} />
                    </Button>

                    {/* show lines if codemode is on */}
                    {!ux.codeMode && (
                        <Button
                            className={`btn btn-sm btn-square btn-circle md:btn-n ${ux.showLines ? "btn-primary" : ""
                                }`}
                            onClick={() => {
                                dispatch(updateShowLines(!ux.showLines))
                                customToast({
                                    message: `line numbers are ${!ux.showLines ? "visible" : "hidden"
                                        }`,
                                    icon: "info",
                                });
                            }}
                            accessibleName="show lines"
                        >
                            <FontAwesomeIcon icon={faListOl} />
                        </Button>
                    )}

                    {ux.codeMode && (
                        <select
                            value={ux.language}
                            className="select select-sm select-bordered max-w-xs"
                            defaultValue={ux.language}
                            onChange={(e) => {
                                dispatch(
                                    updateLanguage(
                                        e.target.value.toLowerCase() as any
                                    )
                                )
                            }}
                        >
                            {Object.keys(LangList).map((lang) => {
                                return <option key={lang}>{lang}</option>;
                            })}
                        </select>
                    )}

                    <Button
                        className="btn btn-sm btn-circle btn-primary"
                        onClick={() => {
                            copyHandlerRaw(data?.pasteMap[data?.active]);
                            if (data?.pasteMap[data?.active].length > 0) {
                                customToast({
                                    message: `tab ${data?.active.toString()} to clipboard`,
                                    icon: "success",
                                });
                            } else {
                                customToast({
                                    message: `tab ${data?.active.toString()} is empty`,
                                    icon: "warning",
                                });
                            }
                        }}
                        accessibleName="copy tab"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PasteInfo;
