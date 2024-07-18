// Resolves query or returns null
export default function useData() {
	const token: any = localStorage.getItem("accessToken");
	const tokenDecodablePart = token.split(".")[1];
	const decoded = Buffer.from(tokenDecodablePart, "base64").toString();

	return JSON.parse(decoded);
}
