const withAuth = (WrappedComponent: any) => {
	// eslint-disable-next-line react/display-name
	return (props: any) => <WrappedComponent {...props} />;
};
export default withAuth;
