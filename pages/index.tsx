import FaqComponent from "@/components/FaqComponent";
import Paste from "@/components/Paste";

const IndexPage = () => {
	return (
		<>
			<Paste />
			<div className="divider"></div>
			<FaqComponent />
		</>
	);
};

export default IndexPage;
