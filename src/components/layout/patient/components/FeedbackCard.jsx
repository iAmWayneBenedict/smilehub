import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import { Rating, Star } from "@smastrom/react-rating";
import PropTypes from "prop-types";

import "@smastrom/react-rating/style.css";

const FeedbackCard = ({ data }) => {
	const { image, name, description } = data;
	const includedShapesStyles = [Star].map((itemShapes) => ({
		itemShapes,
		activeFillColor: "#f59e0b",
		inactiveFillColor: "#ffedd5",
	}));
	return (
		<Card className="max-w-[500px] rounded-md p-5 my-5">
			<CardHeader className="justify-between">
				<div className="flex gap-5">
					<Avatar radius="full" size="lg" src={image} />
					<div className="flex flex-col items-start justify-center gap-1">
						<h4 className="~text-lg/xl font-semibold leading-none text-default-600">
							{name}
						</h4>
						<h5 className="tracking-tight text-small text-default-700">
							{includedShapesStyles.map((itemStyles, index) => (
								<Rating
									key={index}
									style={{ maxWidth: 120 }}
									value={5}
									itemStyles={itemStyles}
								/>
							))}
						</h5>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-3 py-0 overflow-hidden text-default-700">
				<p className="~text-base/lg">{description}</p>
			</CardBody>
		</Card>
	);
};
FeedbackCard.propTypes = {
	data: PropTypes.object,
};

export default FeedbackCard;
