import { cn } from "@/lib/utils";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import PropTypes from "prop-types";
import "./styles.css";

const ArticleCard = ({ image, classNames, alt = false }) => {
	return (
		<Card className={cn("px-1 py-3 shadow-none w-fit bg-accent", classNames?.parentClassName)}>
			<CardHeader className="flex-col items-start px-4 pt-2 pb-0">
				<div
					id={alt ? "" : "article-card-img-container"}
					className={cn("w-screen", classNames?.imgParentClassName)}
				>
					<Image
						removeWrapper
						alt="Card background"
						className="object-cover w-full rounded-xl"
						src={image}
					/>
				</div>
			</CardHeader>
			<CardBody className="flex flex-col gap-3 py-2 mt-3 overflow-visible">
				<div className="flex items-center justify-between w-full">
					<div className="p-2 px-6 text-white rounded-md bg-primary w-fit">Self Care</div>
					{alt && <small className="font-bold text-right">~ Anita Jackson</small>}
				</div>
				<h4 className="font-bold text-large">Care of your teeth</h4>
				<p>Lorem ipsum dolor sit amet consectetur.</p>
				{!alt && <small className="font-bold text-right">~ Anita Jackson</small>}
			</CardBody>
		</Card>
	);
};
ArticleCard.propTypes = {
	classNames: PropTypes.obj,
	image: PropTypes.string,
	alt: PropTypes.bool,
};
export default ArticleCard;
