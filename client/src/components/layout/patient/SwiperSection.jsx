import { cn } from "@/lib/utils";
import SectionHeader from "./components/SectionHeader";
import SwiperElement from "./components/SwiperElement";
import PropTypes from "prop-types";
import JimCarryImage from "../../../assets/images/jim-carry.png";
import WadeWarrenImage from "../../../assets/images/wade-warren.png";
import JennyWilsonImage from "../../../assets/images/jenny-wilson.png";
import JacobJonesImage from "../../../assets/images/jacob-jones.png";
import ThomasDaniel from "../../../assets/images/Thomas Daniel.png";
import AlenaAlex from "../../../assets/images/Alena Alex.png";
import ThomasEdison from "../../../assets/images/Thomas Edison.png";
import MarkKepler from "../../../assets/images/Mark Kepler.png";

const tempData = {
	specialists: [
		{
			image: JimCarryImage,
			name: "Jim Carry",
			position: "Orthodontist",
		},
		{
			image: WadeWarrenImage,
			name: "Wade Warren",
			position: "Endodontist",
		},
		{
			image: JennyWilsonImage,
			name: "Jim Carry",
			position: "Periodontist",
		},
		{
			image: JacobJonesImage,
			name: "Jacob Jones",
			position: "Pediatric Dentist",
		},
		{
			image: JimCarryImage,
			name: "Jim Carry",
			position: "Orthodontist",
		},
	],
	feedbacks: [
		{
			image: ThomasDaniel,
			name: "Thomas Daniel",
			description:
				"Phosfluorescently synergize covalent outsourcing through functional strategic theme areas. Assertively scale strategic portals without distinctive relationships. Holisticly cultivate tactical e-services before fully researched sources.",
		},
		{
			image: AlenaAlex,
			name: "Alena Alex",
			description:
				"Phosfluorescently synergize covalent outsourcing through functional strategic theme areas. Assertively scale strategic portals without distinctive relationships. Holisticly cultivate tactical e-services before fully researched sources.",
		},
		{
			image: ThomasEdison,
			name: "Thomas Edison",
			description:
				"Phosfluorescently synergize covalent outsourcing through functional strategic theme areas. Assertively scale strategic portals without distinctive relationships. Holisticly cultivate tactical e-services before fully researched sources.",
		},
		{
			image: MarkKepler,
			name: "Mark Kepler",
			description:
				"Phosfluorescently synergize covalent outsourcing through functional strategic theme areas. Assertively scale strategic portals without distinctive relationships. Holisticly cultivate tactical e-services before fully researched sources.",
		},
	],
};

const SwiperSection = ({
	sectionHeaderOptions,
	className,
	type,
	buttonTheme = "light",
	slidesPerView,
}) => {
	return (
		<div className={cn("container-fluid bg-accent mt-36", className)}>
			<div className="flex flex-col items-center w-full py-16">
				<SectionHeader
					firstSeriesText={sectionHeaderOptions?.firstSeriesText}
					textUnderlined={sectionHeaderOptions?.textUnderlined}
					customUnderlineOptions={sectionHeaderOptions?.customUnderlineOptions}
					description={sectionHeaderOptions?.description}
				/>

				<SwiperElement
					data={tempData[type]}
					type={type}
					buttonTheme={buttonTheme}
					slidesPerView={slidesPerView}
				/>
			</div>
		</div>
	);
};
SwiperSection.propTypes = {
	sectionHeaderOptions: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	buttonTheme: PropTypes.string,
	slidesPerView: PropTypes.string,
};

export default SwiperSection;
