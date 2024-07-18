import Link from "next/link";

const ToolHeader = () => {
	const toolBox = [
		{
			name: "Paste",
			link: "/paste",
			icon: [],
			description: "Paste text and get a link to share it with others.",
		},
		{
			name: "AES-ECB",
			link: "/aes-ecb",
			icon: [],
			description: `AES-ECB
            A pure JavaScript implementation of the AES block cipher algorithm and features.
            Simple and very secure Cipher for encrypt and decrypt some sensetive string values.`,
		},
		{
			name: "AES-CBC",
			link: "/aes-cbc",
			icon: [],
			description: `A pure JavaScript implementation of the AES block cipher algorithm and all common modes of operation (CBC, CFB, CTR, ECB and OFB).`,
		},
		{
			name: "Calculators",
			link: "/calculators",
			icon: [],
			description: `A collection of calculators for various purposes to solve your problems.
            in feilds like Mathematics, Physics, Chemistry, Biology, Finance, Engineering, etc.",
            some calculators are:
            - BMI Calculator
            - Body Fat Calculator
            - Body Surface Area Calculator
            - Body Water Calculator
            - Calories Burned Calculator
            - Calories Needed Calculator
            - Carbohydrate Calculator
            - Cholesterol Calculator
            - Daily Calorie Calculator
            - Daily Calorie Calculator
            `,
		},
		{
			name: "server",
			link: "/server",
			icon: [],
			description: `A collection of calculators for various purposes to solve your problems.`,
		},
	];
	return (
		<>
			<div className="flex mt-[30px]">
				<ul>
					{toolBox.map((tool, index) => {
						return (
							<li key={index} className="btn btn-outline mr-2">
								<Link href={ "tools/" + tool.link}>{tool.name}</Link>
								<span className="hidden">{tool.description}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default ToolHeader;
