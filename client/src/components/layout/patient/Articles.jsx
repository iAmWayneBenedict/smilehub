import ContainerWrapper from "../wrappers/ContainerWrapper";
import SectionHeader from "./components/SectionHeader";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import ArticleCard from "./components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Articles = ({ align = "left", showButton = true, customUnderline }) => {
	// Fetching from Api
	const fetchNewsData = async () => {
		const response = await fetch("https://newsapi.org/v2/everything?q=dental&apiKey=47ec10196594404f887e518b2650de3b");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	// Fetch using tanstack query
	const {
		data, isLoading
	} = useQuery({
		queryKey: ["all-new"],
		queryFn: fetchNewsData,
	});

	// Map Slicer
    const [visibleCount, setVisibleCount] = useState(12);
    const [showingAll, setShowingAll] = useState(false);

    const toggleVisibility = () => {
        if (showingAll) {
            setVisibleCount(12);
        } else {
            setVisibleCount(50);
        }
        setShowingAll(!showingAll);
    };

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
				</div>
				<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
					{isLoading ?
						"Please wait..."
					:
						data?.articles.slice(0, visibleCount).map((item) => (
                	    <ArticleCard key={item.urlToImage} data={item} />
                	))}
				</div>
			</div>
			<div className="flex items-center justify-center mt-16">
				<Button color="primary" className="font-semibold p-7 w-fit" onClick={toggleVisibility}>
					{showingAll ? "See Less" : "Check out more"}
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
