import RegisterForm from "@/components/forms/register.form";
import Community from "@/components/Community";

function Login() {
	return (
		<>
			<RegisterForm />
			<div className="divider" />
			<Community />
		</>
	);
}

export default Login;
