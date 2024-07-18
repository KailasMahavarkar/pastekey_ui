import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapse from "@/components/Collapse";
import Link from "next/link";
import { env } from "@/env";

const FaqComponent = () => {
	return (
		<section className="prose lg:prose-xl max-w-none">
			<h2 className="mb-8 tracking-tight font-extrabold">
				Frequently asked questions
			</h2>

			<div className="flex flex-col lg:flex-row w-full lg:gap-20">
				{/* ------------------ */}
				{/* --- LEFT SIDE --- */}
				{/* ------------------ */}
				<div>
					<Collapse question={`What is ${env.APP_WITH_DOMAIN}?`}>
						{`${env.APP_WITH_DOMAIN} is a web application that offers a range of
						tools for different tasks. One popular tool is the
						"paste" tool, which allows you to create text documents
						and save them to a secure database. When you create a
						new paste, you will be given a unique link that you can
						use to retrieve the text later.`}
					</Collapse>
					<Collapse question="How do I use paste tool?">
						<ul className="leading-tight">
							<li>Go to the {env.APP_WITH_DOMAIN} website.</li>
							<li>
								Paste your text into the text area provided.
							</li>
							<li>{`Click the "Create New Paste" button.`}</li>
							<li>
								You will be redirected to a page with a unique
								URL that you can share with others to give them
								access to your paste.
							</li>
						</ul>
					</Collapse>
					<Collapse question="Do we have syntax highlighting?">
						We support syntax highlighting for few popular languages
						like JavaScript, Python, HTML, CSS, and more will be
						added soon.
					</Collapse>
					<Collapse question="Is this just a paste tool?">
						<ul>
							<li>
								At {env.APP_WITH_DOMAIN}, our goal is to provide a range
								of useful tools that can be used by anyone.
							</li>
							<li>
								We are constantly working to improve our service
								and add new tools, so be sure to check back
								often.
							</li>
							<li>
								{`If you have any suggestions for new tools that
								you would like to see on our platform, please
								don't hesitate to send us an email at
								admin@${env.APP_WITH_DOMAIN}`}
							</li>
							<li>
								You can see a list of all the tools currently
								available on our{" "}
								<Link href="/tools">
									<u>tools</u>
								</Link>{" "}
								page.
							</li>
						</ul>
					</Collapse>
				</div>
				{/* ------------------ */}
				{/* --- RIGHT SIDE --- */}
				{/* ------------------ */}
				<div>
					<Collapse question="Is this a free service?">
						{env.APP} is a 100% free service and will always remain
						free. We do not collect personal information or sell
						data, and we are not affiliated with any other company.
					</Collapse>
					<Collapse question="What is maximum lifespan of paste">
						<ul>
							<li>
								To ensure the security of our service, we do not
								store data for longer than 10 years.
							</li>
							<li>
								{`Using the term "forever" can be confusing on many 
								platforms, so we prefer to avoid it.`}
							</li>
							<li>
								Your paste will be automatically deleted after
								10 years, or whenever you choose to delete it.
							</li>
							<li>
								We believe that this policy is a fair compromise
								between security and usability.
							</li>
						</ul>
					</Collapse>
					<Collapse question="How secure is my paste?">
						{`Very secure, we don't want to compromise your
                                data, so for all private paste we use the aes-256 encryption
                                algorithm to encrypt your data before it is
                                stored in the database. its all done on the client
                                side, so we never see your data.`}
					</Collapse>

					<Collapse question="How password is managed in backend?">
						{`Your password or it's computed hash is never shared with server,
							to understand the process`}{" "}
						<Link href="/docs/data-handling" passHref={true}>
							<span className="cursor-pointer">
								<u>Learn more </u>
								<FontAwesomeIcon
									icon={faArrowRight}
									className="w-3 h-3 inline-block"
								/>
							</span>
						</Link>
					</Collapse>
				</div>
			</div>
		</section>
	);
};

export default FaqComponent;
