import Implant1 from "@/components/icons/Implant1";
import Smile1 from "@/components/icons/Smile1";
import Teeth1 from "@/components/icons/Teeth1";
import { Image } from "@nextui-org/react";
import React from "react";
import articleImageHomPage from "../../../assets/images/article-image-homepage.png";
import articleImageHomPage2 from "../../../assets/images/article-image-homepage2.png";
import CustomUnderline from "@/components/illustrations/CustomUnderline";
import Tooth1 from "@/components/icons/Tooth1";
import Dental1 from "@/components/icons/Dental1";
import DentalCare from "@/components/icons/DentalCare";

export const servicesCardData = [
	{
		icon: <Teeth1 />,
		title: "Root Canal Treatment",
		description:
			"Root canal treatment (endodontics) is a dental procedure used to treat infection at the centre of a tooth.",
		href: "#", //! Add a link here
	},
	{
		icon: <Smile1 />,
		title: "Cosmetic Dentist",
		description:
			"Cosmetic dentistry is the branch of dentistry that focuses on improving the appearance of your smile.",
		href: "#", //! Add a link here
	},
	{
		icon: <Implant1 />,
		title: "Dental Implants",
		description:
			"A dental implant is an artificial tooth root that’s placed into your jaw to hold a prosthetic tooth or bridge.",
		href: "#", //! Add a link here
	},
	{
		icon: <Tooth1 />,
		title: "Teeth Whitening",
		description:
			"It's never been easier to brighten your smile at home. There are all kinds of products you can try.",
		href: "#", //! Add a link here
	},
	{
		icon: <Dental1 />,
		title: "Emergency Dentistry",
		description:
			"In general, any dental problem that needs immediate treatment to stop bleeding, alleviate severe pain.",
		href: "#", //! Add a link here
	},
	{
		icon: <DentalCare />,
		title: "Prevention",
		description:
			"Preventive dentistry is dental care that helps maintain good oral health. a combination of regular dental.",
		href: "#", //! Add a link here
	},
];

export const articleCardData = [
	{
		title: (
			<React.Fragment>
				We’re{" "}
				<CustomUnderline childClassName="bottom-[5px] w-[130%]">Welcoming</CustomUnderline>
				New patients and can’t wait to meet you.
			</React.Fragment>
		),
		description:
			"We use only the best quality materials on the market in order to provide the best products to our patients, so don’t worry about anything and book yourself.",
		isForm: true,
		image: <Image src={articleImageHomPage} removeWrapper className="w-full h-full" />,
	},
	{
		title: (
			<React.Fragment>
				Leave your worries at the door and enjoy a healthier, more{" "}
				<CustomUnderline childClassName="bottom-[5px] w-[130%]">
					Precise Smile
				</CustomUnderline>
			</React.Fragment>
		),
		description:
			"We use only the best quality materials on the market in order to provide the best products to our patients, so don’t worry about anything and book yourself.",
		isForm: false,
		image: <Image src={articleImageHomPage2} removeWrapper className="w-full h-full" />,
	},
];
