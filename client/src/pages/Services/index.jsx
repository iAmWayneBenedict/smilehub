import PlaylistSection from "@/components/layout/patient/PlaylistSection";
import Banner from "./components/Banner";
import RequestAppointment from "./components/RequestAppointment";
import SwiperSection from "@/components/layout/patient/SwiperSection";
import { useMediaQuery } from "react-responsive";
import FAQ from "@/components/layout/patient/FAQ";
import OutroHomepageSection from "@/components/layout/patient/OutroHomepageSection";

const Services = () => {
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
		<>
			<Banner />
			<RequestAppointment />
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
						"Our experienced and compassionate dental team is dedicated to providing you with the highest quality care.",
				}}
				slidesPerView={
					isSmallerDesktop ? (isTablet ? (isMobile ? "1.9" : "2.5") : "3.75") : "4.5"
				}
				type="specialists"
			/>
			<FAQ />
			{/* <OutroHomepageSection className="bg-[#011632]" /> */}
		</>
	);
};

export default Services;
