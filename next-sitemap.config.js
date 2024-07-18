/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://paste.cc",
	generateRobotsTxt: true,
	exclude: [
		"/tools",
		"/contact",
		"/payout",
		"/dashboard",
		"/transactions",
		"/dashboard/*",
		"/login",
		"/register",
		"/shortener",
		"/tools/*",
	],
};
