import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "@/service/axios.service";
import { sha512 } from "js-sha512";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { randomBase62, tail, url } from "@/helper";
import { timeArray } from "@/timing";
import customToast from "@/toast";
import { encryptAES } from "@/utils/crypto";
import PasteContext from "@/context/paste.context";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const style_paste = {
    feature: {
        sm: "flex flex-col w-100",
    },
    form_child: {
        sm: "flex flex-col md:flex-row mb-2 ",
    },
    form_child_item: {
        sm: "flex flex-col w-full max-w-xs w-100",
        md: "md:mx-3",
    },
    form_child_item_label: {
        sm: "label",
    },
    form_child_item_select: {
        sm: "select select-bordered w-full",
    },
    form_child_item_label_span: {
        sm: "label-text",
    },
    form_child_item_label_span_alt: {
        sm: "label-text-alt",
    },
    form_child_item_label_span_alt_available: {
        sm: "label-text-alt text-green-500",
    },
    form_child_item_label_span_alt_not_available: {
        sm: "label-text-alt text-red-500",
    },
    form_child_item_input: {
        sm: "input input-bordered w-full max-w-xs",
    },
};
export const style = tail(style_paste);

const PasteCreateForm = () => {
    const { current, currentHandler, data } = useContext(PasteContext);
    const ux = useSelector((state: RootState) => state.ux);
    const privacyRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const tagChangeHandler = async (e: any) => {
        // loop through tag values

        const validChars = [];
        for (let i = 0; i < e.target.value.length; i++) {
            const charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYX1234567890";

            if (charset.includes(e.target.value[i])) {
                validChars.push(e.target.value[i]);
            }
        }

        currentHandler("tag", validChars.toString().replaceAll(",", ""));
    };

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();

        if (!current.available && current.tag) {
            privacyRef.current?.focus();
            return;
        }

        if (data.size === 0) {
            customToast({
                message: "cannot create empty paste",
                icon: "error",
                timer: 2000,
            });

            return;
        }

        if (current.privacy === "private") {
            if (current.masterkey && current.password === sha512("")) {
                return;
            }
        }

        try {
            // generate tokens
            let eseed = "";
            let vseed = "";
            let vct = "";
            let ect = "";
            const dataEncrypted = [];

            const masterkeyHash = sha512(current.masterkey).toString();
            const passwordHash = sha512(current.password).toString();

            // masterkey
            if (current.privacy === "private") {
                if (current.masterkey !== "") {
                    eseed = randomBase62(64);
                    ect = encryptAES(eseed, masterkeyHash);
                }

                // password
                if (current.password !== "") {
                    vseed = randomBase62(64);
                    vct = encryptAES(vseed, passwordHash);
                }

                for (let i = 0; i < data.tabcount; i++) {
                    dataEncrypted.push(
                        encryptAES(data.pasteMap[i], passwordHash)
                    );
                }
            }

            const dataBody = {
                tag: current.tag,
                title: current.title || "Untitled",
                data:
                    current.privacy !== "private"
                        ? data.pasteMap
                        : dataEncrypted,
                expiry: current.expiry,
                maxViews: current.maxViews,
                privacy: current.privacy,
                eseed: eseed,
                vseed: vseed,
                vct: vct,
                ect: ect,
                tools: ux
            };

            const apiResult = await axios.post(url("/paste"), dataBody);

            const tag = apiResult.data.data.tag;

            if (apiResult.data.status === "success") {
                customToast({
                    icon: "success",
                    message: `Paste ${tag} created successfully`,
                });

                currentHandler("available", true);
                currentHandler("tag", tag);
                router.push(`/r/${tag}`);
            }
        } catch (error: any) {
            customToast({
                icon: "error",
                message: error?.response?.data.msg,
            });
        }
    };

    return (
        <form className={style.feature} onSubmit={formSubmitHandler}>
            <div className={style.form_child}>
                {/* START: tag */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Tag
                        </span>
                    </label>
                    <input
                        value={current.tag}
                        ref={privacyRef}
                        type="text"
                        placeholder="Type here"
                        className={style.form_child_item_input}
                        onChange={(e) => {
                            tagChangeHandler(e);
                        }}
                        name="tag"
                    ></input>
                </div>
                {/* END: tag */}

                {/* START: Category */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Category
                        </span>
                        <span
                            className={style.form_child_item_label_span_alt}
                        ></span>
                    </label>

                    <select
                        className={style.form_child_item_select}
                        name="category"
                        onChange={(e) => {
                            currentHandler("category", e.target.value);
                        }}
                        defaultValue={current.category}
                    >
                        <option value="general">general</option>
                        <option value="programming">programming</option>
                        <option value="key:value">key:value</option>
                        <option value="others">others</option>
                    </select>
                </div>
                {/* END: Category */}
            </div>
            {/* title and privacy */}
            <div className={style.form_child}>
                {/* START: Title */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Title
                        </span>
                        <span
                            className={style.form_child_item_label_span_alt}
                        ></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className={style.form_child_item_input}
                        onChange={(e) => {
                            currentHandler("title", e.target.value);
                        }}
                        name="title"
                        value={current.title}
                    ></input>
                </div>
                {/* END: Title */}

                {/* START: Privacy */}

                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Privacy
                        </span>
                        <span
                            className={style.form_child_item_label_span_alt}
                        ></span>
                    </label>

                    <select
                        className={style.form_child_item_select}
                        name="privacy"
                        onChange={(e) => {
                            currentHandler("privacy", e.target.value);
                        }}
                        defaultValue={current.privacy}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="unlisted">{"Public (unlisted)"}</option>
                    </select>
                </div>
                {/* END: privacy */}
            </div>

            {/* expiry and maxViews */}
            <div className={style.form_child}>
                {/* START: Expiry */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Expiry Time
                        </span>
                        <span
                            className={style.form_child_item_label_span_alt}
                        ></span>
                    </label>
                    <select
                        className={style.form_child_item_select}
                        value={current?.expiry}
                        onChange={(e) => {
                            currentHandler("expiry", e.target.value);
                        }}
                        name="expiry"
                    >
                        <option value="">Select Expiry</option>
                        {timeArray.map((time, index) => {
                            if (time === current.expiry) {
                                return (
                                    <option
                                        value={time}
                                        defaultValue="5 years"
                                        key={index}
                                    >
                                        {time}
                                    </option>
                                );
                            } else {
                                return (
                                    <option value={time} key={index}>
                                        {time}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
                {/* END: Expiry */}

                {/* START: Maxviews */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Burn After Views
                        </span>
                        <span
                            className={style.form_child_item_label_span_alt}
                        ></span>
                    </label>
                    <input
                        type="number"
                        placeholder="Type here"
                        onChange={(e) => {
                            currentHandler(
                                "maxViews",
                                Number(e.target.value || 1000)
                            );
                        }}
                        value={current.maxViews}
                        name="maxViews"
                        className={style.form_child_item_input}
                        max={1000000000}
                    ></input>
                </div>
                {/* END: Maxviews */}
            </div>

            {/* password and masterkey */}
            <div className={style.form_child}>
                {/* START: Password */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Password (view key)
                        </span>
                        <span className={style.form_child_item_label_span_alt}>
                            <FontAwesomeIcon
                                icon={faEye as IconProp}
                                onClick={() => {
                                    currentHandler(
                                        "showPassword",
                                        !current.showPassword
                                    );
                                }}
                                color={current.showPassword ? "red" : "black"}
                            />
                        </span>
                    </label>
                    <input
                        type={current.showPassword ? "text" : "password"}
                        defaultValue={current.password}
                        className={style.form_child_item_input}
                        placeholder="Create Password"
                        name="password"
                        disabled={
                            current.privacy === "public" ||
                            current.privacy === "unlisted"
                        }
                        onChange={(e) => {
                            currentHandler("password", e.target.value);
                        }}
                        required={
                            current.masterkey && current.password === ""
                                ? true
                                : false
                        }
                        autoComplete="on"
                    />

                    <label className={style.form_child_item_label}>
                        <span
                            className={style.form_child_item_label_span}
                        ></span>
                        <span className={style.form_child_item_label_span_alt}>
                            {/* {errors.password && "Password is Required"} */}
                        </span>
                    </label>
                </div>
                {/* END: Password */}

                {/* START: Masterkey */}
                <div className={style.form_child_item}>
                    <label className={style.form_child_item_label}>
                        <span className={style.form_child_item_label_span}>
                            Paste Masterkey (edit key)
                        </span>
                        <span className={style.form_child_item_label_span_alt}>
                            <FontAwesomeIcon
                                icon={faEye as IconProp}
                                onClick={() => {
                                    currentHandler(
                                        "showMasterkey",
                                        !current.showMasterkey
                                    );
                                }}
                                color={current.showMasterkey ? "red" : "black"}
                            />
                        </span>
                    </label>
                    <input
                        type={current.showMasterkey ? "text" : "password"}
                        onChange={(e) => {
                            currentHandler("masterkey", e.target.value);
                        }}
                        className={style.form_child_item_input}
                        placeholder="Create Masterkey"
                        name="masterkey"
                        required={current.privacy === "private"}
                        disabled={
                            current.privacy === "public" ||
                            current.privacy === "unlisted"
                        }
                        autoComplete="on"
                    />
                </div>
                {/* END: Masterkey */}
            </div>

            {/* submit */}
            <div className={style.form_child}>
                <div className={style.form_child_item}>
                    <input
                        type="submit"
                        value="create new paste"
                        className="btn btn-primary"
                    />
                </div>
            </div>
        </form>
    );
};

export default PasteCreateForm;
