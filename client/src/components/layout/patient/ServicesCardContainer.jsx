import ContainerWrapper from "../wrappers/ContainerWrapper";
import ServicesCard from "./ServicesCard";
import PropTypes from "prop-types";

const ServicesCardContainer = ({ cardListData }) => {
	return (
		<ContainerWrapper>
			<div className="flex flex-wrap gap-8 py-16 rounded-xl justify-evenly bg-accent">
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
};

export default ServicesCardContainer;
