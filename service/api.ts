import axios from "@/service/axios.service";

const api = {
	paste: {
		createPaste: (data: any) => axios.get("/posts"),
		getPaste: (id: string) => axios.get(`/posts/${id}`),
		updatePaste: (id: string, data: any) => axios.put(`/posts/${id}`, data),
		deletePaste: (id: string) => axios.delete(`/posts/${id}`),
	},
	user: {
		login: (data: any) => axios.post("/auth/login", data),
		register: (data: any) => axios.post("/auth/register", data),
		resetPassword: (data: any) => axios.post("/auth/reset", data),
	}
};

export default api;
