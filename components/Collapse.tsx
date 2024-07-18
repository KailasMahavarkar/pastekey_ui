import { faCaretDown, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionIcon = () => {
	return (
		<FontAwesomeIcon
			className="bg-gray-600 text-white  dark:bg-white dark:text-gray-600"
			icon={faQuestion}
			style={{
				borderRadius: "50%",
				padding: "0.2rem",
				height: "1rem",
				marginRight: "0.5rem",
				width: "1rem",
			}}
		/>
	);
};

const Collapse = ({
	question,
	children,
}: {
	question: string;
	children: any;
}) => {
	return (
		<div className="mb-5">
			<div className="collapse rounded-md">
				<input type="checkbox" className="peer" />
				<div
					className="collapse-title 
				dark:shadow-xl dark:decoration-pink-700
				font-bold bg-base-200 flex justify-between"
				>
					<div>
						<QuestionIcon />
						{question}
					</div>
					<div>
						<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
					</div>
				</div>
				<div
					className="collapse-content  
				peer-checked:border-2
				dark:peer-checked:border-0
				rounded-b-md
				peer-checked:border-t-0
				peer-checked:text-base-content"
				>
					<span>{children}</span>
				</div>
			</div>
		</div>
	);
};

export default Collapse;
