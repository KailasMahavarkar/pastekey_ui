const MODE = process.env.NEXT_PUBLIC_MODE || "DEV";
function withMode(dev: any, prod: any): string {
	if (MODE === "DEV") {
		return dev;
	}
	return prod;
}


// env file
export const env = {
	MODE: MODE,
	MAINTAINANCE: process.env.NEXT_PUBLIC_MAINTAINANCE || false,
	SERVER_URL: withMode(
		process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
		process.env.NEXT_PUBLIC_SERVER_URL
	),
	APP: "pastekey",
	APP_LOWER: "pastekey",
	APP_WITH_DOMAIN: "pastekey.io",
	APP_WITH_DOMAIN_LOWER: "pastekey.io",
	COMPANY: "orkait solutions",
	URL: withMode("http://localhost:3000", "https://pastekey.netlify.app"),
	GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
	ADSENSE_CLIENT: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
};

export const settings = {
	MAX_TABS_ALLOWED: 16,
};
