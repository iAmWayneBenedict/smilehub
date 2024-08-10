import { Outlet, Navigate } from "react-router-dom";
import { useAuthTokenPersisted } from "@/store/zustand";
import { decrypt } from "./utils";

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

/**
 * Component that conditionally renders navigation based on authentication status.
 *
 * If an authentication token is present, it redirects to the home page.
 * Otherwise, it renders the child components (Outlet).
 *
 * @returns {JSX.Element} Either a <Navigate> component or an <Outlet> component.
 */
export const StaffAuthRoutes = () => {
	const { authToken } = useAuthTokenPersisted();
	const token = decrypt(authToken);
	if (!token || token.role !== "STAFF") {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};
/**
 * Component that conditionally renders navigation based on authentication status.
 *
 * If an authentication token is present, it redirects to the home page.
 * Otherwise, it renders the child components (Outlet).
 *
 * @returns {JSX.Element} Either a <Navigate> component or an <Outlet> component.
 */
export const AdminAuthRoutes = () => {
	const { authToken } = useAuthTokenPersisted();
	const token = decrypt(authToken);
	console.log(token);
	if (!token || token.role !== "ADMIN") {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};
