import PlaylistSection from "@/components/layout/patient/PlaylistSection";
import SwiperSection from "@/components/layout/patient/SwiperSection";
import { useMediaQuery } from "react-responsive";
import FAQ from "@/components/layout/patient/FAQ";
import OutroHomepageSection from "@/components/layout/patient/OutroHomepageSection";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import "../style/main.css";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import Articles from "@/components/layout/patient/Articles";

export const Blogs = () => {
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
			<div id="banner-pages">
				<ContainerWrapper>
					<div className="flex flex-col items-center justify-center mt-36">
						<SectionHeader
							textUnderlined="Blogs"
							description="We use only the best quality materials on the market in order to provide the best products to our patients."
							customUnderlineOptions={{
								color: "#011632",
								isLarge: false,
								classes: "w-[105%]",
							}}
						/>
						{/* <div className="max-w-[20rem] w-full mt-10">
							<Input
								startContent={<Search className="text-[#a2a2a2]" />}
								variant="bordered"
								color="primary"
								type="text"
								placeholder="Search"
								className="w-full bg-white"
								size="lg"
								classNames={{
									label: "text-[#a2a2a2]",
								}}
							/>
						</div> */}
					</div>
				</ContainerWrapper>
				<SwiperSection
					className={"bg-transparent mt-0"}
					childClassName="py-0"
					showSectionHeader={false}
					slidesPerView={
						isSmallerDesktop ? (isTablet ? (isMobile ? "1.9" : "2.5") : "3.75") : "4.5"
					}
					type="blogs"
					buttonTheme="dark"
				/>
			</div>
			<Articles
				customUnderline={{
					customUnderLineOptions: {
						isLarge: false,
						classes: "w-[105%]",
					},
					textUnderlined: "Articles",
				}}
				showButton={false}
			/>
			<PlaylistSection />
			<FAQ />
			<OutroHomepageSection bgColor="bg-[#011632]" />
		</>
	);
};
