import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortenerData from "@/components/data/shortener";

const shortenerPage = () => {
	// coming soon page
	return (
		<div className="flex flex-col  justify-center items-center w-full">
			<div className=" md:w-2/3">
				<h1 className="font-bold text-5xl text-center my-5">URL Shortener</h1>

				<div className="flex flex-col items-center justify-center">
					<div className="form-control w-full">
						<label className="input-group  input-primary">
							<span className="bg-primary text-primary-content">
								URL to Shorten
							</span>
							<input
								type="text"
								placeholder="https://example.com"
								className="flex-1 input input-bordered w-full"
							/>
						</label>
					</div>
					<button className="btn btn-primary mt-5 rounded-full ">
						<span className="mx-3">Shorten Link</span>
						<FontAwesomeIcon icon={faRocket as IconProp} />
					</button>
				</div>

				<div className="divider my-[50px]"></div>

				<ul className="prose max-w-none flex flex-col md:flex-row child:mt-3">
					<li>
						<h1 className="text-2xl">
							Simple and fast URL shortener!
						</h1>
						<p>
							ShortURL allows to reduce long links from Instagram,
							Facebook, YouTube, Twitter, Linked In and top sites
							on the Internet, just paste the long URL and click
							the Shorten URL button. On the next screen, copy the
							shortened URL and share it on websites, chat and
							e-mail. After shortening the URL, check how many
							clicks it received.
						</p>
					</li>
					<li>
						<h1 className="text-2xl">Shorten, share and track</h1>
						<p>
							Shorten, share and track Your shortened URLs can be
							used in publications, documents, advertisements,
							blogs, forums, instant messages, and other
							locations. Track statistics for your business and
							projects by monitoring the number of hits from your
							URL with the click counter, you do not have to
							register.
						</p>
					</li>
				</ul>
				<div className="divider-100"></div>
				<div className="flex flex-wrap  w-full text-center ">
					{shortenerData.map((item, index) => {
						return (
							<div
								key={index}
								className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
							>
								<div className="flex flex-col m-2  justify-center items-center">
									<FontAwesomeIcon
										size="3x"
										icon={item.icon}
									/>
									<h1 className="text-2xl">{item.name}</h1>
									<p>{item.info}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default shortenerPage;
