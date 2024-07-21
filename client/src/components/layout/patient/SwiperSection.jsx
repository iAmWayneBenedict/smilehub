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
import blogsSliderImg1 from "../../../assets/images/blogs-slider-img-1.png";
import blogsSliderImg2 from "../../../assets/images/blogs-slider-img-2.png";
import blogsSliderImg3 from "../../../assets/images/blogs-slider-img-3.png";
import articleImg1 from "../../../assets/images/article img 1.png";
import articleImg2 from "../../../assets/images/article img 2.png";
import articleImg3 from "../../../assets/images/article img 3.png";
import articleImg4 from "../../../assets/images/article img 4.png";
import articleImg5 from "../../../assets/images/article img 5.png";
import articleImg6 from "../../../assets/images/article img 6.png";
import articleImg7 from "../../../assets/images/article img 7.png";
import articleImg8 from "../../../assets/images/article img 8.png";

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
	blogs: [
		// {
		// 	image: blogsSliderImg1,
		// },
		// {
		// 	image: blogsSliderImg2,
		// },
		// {
		// 	image: blogsSliderImg3,
		// },
		{
			image: articleImg1,
		},
		{
			image: articleImg2,
		},
		{
			image: articleImg3,
		},
		{
			image: articleImg4,
		},
		{
			image: articleImg5,
		},
	],
};

const SwiperSection = ({
	sectionHeaderOptions,
	className,
	childClassName,
	type,
	buttonTheme = "light",
	slidesPerView,
	showSectionHeader = true,
}) => {
	return (
		<div className={cn("container-fluid bg-accent mt-36", className)}>
			<div className={cn("flex flex-col items-center w-full py-16", childClassName)}>
				{showSectionHeader && (
					<SectionHeader
						firstSeriesText={sectionHeaderOptions?.firstSeriesText}
						textUnderlined={sectionHeaderOptions?.textUnderlined}
						customUnderlineOptions={sectionHeaderOptions?.customUnderlineOptions}
						description={sectionHeaderOptions?.description}
					/>
				)}

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
	childClassName: PropTypes.string,
	type: PropTypes.string,
	buttonTheme: PropTypes.string,
	slidesPerView: PropTypes.string,
	showSectionHeader: PropTypes.bool,
};

export default SwiperSection;
