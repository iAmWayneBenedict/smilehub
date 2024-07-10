import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * Container wrapper for home pages with a default max width of 1536px.
 *
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the container.
 * @param {string} [props.className] - The optional class name for the container.
 * @param {object} [props.style] - Additional styles for the container.
 * @returns {JSX.Element} The rendered container component.
 */
const ContainerWrapper = ({ children, className, ...props }) => {
	return (
		<div className={cn("container max-w-[1536px] p-0 px-4", className)} {...props}>
			{children}
		</div>
	);
};
ContainerWrapper.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	props: PropTypes.object,
};

export default ContainerWrapper;
