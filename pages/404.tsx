import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FourOhFour() {
	const [count, setCount] = useState(5);
	const router = useRouter();

	useEffect(() => {
		// count backwards from 10
		// redirect if 1 second is reached
		const interval = setInterval(() => {
			// update the state after 1000ms
			setCount((currentCount) => currentCount - 1);
		}, 1000);

        if (count <= 0) {
            router.push('/')
        }

        return () => clearInterval(interval);
	}, [count, router]);
	return (
		<>
			<div className="flex items-center justify-center shadow">
				<div className="px-40 py-20 m-[30px] rounded-md shadow-xl">
					<div className="flex flex-col items-center">
						<h1 className="font-bold text-blue-600 m-2 text-9xl">
							404
						</h1>

						<h6 className="mb-2 text-2xl font-bold text-center md:text-3xl">
							<span className="text-red-500">Oops!</span> Page not
							found
						</h6>

						<p className="mb-8 text-center md:text-lg">
							The page you’re looking for doesn’t exist,
							redirecting in{" "}
							<span className="font-extrabold">
								{count} seconds
							</span>
						</p>

						<Link href="/">
							<button className="btn btn-primary btn-wide">
								Go to Home
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
