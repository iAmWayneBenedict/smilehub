import CustomUnderline from "@/components/illustrations/CustomUnderline";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * SectionHeader component to display a section heading with optional underline and description.
 *
 * @param {object} props - The properties object.
 * @param {object} props.elementClasses - Custom CSS classes for the component elements.
 * @param {string} props.elementClasses.parentClasses - Classes for the parent container.
 * @param {string} props.elementClasses.childClasses - Classes for the child description element.
 * @param {object} props.customUnderlineOptions - Options for customizing the underline.
 * @param {boolean} props.customUnderlineOptions.isLarge - Whether the underline is large.
 * @param {string} props.customUnderlineOptions.classes - Additional classes for the underline.
 * @param {string} props.textUnderlined - The text to be underlined in the heading.
 * @param {string} props.firstSeriesText - The first part of the heading text.
 * @param {string} props.lastSeriesText - The last part of the heading text.
 * @param {string} props.description - An optional description text displayed below the heading.
 * @returns {JSX.Element} The rendered SectionHeader component.
 */
const SectionHeader = ({
	elementClasses,
	customUnderlineOptions,
	textUnderlined,
	firstSeriesText,
	lastSeriesText,
	description,
}) => {
	console.log(textUnderlined, customUnderlineOptions);
	return (
		<div
			className={cn(
				"max-w-[50rem] flex flex-col items-center gap-6",
				elementClasses?.parentClasses
			)}
		>
			<h2 className="text-center ~text-3xl/55xl font-semibold leading-[1.25] capitalize">
				{firstSeriesText}{" "}
				<CustomUnderline
					isLarge={customUnderlineOptions?.isLarge || false}
					childClassName={cn("bottom-[5px] w-[130%]", customUnderlineOptions?.classes)}
				>
					{textUnderlined}
				</CustomUnderline>
				{lastSeriesText}
			</h2>
			{description && (
				<p
					className={cn(
						"~text-base/lg text-center max-w-[30rem] px-4",
						elementClasses?.childClasses
					)}
				>
					{description}
				</p>
			)}
		</div>
	);
};
SectionHeader.propTypes = {
	elementClasses: PropTypes.object,
	customUnderlineOptions: PropTypes.object,
	textUnderlined: PropTypes.string,
	firstSeriesText: PropTypes.string,
	lastSeriesText: PropTypes.string,
	description: PropTypes.string,
};

export default SectionHeader;
