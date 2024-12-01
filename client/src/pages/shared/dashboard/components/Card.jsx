import PropTypes from "prop-types";
import { cn } from "@/lib/utils.js";

const Card = ({title, value, icon, bg, color}) => {
	return (
		<div style={ { flex: 1 } } className={ "flex flex-row gap-4 bg-white shadow-md rounded-xl p-4 items-center" }>
			<div className={ "flex flex-col" } style={ { flex: 1 } }>
				<p className={ "text-md font-medium text-gray-500" }>{title}</p>
				<p className={ cn("text-primary font-bold text-3xl", color) }>{value}</p>
			</div>
			<div className={ cn('w-fit h-full bg-primary/20 rounded-xl p-3 items-center justify-center content-center', bg) }>
				{icon}
			</div>
		</div>
	);
};
Card.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	bg: PropTypes.string,
	color: PropTypes.string,
	icon: PropTypes.element,
}

export default Card;