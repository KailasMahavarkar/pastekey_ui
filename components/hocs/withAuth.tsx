// import { isAuthed } from "@/helper";

// const withAuth = (WrappedComponent: any, props?: any) => {
// 	// eslint-disable-next-line react/display-name
// 	return (props: any) =>
// 		isAuthed() ? <WrappedComponent {...props} /> : <LoginForm />;
// };

const withAuth = (WrappedComponent: any) => {
	// eslint-disable-next-line react/display-name
	return (props: any) => <WrappedComponent {...props} />;
};
export default withAuth;
