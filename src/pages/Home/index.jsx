import ServicesCardContainer from "@/components/layout/patient/ServicesCardContainer";
import Banner from "./components/Banner";
import { articleCardData, servicesCardData } from "./data/data";
import ArticleHomePage from "./components/ArticleHomePage";
import WhyChoose from "./components/WhyChoose";
import PlaylistSection from "@/components/layout/patient/PlaylistSection";

const Home = () => {
	const article1 = articleCardData[0];
	const article2 = articleCardData[1];
	return (
		<div>
			<Banner />
			<ServicesCardContainer cardListData={servicesCardData} />
			<ArticleHomePage
				title={article1?.title}
				description={article1?.description}
				isForm={article1?.isForm}
				image={article1?.image}
			/>
			<WhyChoose />
			<ArticleHomePage
				title={article2?.title}
				description={article2?.description}
				isForm={article2?.isForm}
				image={article2?.image}
			/>
			<PlaylistSection />
			<br />
			<br />
		</div>
	);
};

export default Home;
