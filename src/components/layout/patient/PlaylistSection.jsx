import ContainerWrapper from "../wrappers/ContainerWrapper";
import CustomUnderline from "@/components/illustrations/CustomUnderline";
import { Image, Button } from "@nextui-org/react";
import playlistSectionTempImage from "../../../assets/images/plalist-section-temp-image.png";

const PlaylistSection = () => {
	return (
		<ContainerWrapper className="flex mt-36">
			<div className="flex flex-col items-center justify-center w-full gap-10">
				<div className="max-w-[50rem] flex flex-col items-center gap-6">
					<h2 className="text-center text-[3.25rem] font-semibold leading-[1.25] capitalize">
						We’re{" "}
						<CustomUnderline isLarge={false} childClassName="bottom-[5px] w-[130%]">
							Welcome
						</CustomUnderline>
						New patients and can’t wait to meet you.
					</h2>
					<p className="text-lg text-center max-w-[30rem]">
						We use only the best quality materials on the market in order to provide the
						best products to our patients.
					</p>
				</div>
				<Image
					src={playlistSectionTempImage}
					removeWrapper
					className="w-full h-full px-24"
				/>

				<Button color="primary" className="font-semibold p-7 w-fit">
					Watch Playlist
				</Button>
			</div>
		</ContainerWrapper>
	);
};

export default PlaylistSection;
