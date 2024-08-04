import { Outlet, Navigate } from "react-router-dom";
import { useAuthTokenPersisted } from "@/store/zustand";

/**
 * Component that conditionally renders navigation based on authentication status.
 *
 * If an authentication token is present, it redirects to the home page.
 * Otherwise, it renders the child components (Outlet).
 *
 * @returns {JSX.Element} Either a <Navigate> component or an <Outlet> component.
 */
export const DisableAuthRoutes = () => {
	const { authToken } = useAuthTokenPersisted();
	if (authToken) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};
