import {
	faCheck,
	faExclamationCircle,
	faInfoCircle,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type iconType = "success" | "error" | "info" | "warning";

interface AlertBoxProps {
	children: any;
	icon: iconType;
	className?: string;
}

const AlertBox = (props: AlertBoxProps) => {
	const icon = props.icon || "info";

	const iconMap = {
		success: faCheck,
		error: faExclamationCircle,
		info: faInfoCircle,
		warning: faExclamationTriangle,
	};

	const alertColorMap = {
		success: "alert-success",
		error: "alert-error",
		info: "alert-info",
		warning: "alert-warning",
	};

	const classNames = `alert shadow-xl mx-5 w-auto ${alertColorMap[icon]}`;

	const finalClassName = classNames + " " + props.className;

	return (
		<div className={finalClassName}>
			<div>
				<FontAwesomeIcon icon={iconMap[icon]} className="w-5 h-5" />
				<span>{props.children}</span>
			</div>
		</div>
	);
};

export default AlertBox;
