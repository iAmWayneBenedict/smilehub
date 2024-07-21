import ContainerWrapper from "../wrappers/ContainerWrapper";
import SectionHeader from "./components/SectionHeader";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import ArticleCard from "./components/ArticleCard";
import articleImg1 from "../../../assets/images/article img 1.png";
import articleImg2 from "../../../assets/images/article img 2.png";
import articleImg3 from "../../../assets/images/article img 3.png";
import articleImg4 from "../../../assets/images/article img 4.png";
import articleImg5 from "../../../assets/images/article img 5.png";
import articleImg6 from "../../../assets/images/article img 6.png";
import articleImg7 from "../../../assets/images/article img 7.png";
import articleImg8 from "../../../assets/images/article img 8.png";

const Articles = ({ align = "left", showButton = true, customUnderline }) => {
	const tempData = [
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
		{
			image: articleImg6,
		},
		{
			image: articleImg7,
		},
		{
			image: articleImg8,
		},
	];
	return (
		<ContainerWrapper className="mt-36">
			<div className="flex flex-col">
				<div
					id="article-section-header"
					className="flex flex-col items-start justify-between sm:items-center sm:flex-row"
				>
					<div id="article-section-header-left">
						<SectionHeader
							customUnderlineOptions={customUnderline?.customUnderlineOptions}
							elementClasses={{
								parentClasses: align === "left" ? "items-start" : "",
								childClasses: align === "left" ? "text-left" : "",
							}}
							textUnderlined={customUnderline?.textUnderlined}
							description={customUnderline?.description}
						/>
					</div>
					{showButton && (
						<div id="article-section-header-right" className="mt-5 sm:mt-0">
							<Button color="primary" className="font-semibold p-7 w-fit">
								View All
							</Button>
						</div>
					)}
				</div>
				<div className="flex flex-wrap ~gap-2/6 mt-16 justify-evenly xl:justify-between">
					{tempData.map((item) => {
						return <ArticleCard key={item.image} image={item.image} />;
					})}
				</div>
			</div>
			<div className="flex items-center justify-center mt-16">
				<Button color="primary" className="font-semibold p-7 w-fit">
					Check out more
				</Button>
			</div>
		</ContainerWrapper>
	);
};
Articles.propTypes = {
	align: PropTypes.string,
	customUnderline: PropTypes.any,
	showButton: PropTypes.bool,
};

export default Articles;
