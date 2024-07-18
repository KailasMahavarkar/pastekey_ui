import axios from "axios";
import React, { useEffect } from "react";

function Index({ blogs }: any) {
	return (
		<div>
			<h1 className="text-3xl font-bold underline text-center">
				<pre>{JSON.stringify(blogs, null, 2)}</pre>
			</h1>
		</div>
	);
}

export async function getServerSideProps() {
	let blogsRes = await axios.get("http://127.0.0.1:1337/api/blogs");

	return {
		props: {
			blogs: blogsRes.data,
		},
	};
}

export default Index;
