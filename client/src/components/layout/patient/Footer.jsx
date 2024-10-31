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
						Services
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
			<div className="flex flex-col items-center justify-between mt-6 sm:flex-row">
				<div className={"flex flex-col sm:flex-row gap-1 items-center"}>
					<p>All rights reserved ® smilehub.com | </p>
					<Link color={"foreground"} href="/terms-and-privacy-policy">
						Terms and conditions apply!
					</Link>
				</div>
				<div className="flex gap-3 mt-6 sm:mt-0">
					<Image src={facebook} className="cursor-pointer" alt="facebook" onClick={() => window.open("https://web.facebook.com/BajarDentalClinic?mibextid=ZbWKwL&_rdc=1&_rdr", "_blank")}/>
					<Image src={instagram} className="cursor-pointer" alt="instagram" onClick={() => window.open("https://www.instagram.com/bajar_dentalclinic/?igsh=azlub243NjI0MjJm#", "_blank")} />
				</div>
			</div>
			<br />
			<br />
		</ContainerWrapper>
	);
};

export default Footer;
