import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import whyChooseImage from "../../../assets/images/wh-choose-smile-for-all-your-dental-treatments.png";
import shieldDone from "../../../assets/icons/Shield Done.svg";
import { Image, Button, Link } from "@nextui-org/react";
import CustomUnderline from "@/components/illustrations/CustomUnderline";
import { useAuthTokenPersisted } from "@/store/zustand";

const WhyChoose = () => {
	const { authToken } = useAuthTokenPersisted();
	return (
		<ContainerWrapper className="mt-36">
			<div className="flex flex-col justify-center gap-10 ~p-6/14 bg-accent lg:flex-row">
				<div id="left-why-choose" className="flex items-center justify-center flex-1 ">
					<div className="w-full md:w-10/12 lg:~w-72/120">
						<Image src={whyChooseImage} removeWrapper className="w-full h-full" />
					</div>
				</div>
				<div id="right-why-choose" className="flex flex-col flex-1 gap-7">
					<h2 className="~text-3xl/55xl font-semibold leading-[1.25] capitalize">
						Why choose{" "}
						<CustomUnderline isLarge={false} childClassName="w-[130%] h-[100]">
							Smile
						</CustomUnderline>{" "}
						for all your dental treatments?
					</h2>
					<p className="~text-base/lg text-secondaryText">
						We use only the best quality materials on the market in order to provide the
						best products to our patients.
					</p>
					<div className="flex flex-col gap-4">
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="~text-base/lg text-secondaryText font-[500]">
								Top quality dental team
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="~text-base/lg text-secondaryText font-[500]">
								State of the art dental services
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="~text-base/lg text-secondaryText font-[500]">
								Discount on all dental treatment
							</p>
						</div>
						<div className="flex gap-3">
							<Image src={shieldDone} removeWrapper />
							<p className="~text-base/lg text-secondaryText font-[500]">
								Enrollment is quick and easy
							</p>
						</div>
					</div>
					<Button
						color="primary"
						className="font-semibold p-7 w-fit"
						as={Link}
						href={authToken ? "/appointment" : "/login"}
					>
						Book an appointment
					</Button>
				</div>
			</div>
		</ContainerWrapper>
	);
};

export default WhyChoose;
