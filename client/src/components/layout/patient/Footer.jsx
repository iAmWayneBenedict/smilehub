import ContainerWrapper from "../wrappers/ContainerWrapper";
import { Divider, Link, Image } from "@nextui-org/react";
import facebook from "../../../assets/icons/facebook.svg";
import instagram from "../../../assets/icons/instagram.svg";

const Footer = () => {
	return (
		<ContainerWrapper className="mt-36">
			<div className="flex flex-col w-full">
				<div className="flex flex-wrap justify-center sm:justify-end ~gap-6/12 footer-links">
					<Link href="#" className="text-[--dark-text]">
						Home
					</Link>
					<Link href="#" className="text-[--dark-text]">
						Service
					</Link>
					<Link href="#" className="text-[--dark-text]">
						Blogs
					</Link>
					<Link href="#" className="text-[--dark-text]">
						About
					</Link>
					<Link href="#" className="text-[--dark-text]">
						Contact
					</Link>
				</div>
			</div>
			<Divider className="h-[2px] bg-[#011632] mt-10" />
			<div className="flex flex-col justify-between mt-6 sm:flex-row">
				<p>All rights reserved ® smilehub.com | Terms and conditions apply!</p>
				<div className="flex gap-3 mt-6 sm:mt-0">
					<Image src={facebook} alt="facebook" />
					<Image src={instagram} alt="instagram" />
				</div>
			</div>
			<br />
			<br />
		</ContainerWrapper>
	);
};

export default Footer;
