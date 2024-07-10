import Calling from "@/components/icons/Calling";
import CustomUnderline from "@/components/illustrations/CustomUnderline";
import LandingPageIllustration from "@/components/illustrations/LandingPageIllustration";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import { Button } from "@nextui-org/react";
import "./styles.css";

const Banner = () => {
	return (
		<ContainerWrapper className="relative flex mt-12">
			<div id="left-banner" className="flex flex-col flex-1 mt-10 gap-9">
				<div>
					<h1 className="text-[4rem] font-medium inline leading-tight capitalize">
						Get ready for your best ever{" "}
						<span className="relative">
							Dental Experience!{" "}
							<div className="absolute bottom-0 left-0">
								<CustomUnderline />
							</div>
						</span>
					</h1>
				</div>
				<p className="max-w-[35rem] text-lg">
					We use only the best quality materials on the market in order to provide the
					best products to our patients, So don’t worry about anything and book yourself.
				</p>
				<div className="flex gap-6">
					<Button color="primary" className="p-7">
						Book an appointment
					</Button>
					<div className="flex gap-4">
						<div id="calling-border-icon" className="relative p-2 w-fit h-fit z-[1]">
							<div id="calling-bg-icon" className="p-2 rounded-lg w-fit h-fit">
								<Calling />
							</div>
						</div>
						<div className="flex flex-col justify-center">
							<p className="font-semibold text-primary">Dental 24H Emergency</p>
							<p className="font-semibold">0900-786-010</p>
						</div>
					</div>
				</div>
			</div>
			<div
				id="right-banner"
				className="absolute z-[-1] opacity-40 lg:opacity-100 top-0 flex-1 -translate-x-1/2 lg:translate-x-0 left-1/2 lg:left-0 lg:relative"
			>
				<LandingPageIllustration />
			</div>
		</ContainerWrapper>
	);
};

export default Banner;
