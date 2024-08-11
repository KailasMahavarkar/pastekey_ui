import { NextPage } from "next";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    accessibleName?: string;
}

const Button: NextPage<IButton> = (props) => {
    const { className, accessibleName } = props;

    return (
        <button
            aria-label={accessibleName}
            {...props} className={`btn ${className}`}>
            {props.children}
            <span className="hidden">{accessibleName}</span>
        </button>
    );
};

export default Button;
