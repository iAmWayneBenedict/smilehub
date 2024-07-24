import { useLocation } from "react-router-dom";
import Footer from "../patient/Footer";
import PropTypes from "prop-types";
import NavigationBar from "../navbar/NavigationBar";

const LayoutWrapper = ({ child }) => {
	const location = useLocation();
	return (
		<div>
			<NavigationBar />
			{child}
			{location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
		</div>
	);
};

LayoutWrapper.propTypes = {
	child: PropTypes.node,
};

export default LayoutWrapper;
