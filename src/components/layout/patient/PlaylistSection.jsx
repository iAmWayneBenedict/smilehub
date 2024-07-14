import ContainerWrapper from "../wrappers/ContainerWrapper";
import { Image, Button } from "@nextui-org/react";
import playlistSectionTempImage from "../../../assets/images/plalist-section-temp-image.png";
import SectionHeader from "./components/SectionHeader";

const PlaylistSection = () => {
	return (
		<ContainerWrapper className="flex mt-36">
			<div className="flex flex-col items-center justify-center w-full gap-10">
				<SectionHeader
					firstSeriesText="We’re"
					lastSeriesText="New patients and can’t wait to meet you."
					textUnderlined="Welcoming"
					description="We use only the best quality materials on the market in order to provide the best products to our patients."
					customUnderlineOptions={{ isLarge: true, classes: "w-[105%]" }}
				/>
				<Image
					src={playlistSectionTempImage}
					removeWrapper
					className="w-full h-full px-0 lg:px-24"
				/>

				<Button color="primary" className="font-semibold p-7 w-fit">
					Watch Playlist
				</Button>
			</div>
		</ContainerWrapper>
	);
};

export default PlaylistSection;
