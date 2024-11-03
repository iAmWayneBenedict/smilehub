import { useLocation } from "react-router-dom";
import Footer from "../patient/Footer";
import PropTypes from "prop-types";
import NavigationBar from "../navbar/NavigationBar";
import SharedNavBar from "../shared/navbar";
import SideNav from "../shared/sideNav";
const LayoutWrapper = ({ child }) => {
	const location = useLocation();

	// check if the current route is an admin route
	const isAdminRoutes =
		location?.pathname?.includes("admin") ||
		location?.pathname?.includes("staff") ||
		location?.pathname?.includes("shared");

	return (
		<div>
			{/* if admin show the shared nav bar else show the regular nav */}
			{isAdminRoutes ? <SharedNavBar /> : <NavigationBar />}
			{/* if admin show the admin panel */}
			{isAdminRoutes && (
				<div className="flex">
					<div className="hidden lg:flex">
						<SideNav />
					</div>
					{child}
				</div>
			)}
			{/* if not admin show the regular child */}
			{!isAdminRoutes && child}

			{location.pathname !== "/login" &&
				location.pathname !== "/register" &&
				!isAdminRoutes && <Footer />}
		</div>
	);
};

LayoutWrapper.propTypes = {
	child: PropTypes.node,
};

export default LayoutWrapper;
