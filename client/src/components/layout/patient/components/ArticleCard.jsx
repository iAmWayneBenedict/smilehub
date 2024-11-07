import { cn, truncateText } from "@/lib/utils";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import PropTypes from "prop-types";
import "./styles.css";

const ArticleCard = ({ data, kind, classNames, alt = false }) => {
	return (
		<Card
			className={cn(
				"px-1 py-3 shadow-none w-full sm:w-fit bg-accent",
				classNames?.parentClassName
			)}
		>
			<CardHeader className="flex-col items-start px-4 pt-2 pb-0">
				<div
					id={alt ? "" : "article-card-img-container"}
					className={cn("grow w-full", classNames?.imgParentClassName)}
				>
					<Image
						removeWrapper
						alt="Card background"
						className="object-cover w-full rounded-xl"
						src={data?.urlToImage}
					/>
				</div>
			</CardHeader>
			<CardBody className="flex flex-col gap-3 py-2 mt-3 overflow-visible">
				<h4 className="font-bold text-large">
					{kind === "slider-article" ? truncateText(data?.title, 35) : data?.title}
				</h4>
				{kind === "slider-article"
					? truncateText(data?.description, 85)
					: data?.description}
				{!alt && (
					<small className="font-bold text-right">
						~ {data?.author || "No author available"}
					</small>
				)}
			</CardBody>
			<div className="w-full px-2">
				<button
					className="w-full p-2 px-6 text-center text-white rounded-md bg-primary hover:opacity-90"
					onClick={() => window.open(data?.url, "_blank")}
				>
					Read More
				</button>
			</div>
		</Card>
	);
};
ArticleCard.propTypes = {
	classNames: PropTypes.object,
	image: PropTypes.string,
	alt: PropTypes.bool,
};
export default ArticleCard;
