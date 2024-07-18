import { env } from "@/env";

const imageFetch = (name: string, type?: "image" | "icon") => {
	if (type === "icon") {
		return `https://imageresizer.com/icon/${name}`;
	}
	return `https://imageresizer.com/images/${name}`;
};
const fileshareData = [
	{
		name: "Perfect Quality",
		info: "The best file sharing website to share your files at the highest quality",
		icon: "",
		image_url: imageFetch("verwandeln.png"),
	},
	{
		name: "Lightning Fast",
		info: "This cloud-hosted, highly scalable tool can store your files within seconds!",
		icon: "",
		image_url: imageFetch("pencil.png"),
	},
	{
		name: "Easy to Use",
		info: "Simply upload your files or use drag and drop. It's as easy as that!",
		icon: "",
		image_url: imageFetch("pencil.png"),
	},
	{
		name: "Works Anywhere",
		info: `${env.APP_WITH_DOMAIN} is browser-based (no software to install). It works on any platform (Windows, Linux, Mac).`,
		icon: "",
		image_url: imageFetch("ratio.png"),
	},
	{
		name: "Privacy Guaranteed",
		info: "Your files are uploaded via a secure 256-bit encrypted SSL connection and deleted automatically within 6 hours",
		icon: "",
		image_url: imageFetch("secure-shield.png"),
	},
	{
		name: "It's Free",
		info: "Since 2019 we have hosted millions of files for free! There is no software to install, registrations, or watermarks.",
		icon: "",
		image_url: imageFetch("heart.png"),
	},
];

export default fileshareData;
