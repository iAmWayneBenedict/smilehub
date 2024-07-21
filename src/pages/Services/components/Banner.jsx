import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import ServicesCard from "@/components/layout/patient/ServicesCard";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import { servicesCardData } from "@/pages/Home/data/data";
import "../../style/main.css";

const Banner = () => {
	return (
		<div id="banner-pages">
			<ContainerWrapper>
				<div className="flex flex-col items-center justify-center mt-36">
					<SectionHeader
						textUnderlined="Services"
						description="We use only the best quality materials on the market in order to provide the best products to our patients."
						customUnderlineOptions={{
							color: "#011632",
							isLarge: false,
							classes: "w-[105%]",
						}}
					/>
					<div className="w-full mt-24">
						<div className="flex flex-wrap gap-8 py-16 rounded-xl justify-evenly">
							{servicesCardData.map((data, index) => (
								<ServicesCard
									key={index}
									title={data?.title}
									icon={data?.icon}
									description={data?.description}
									href={data?.href}
								/>
							))}
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</div>
	);
};

export default Banner;
