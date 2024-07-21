import { Button, Image } from "@nextui-org/react";
import ContainerWrapper from "../wrappers/ContainerWrapper";
import OutroImg from "../../../assets/images/Ourtro.png";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const OutroHomepageSection = ({ className = "bg-primary" }) => {
	return (
		<ContainerWrapper className="flex justify-center mt-36">
			<div
				className={cn(
					"max-w-[75rem] flex flex-col md:flex-row gap-12 md:gap-32 bg-primary ~p-5/10 rounded-lg",
					className
				)}
			>
				<div
					id="outro-section-left"
					className="flex flex-col gap-5 ~my-1/4"
					style={{ flex: "3" }}
				>
					<h2 className="~text-3xl/45xl font-semibold leading-[1.25] capitalize text-white">
						Dental Website that&rsquo;s gonna shake the game rules up.
					</h2>
					<p className="~text-base/lg text-white">
						We use only the best quality materials on the market in order to provide the
						best products to our patients.
					</p>
					<Button variant="light" className="mt-10 font-semibold bg-white p-7 w-fit">
						Learn More
					</Button>
				</div>
				<div id="outro-section-right" style={{ flex: 2 }}>
					<Image className="w-full h-full" removeWrapper src={OutroImg} />
				</div>
			</div>
		</ContainerWrapper>
	);
};
OutroHomepageSection.propTypes = {
	className: PropTypes.string,
};

export default OutroHomepageSection;
