import axios from "@/service/axios.service";

export const userAPI = {
	login: (data: { username: string; password: string }) => {
		return axios.post("/auth/login", data);
	},
	register: (data: any) => {
		return axios.post("/auth/register", data);
	},
	resetPassword: (data: { email: string }) => {
		return axios.post("/auth/reset", data);
	},
};
