import ServicesCardContainer from "@/components/layout/patient/ServicesCardContainer";
import Banner from "./components/Banner";
import { articleCardData, servicesCardData } from "./data/data";
import ArticleHomePage from "./components/ArticleHomePage";
import WhyChoose from "./components/WhyChoose";
import PlaylistSection from "@/components/layout/patient/PlaylistSection";
import SwiperSection from "@/components/layout/patient/SwiperSection";
import Articles from "@/components/layout/patient/Articles";
import FAQ from "@/components/layout/patient/FAQ";
import OutroHomepageSection from "@/components/layout/patient/OutroHomepageSection";
import { useMediaQuery } from "react-responsive";

const Home = () => {
	const article1 = articleCardData[0];
	const article2 = articleCardData[1];
	const isSmallerDesktop = useMediaQuery({
		query: "(max-width: 1280px)",
	});
	const isTablet = useMediaQuery({
		query: "(max-width: 1024px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 640px)",
	});
	return (
		<div className="overflow-x-hidden">
			<Banner />
			<ServicesCardContainer
				cardListData={servicesCardData.filter((_, index) => index < 3)}
			/>
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
			<SwiperSection
				sectionHeaderOptions={{
					firstSeriesText: "Meet our",
					textUnderlined: "specialist",
					customUnderLineOptions: {
						isLarge: false,
						classes: "w-[110%]",
					},
					description:
						"We use only the best quality materials on the market in order to provide the best products to our patients.",
				}}
				slidesPerView={
					isSmallerDesktop ? (isTablet ? (isMobile ? "1.9" : "2.5") : "3.75") : "4.5"
				}
				type="specialists"
			/>
			<SwiperSection
				className="bg-transparent"
				sectionHeaderOptions={{
					firstSeriesText: "Our",
					textUnderlined: "Happy Clients",
					customUnderlineOptions: {
						isLarge: false,
						classes: "w-[100%]",
					},
					description:
						"We use only the best quality materials on the market in order to provide the best products to our patients.",
				}}
				type="feedbacks"
				buttonTheme="dark"
				// slidesPerView="3.65"
				slidesPerView={
					isSmallerDesktop ? (isTablet ? (isMobile ? "1.25" : "1.75") : "3.1") : "3.65"
				}
			/>
			<Articles
				customUnderline={{
					customUnderLineOptions: {
						isLarge: true,
						classes: "w-[115%]",
					},
					textUnderlined: "News & Articles",
					description:
						"We use only the best quality materials on the market in order to provide the best products to our patients.",
				}}
			/>
			<FAQ />
			<OutroHomepageSection />
		</div>
	);
};

export default Home;
