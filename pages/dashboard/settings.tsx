import PastePaymentForm from "@/forms/paste.payment.form";
import SocialForm from "@/forms/social.form";
import ProfileForm from "@/forms/profile.form";
import PasswordForm from "@/forms/password.form";
import { tail } from "@/helper";


// (style_*) is custom matcher for tailwindcss syntax suggestion
const style_sheet = {
	formgroup: {
		sm: "flex flex-wrap items-start justify-center",
		md: "md:justify-start",
	},
	form: {
		sm: "flex-1 flex flex-col border-2 m-2 p-5 max-w-md",
	},
};

const style = tail(style_sheet);

const Settings = () => {
	return (
		<>
			<div className={style.formgroup}>
				<div className={style.form}>
					<ProfileForm />
				</div>
				<div className={style.form}>
					<SocialForm />
				</div>
				<div className={style.form}>
					<PastePaymentForm />
				</div>
				<div className={style.form}>
					<PasswordForm />
				</div>
			</div>
		</>
	);
};

export default Settings;
