import { Card, CardFooter, Image } from "@nextui-org/react";
import "./styles.css";
import PropTypes from "prop-types";

const SpecialistCard = ({ data }) => {
	return (
		<Card radius="lg" className="border-none w-fit">
			<Image
				removeWrapper
				alt="Woman listing to music"
				className="object-cover ~w-64/96"
				src={data?.image}
			/>
			<div className="flex justify-center">
				<CardFooter
					id="specialist-card-detail-container"
					className="justify-between overflow-hidden ~py-2/3 ~px-3/5 absolute before:rounded-xl rounded-large bottom-3 w-[93%] z-10"
				>
					<div className="flex flex-col w-full">
						<h4 className="~text-base/xl text-white/80">{data?.name}</h4>
						<p className="~text-xs/base text-white/60">{data?.position}</p>
					</div>
				</CardFooter>
			</div>
		</Card>
	);
};
SpecialistCard.propTypes = {
	data: PropTypes.any,
};

export default SpecialistCard;
