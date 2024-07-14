import ContainerWrapper from "../wrappers/ContainerWrapper";
import SectionHeader from "./components/SectionHeader";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import ArticleCard from "./components/ArticleCard";

const Articles = ({ align = "left" }) => {
	return (
		<ContainerWrapper className="mt-36">
			<div className="flex flex-col">
				<div
					id="article-section-header"
					className="flex flex-col items-start justify-between sm:items-center sm:flex-row"
				>
					<div id="article-section-header-left">
						<SectionHeader
							elementClasses={{
								parentClasses: align === "left" ? "items-start" : "",
								childClasses: align === "left" ? "text-left" : "",
							}}
							textUnderlined="News & Articles"
							description="We use only the best quality materials on the market in order to provide the best products to our patients."
						/>
					</div>
					<div id="article-section-header-right" className="mt-5 sm:mt-0">
						<Button color="primary" className="font-semibold p-7 w-fit">
							View All
						</Button>
					</div>
				</div>
				<div className="flex flex-wrap gap-6 mt-16 justify-evenly xl:justify-between">
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
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
};

export default Articles;
