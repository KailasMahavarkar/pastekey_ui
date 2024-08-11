import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleNetworkError, url } from "@/helper";
import customToast from "@/toast";
import { useState } from "react";
import axios from "axios";
import Button from "@/components/Button";

// contact form
const PasteContactForm = () => {
    const initalState = {
        name: "",
        message: "",
        email: "",
    };

    // profile form state
    const [contact, setContact] = useState(initalState);

    const formSubmitHandler = async (e: any) => {
        e.preventDefault();

        // update profile
        try {
            const result = await axios.post(url("/contact"), {
                ...contact,
            });

            console.log(result);

            return customToast({
                icon: "info",
                message: "message has been sent",
            });
        } catch (error: any) {
            if (handleNetworkError(error)) return;

            return customToast({
                icon: "error",
                message: error.response?.data?.msg,
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-full ">
            <form
                className="border-2 p-5 max-w-md rounded w-full "
                onSubmit={formSubmitHandler}
            >
                <h1 className="flex justify-center items-center ">
                    Update Contact Info
                </h1>
                <div className="divider-100"></div>

                {/* name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <label className="input-group">
                        <span className=" bg-gray-100">
                            <FontAwesomeIcon
                                icon={faUser as IconProp}
                                size="lg"
                            />
                        </span>
                        <input
                            type="text"
                            placeholder=""
                            className="flex-1 input input-bordered"
                            value={contact.name}
                            onChange={(e) => {
                                setContact({
                                    ...contact,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </label>
                </div>

                {/* email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <label className="input-group">
                        <span className=" bg-gray-100">
                            <FontAwesomeIcon
                                icon={faEnvelope as IconProp}
                                size="lg"
                            />
                        </span>
                        <input
                            type="text"
                            placeholder=""
                            className="flex-1 input input-bordered"
                            value={contact.email}
                            onChange={(e) => {
                                setContact({
                                    ...contact,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </label>
                </div>

                {/* message */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Message</span>
                    </label>
                    <textarea
                        placeholder=""
                        className="flex-1 input input-bordered min-h-[150px] resize-y "
                        value={contact.message}
                        onChange={(e) => {
                            setContact({ ...contact, message: e.target.value });
                        }}
                    />
                </div>

                {/* Button */}
                <div className="form-control">
                    <Button
                        className="btn btn-outline btn-primary mt-4"
                        onClick={formSubmitHandler}
                        onKeyPress={(e) => {
                            e.preventDefault();
                            if (e.key === "Enter") {
                                formSubmitHandler;
                            }
                        }}
                        accessibleName="Send Message"
                    >
                        Send Message
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PasteContactForm;
