import Implant1 from "@/components/icons/Implant1";
import Smile1 from "@/components/icons/Smile1";
import Teeth1 from "@/components/icons/Teeth1";
import { Image } from "@nextui-org/react";
import React from "react";
import articleImageHomPage from "../../../assets/images/article-image-homepage.png";
import articleImageHomPage2 from "../../../assets/images/article-image-homepage2.png";
import CustomUnderline from "@/components/illustrations/CustomUnderline";

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
];

export const articleCardData = [
	{
		title: (
			<React.Fragment>
				We’re{" "}
				<CustomUnderline childClassName="bottom-[5px] w-[130%]">Welcome</CustomUnderline>
				New patients and can’t wait to meet you.
			</React.Fragment>
		),
		description:
			"We use only the best quality materials on the market in order to provide the best products to our patients, So don’t worry about anything and book yourself.",
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
			"We use only the best quality materials on the market in order to provide the best products to our patients, So don’t worry about anything and book yourself.",
		isForm: false,
		image: <Image src={articleImageHomPage2} removeWrapper className="w-full h-full" />,
	},
];
