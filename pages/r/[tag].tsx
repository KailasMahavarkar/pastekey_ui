import produce from "immer";
import { NextPage } from "next/types";
import { useContext, useState } from "react";
import { pasteDataType } from "@/types";

// codemirror
import CodeMirror from "@/components/CodeMirror";
import PasteInfo from "@/components/blocks/paste/PasteInfo";
import PasteTab from "@/components/blocks/paste/PasteTab";
import {
    handleNetworkError,
    isEmpty,
    isNetworkError,
    useEffectAsync,
} from "@/helper";
import axios from "@/service/axios.service";
import { useRouter } from "next/router";
import PasteContext from "@/components/context/paste.context";
import customToast from "@/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { decryptAES } from "@/utils/crypto";
import { sha512 } from "js-sha512";
import PasteEditForm from "@/components/forms/paste.edit.form";

const Paste: NextPage = () => {
    const router = useRouter();

    const {
        current,
        currentHandler,
        setCurrent,
        data,
        setData,
        setFormMode,
        unlocked,
        setUnlocked,
        textChangeHandler,

        editMode,
        setEditMode,
    } = useContext(PasteContext);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showMasterkey, setShowMasterkey] = useState<boolean>(false);

    const unlockPasteHandler = async () => {
        const passwordHash = sha512(current.password).toString();
        const result = decryptAES(current.vct, passwordHash);

        if (result !== -1) {
            // make network call to get paste data using valid vseed
            const vseed = result;

            try {
                const result: any = await axios.get(
                    `/paste?tag=${router.query.tag}&vseed=${vseed}`
                );
                const pasteData = result.data.data;

                setCurrent({
                    ...current,
                    ...pasteData,
                });

                const myData = produce(data, (draft: pasteDataType) => {
                    draft.pasteMap = pasteData.data.map((tab: string) => {
                        return decryptAES(tab, passwordHash);
                    });

                    draft.pasteMapSize = draft.pasteMap.map((tab: string) => {
                        return tab.length / 1024;
                    });

                    draft.size = draft.pasteMapSize.reduce((a, b) => a + b, 0);

                    draft.active = 0;
                    draft.tabcount = draft.pasteMap.length;
                    draft.encryptedPasteMap = [];
                    draft.encryptedPasteMapSize = [];
                });

                setData({
                    ...data,
                    ...myData,
                });

                setUnlocked(true);
            } catch (error) {
                if (isNetworkError(error)) {
                    return handleNetworkError(error);
                }
            }
        } else {
            // show error
            customToast({
                message: "Invalid password",
                icon: "error",
            });
        }
    };

    const unlockEditModeHandler = async () => {
        const masterkeyHash = sha512(current.masterkey).toString();
        const result = decryptAES(current.ect, masterkeyHash);

        if (result === -1) {
            customToast({
                message: "Invalid master password",
                icon: "error",
            });
        } else {
            setEditMode(true);
            setFormMode("edit");
            setCurrent({
                ...current,
                eseed: result,
            });
            customToast({
                message: "Paste unlocked",
                icon: "success",
            });
        }
    };

    useEffectAsync(async () => {
        if (!router.isReady) return;

        const tag = router.query.tag as string;
        const password = (router.query.password as string) || "";

        currentHandler("tag", tag);
        setFormMode("read");

        let result: any = {};

        try {
            if (isEmpty(password)) {
                result = await axios.get(`/paste?tag=${tag}`);
            } else {
                result = await axios.get(
                    `/paste?tag=${tag}&password=${password}`
                );
            }
        } catch (error: any) {
            if (isNetworkError(error)) {
                return handleNetworkError(error);
            }

            if (error.response.status === 403) {
                // check if message if of max views reached
                if (error.response.data?.msg === 'Max views reached') {
                    customToast({
                        message: `Paste ${tag} has expired by MaxView`,
                        timer: 3000,
                        icon: "error",
                    }, () => {
                        customToast({
                            message: "Redirecting to home page",
                            timer: 2000,
                            icon: "info",
                        }, () => {
                            router.push("/");
                        })
                    });

                    return;
                }

                if (error.response.data?.msg === 'Paste expired') {
                    customToast({
                        message: `Paste ${tag} has expired by time`,
                        timer: 3000,
                        icon: "error",
                    }, () => {
                        customToast({
                            message: "Redirecting to home page",
                            timer: 2000,
                            icon: "info",
                        }, () => {
                            router.push("/");
                        })
                    });

                    return;
                }

                const meta = error.response.data.meta;


                setCurrent({
                    ...current,
                    vct: meta.vct,
                    ect: meta.ect,
                    privacy: "private",
                    // formMode: "read-private",
                });

                setUnlocked(false);

                customToast({
                    message: "Paste is private, please enter password",
                    timer: 3000,
                    icon: "info",
                });
            }
        }

        console.log("result", result);

        const pasteData: any = result.data?.data;
        if (!pasteData) return;

        setCurrent({
            ...current,
            tag: pasteData?._id,
            formMode: "read",
            showPassword: false,
            showMasterkey: false,
            available: true,
            title: pasteData.title,
            expiry: pasteData.expiry,
            createAt: pasteData.createAt,
            updateAt: pasteData.updateAt,
            expireAt: pasteData.expireAt,
            category: pasteData.category,
            privacy: pasteData.privacy,
            masterkey: pasteData.masterkey,
            password: pasteData.password,

            ect: pasteData.ect,
            vct: pasteData.vct,
            maxViews: pasteData.maxViews,
            eseed: pasteData.eseed,
            vseed: pasteData.vseed,
        });

        const myData = produce(data, (draft: pasteDataType) => {
            draft.pasteMap = pasteData.data;
            draft.encryptedPasteMap = [];
            draft.encryptedPasteMapSize = [];
            draft.pasteMapSize = draft.pasteMap.map((tab: string) => {
                return tab.length / 1024;
            });

            draft.size = draft.pasteMapSize.reduce((a, b) => a + b, 0);
            draft.tabcount = pasteData.data?.length || 0;
            draft.active = 0;
        });

        setData({
            ...data,
            ...myData,
        });
    }, [router.isReady]);
    return (
        <div id="paste">
            {unlocked && (
                <>
                    <PasteTab />
                    <PasteInfo />

                    <CodeMirror
                        data={data?.pasteMap[data?.active]}
                        textChangeHandler={textChangeHandler}
                        readOnly={!editMode}
                    />
                </>
            )}

            {!unlocked && (
                <div
                    className="flex flex-col items-center justify-center dark:border-[1px] dark:border-primary shadow-md text-xl "
                    style={{
                        minHeight: "calc(100vh - 200px)",
                    }}
                >
                    <div>
                        <h3 className="text-primary dark:text-current ">
                            Paste({router.query.tag}) is private and requires a
                            password
                        </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center ">
                        <div className="form-control">
                            <div className="label">
                                <span className="label-text">
                                    Enter Password
                                </span>
                            </div>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered"
                                    onChange={(e) => {
                                        setCurrent({
                                            ...current,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className={
                                            "w-4 h-4 " +
                                            (showPassword ? "text-red-500" : "")
                                        }
                                        icon={faEye}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="form-control w-full mt-3">
                            <button
                                className="btn btn-primary w-full"
                                onClick={() => {
                                    unlockPasteHandler();
                                }}
                            >
                                Unlock Paste
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!editMode && current.privacy === "private" && unlocked && (
                <div className="my-10">
                    <div className="flex m-2">
                        <div>Do you have master password?</div>
                        <label className="input-group input-group-lg ">
                            <input
                                type={showMasterkey ? "text" : "password"}
                                className="input input-bordered"
                                onChange={(e) => {
                                    setCurrent({
                                        ...current,
                                        masterkey: e.target.value,
                                    });
                                }}
                            />
                            <button
                                className="btn"
                                onClick={() => {
                                    setShowMasterkey(!showMasterkey);
                                }}
                            >
                                <FontAwesomeIcon
                                    className={
                                        "w-4 h-4 " +
                                        (showMasterkey ? "text-red-500" : "")
                                    }
                                    icon={faEye}
                                />
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={unlockEditModeHandler}
                            >
                                Unlock
                            </button>
                        </label>
                    </div>
                </div>
            )}

            {editMode && <PasteEditForm />}
        </div>
    );
};

export default Paste;
