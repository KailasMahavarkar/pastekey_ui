// import ProfileForm from "@/components/forms/profile.form";
import { faGear, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

const Dashboard = () => {
	const [active, setActive] = useState(0);
	const routes = [
		{
			href: "/dashboard/profile",
			icon: faStore,
			name: "Profile Settings",
		},
		{
			href: "/dashboard/settings",
			icon: faUser,
			name: "Payment Settings",
		},
		{
			href: "/dashboard/manage",
			icon: faGear,
			name: "manage",
		},
	];

	return (
		<div>
			<div className="flex flex-col lg:flex-row mt-5 w-full h-full shadow min-h-[80vh] dark:bg-base-200 dark:shadow-dark dark:shadow-gray-900">
				<div className="flex m-0 p-0 w-full lg:w-auto">
					<ul className="menu flex justify-center lg:justify-start  menu-horizontal lg:menu-vertical lg:w-56 flex-1 bg-base-200 dark:bg-base-300 m-0 h-full p-2">
						{routes.map((route, index) => {
							return (
								<li
									key={index}
									onClick={() => {
										setActive(index);
									}}
								>
									<Link href={route.href}>
										<span className="tooltip-text">
											{route.name}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex-1">
					<div className="flex flex-col w-full items-center justify-center shadow">
						<div className="flex flex-col shadow dark:shadow-gray-400 p-10 m-5">
							{active}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
