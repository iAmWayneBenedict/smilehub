import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import whyChooseImage from "../../../assets/images/wh-choose-smile-for-all-your-dental-treatments.png";
import shieldDone from "../../../assets/icons/Shield Done.svg";
import { Image, Button } from "@nextui-org/react";
import CustomUnderline from "@/components/illustrations/CustomUnderline";

const WhyChoose = () => {
	return (
		<ContainerWrapper className="mt-36">
			<div className="flex justify-center gap-10 p-14 bg-accent">
				<div id="left-why-choose" className="flex items-center justify-center flex-1 ">
					<div className="w-[30rem]">
						<Image src={whyChooseImage} removeWrapper className="w-full h-full" />
					</div>
				</div>
				<div id="right-why-choose" className="flex flex-col flex-1 gap-7">
					<h2 className="text-[3.25rem] font-semibold leading-[1.25] capitalize">
						Why choose{" "}
						<CustomUnderline isLarge={false} childClassName="w-[130%] h-[100]">
							Smile
						</CustomUnderline>{" "}
						for all your dental treatments?
					</h2>
					<p className="text-lg text-[--secondary-text-color]">
						We use only the best quality materials on the market in order to provide the
						best products to our patients.
					</p>
					<div className="flex flex-col gap-4">
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="text-lg text-[--secondary-text-color] font-[500]">
								Top quality dental team
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="text-lg text-[--secondary-text-color] font-[500]">
								State of the art dental services
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="text-lg text-[--secondary-text-color] font-[500]">
								Discount on all dental treatment
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="text-lg text-[--secondary-text-color] font-[500]">
								Enrollment is quick and easy
							</p>
						</div>
					</div>
					<Button color="primary" className="font-semibold p-7 w-fit">
						Book an appointment
					</Button>
				</div>
			</div>
		</ContainerWrapper>
	);
};

export default WhyChoose;
