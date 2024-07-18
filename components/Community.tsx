// import styled from "styled-components";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faMeteor,
	faArrowAltCircleUp,
	faStar,
	faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const data = [
	{
		name: "Awesome UI",
		text: "Experience an awesome UI while securely pasting and sharing your text with ease",
		icon: faMeteor,
	},
	{
		name: "Secure Paste",
		text: "Our platform offers a simple and easy-to-use interface with top-notch security for your pastes.",
		icon: faShield,
	},
	{
		name: "Simple",
		text: "Enjoy a seamless paste-and-share experience thanks to our intuitive user interface and secure pasting capabilities",
		icon: faStar,
	},
	// {
	// 	name: "monitization",
	// 	text: `Turn your passion into profit. Pasterock is a free,
	//     simple way to earn money by making paste, url
	//     shortner and by sharing media files.`,
	// 	icon: faMeteor as IconProp,
	// },
	// {
	// 	name: "Super Dashboard",
	// 	text: `Super Dashboard helps you Analyse and strategize
	//     Paste Settings, Ads, Profile Settings, Coupons,
	//     Payment options and more.`,
	// 	icon: faChartLine as IconProp,
	// },
	// {
	// 	name: "Super and fair checkout rates",
	// 	text: `We want our service to be fair and easy for user to
	//     paste content but at the same time profitable for
	//     member.`,
	// 	icon: faChartBar as IconProp,
	// },
	// {
	// 	name: "Lowest Possible checkouts",
	// 	text: ` Depending upon demographics, you may get lowest
	//     possible checkouts as low as $3 (available in india,
	//     indonesia and 3 more)`,
	// 	icon: faDollarSign as IconProp,
	// },
];

function Community() {
	return (
		<>
			<div className="flex flex-col justify-between items-center lg:flex-row">
				<div className="flex-1">
					{data.map((item, index) => {
						return (
							<div
								key={index}
								className="flex m-2 rounded-[5px] justify-between items-center max-w-[800px] lg:rounded-[100px] p-4"
							>
								<div className="flex justify-center items-center bg-primary rounded-[300px] ">
									<FontAwesomeIcon
										icon={item.icon as IconProp}
										size="2x"
										className="text-white w-[40px] h-[40px] p-3"
									/>
								</div>

								<div className="ml-3">
									<h4 className="font-bold">{item.name}</h4>
									<div className="flex items-center justify-center ">
										{item.text}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex-1 flex flex-col  items-center justify-center w-full">
					<Image
						layout="fixed"
						src="/svg/LaptopIcon.svg"
						alt="laptop_image"
						width={300}
						height={300}
					/>

					<button className="btn rounded-lg m-2">
						<Link href="/register">Join our awesome community</Link>
					</button>

					<div>
						<FontAwesomeIcon
							icon={faArrowAltCircleUp}
							width={50}
							size="2x"
							height={50}
						/>
					</div>
				</div>
			</div>

			<div className="divider-200" />
		</>
	);
}

export default Community;
