import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const style = {
	social_item:
		"flex justify-center items-center m-1 p-2 rounded-md cursor-pointer w-full",
};

const SocialBlock = () => {
	return (
		<div className="flex justify-center items-center w-full">
			<div className={style.social_item}>
				<Link
					href="https://www.twitter.com/codewithboston"
					passHref={true}
				>
					<FontAwesomeIcon
						icon={faTwitter as IconProp}
						size="2x"
					/>
				</Link>
			</div>
			<div className={style.social_item}>
				<Link
					href="https://www.facebook.com/codewithboston"
					passHref={true}
				>
					<FontAwesomeIcon
						icon={faFacebook as IconProp}
						size="2x"
					/>
				</Link>
			</div>
			<div className={style.social_item}>
				<Link
					href="https://www.instagram.com/code.boston"
					passHref={true}
				>
					<FontAwesomeIcon
						icon={faInstagram as IconProp}
						size="2x"
					/>
				</Link>
			</div>
		</div>
	);
};

export default SocialBlock;
