const PageLayout = ({ children }: any) => {
	return (
		<div className="flex justify-center">
			<div className="prose  xl:prose-xl ">{children}</div>
		</div>
	);
};

export default PageLayout;
