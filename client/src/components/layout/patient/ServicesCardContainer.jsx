import { cn } from "@/lib/utils";
import ContainerWrapper from "../wrappers/ContainerWrapper";
import ServicesCard from "./ServicesCard";
import PropTypes from "prop-types";

const ServicesCardContainer = ({ cardListData, className }) => {
	return (
		<ContainerWrapper>
			<div
				className={cn(
					"flex flex-wrap gap-8 py-16 rounded-xl justify-evenly bg-accent",
					className
				)}
			>
				{cardListData.map((data, index) => (
					<ServicesCard
						key={index}
						title={data?.title}
						icon={data?.icon}
						description={data?.description}
						href={data?.href}
					/>
				))}
			</div>
		</ContainerWrapper>
	);
};
ServicesCardContainer.propTypes = {
	cardListData: PropTypes.array,
	className: PropTypes.string,
};

export default ServicesCardContainer;
