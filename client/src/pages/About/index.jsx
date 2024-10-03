import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import "../style/main.css";
import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import { Image } from "@nextui-org/react";
import aboutUsImg from "../../assets/images/About us main img.png";
import SpecialistRow from "./components/SpecialistRow";
import { Divider } from "@nextui-org/react";
import drBrent from "../../assets/images/Dr. Brent.png";
import drVashi from "../../assets/images/Dr. Vashi.png";
import drConnors from "../../assets/images/Dr. Connors.png";
import latestTech from "../../assets/images/Latest Tech.png";
import ServicesCardContainer from "@/components/layout/patient/ServicesCardContainer";
import { servicesCardData } from "../Home/data/data";
import PlaylistSection from "@/components/layout/patient/PlaylistSection";
import oralImg from "../../assets/images/oral.png";

const About = () => {
	return (
		<>
			<div id="banner-pages">
				<ContainerWrapper>
					<div className="flex items-center justify-center w-full mt-36">
						<SectionHeader
							textUnderlined="About Us"
							customUnderlineOptions={{
								isLarge: false,
								classes: "w-[105%]",
							}}
						/>
					</div>
					<div className="flex flex-col gap-24 mx-12 mt-24 lg:flex-row">
						<div style={{ flex: 5 }} className="flex flex-col order-2 gap-6 lg:order-1">
							<h2 className="text-5xl font-bold">Our Mission</h2>
							<p style={{ lineHeight: 1.8 }} className="~text-base/xl font-normal">
								At Bajar Dental Clinic, people come first. We help each of our
								patients to achieve optimal wellness and health by using a whole
								body approach to oral health. This means not just focusing on
								cavities, but focusing on; cranio-facial development, bite and joint
								balance, oral flora, proper muscle balance/function, and
								bio-compatibility of dental materials. Great care and planning
								ensure that everything we do helps promote overall health and well
								being.
							</p>
							<h5 className="text-3xl font-semibold capitalize">
								More than anything else we love creating happy, healthy smiles.
							</h5>
							<p style={{ lineHeight: 1.8 }} className="~text-base/xl font-normal">
								We work hard to stay up to date with the most advanced techniques
								and technologies to ensure that our patients receive the best care
								possible. Our office allow for guided surgical and endodontic
								protocols. This enables these procedures to performed digitally
								before they are performed surgically to ensure optimal results. 3D
								imaging also is utilized for the analysis of airway growth and
								development. We also use the best 3D optical scanner for all of our
								dental restoration and Invisalign impressions. Dr Williams is a
								strong advocate for using microsurgical techniques, this means less
								discomfort and faster healing times.
							</p>
						</div>
						<div style={{ flex: 3 }} className="order-1 lg:order-2">
							<Image src={aboutUsImg} removeWrapper alt="About Us" />
						</div>
					</div>
				</ContainerWrapper>
			</div>
			<ContainerWrapper>
				<div>
					<div className="flex items-center justify-center w-full mt-36">
						<SectionHeader
							textUnderlined="Specialists"
							firstSeriesText="Meet Our "
							description="We use only the best quality materials on the market in order to provide the best products to our patients."
							customUnderlineOptions={{
								isLarge: true,
								classes: "w-[105%]",
							}}
						/>
					</div>
					<div className="mt-24">
						<SpecialistRow
							img={drBrent}
							name="DR. Brent"
							specialty="( Specility in General & Cosmetic Service )"
							description="Dr. Brent provides general and cosmetic dentistry services at Northern Heights
					Dental in Flagstaff, Arizona. He has extensive experience in general and
					cosmetic dentistry, including full mouth restoration, dental veneers, crowns,
					bridges, dental implants, wisdom teeth extractions, Invisalign, and dentures.
					Dr. Brent and his younger sister grew up in Massachusetts with a mother who
					worked as a hygienist and a grandfather who was a general dentist."
						/>
						<Divider className="~my-12/20" />
						<SpecialistRow
							img={drVashi}
							name="DR. Ashish J. Vashi"
							specialty="( Specility in implant dentistry )"
							description="Dr. Ashish J. Vashi has been practicing general, cosmetic and implant dentistry in California for over 18 years. He believes in giving the highest quality dentistry in a comfortable, caring environment. He strives to get to know his patients, not just their teeth.including full mouth restoration, dental veneers, crowns, bridges, dental implants, wisdom teeth extractions, Invisalign, and dentures."
						/>
						<Divider className="~my-12/20" />
						<SpecialistRow
							img={drConnors}
							name="Dr. James Connors"
							specialty="( Specility in Oral Surgeon )"
							description="When it comes to oral surgeons, few can compare to the modern-day legend that is Dr. James Connors. As our oral and maxillofacial surgery specialist, Dr. Connors will brighten your day with his seasoned expertise, welcoming conversations, and – of course – his signature rotation of fun bowties. Dr. Connors and his younger sister grew up in Massachusetts with a mother who worked as a hygienist and a grandfather who was a general dentist."
						/>
					</div>
				</div>
				<div>
					<div className="flex items-center justify-center w-full mt-36">
						<SectionHeader
							firstSeriesText="Latest"
							textUnderlined="Technology"
							description="Thanks to major technological advancements, dentistry allows treating the most complex cases with less time and more efficiency."
							customUnderlineOptions={{
								isLarge: true,
								classes: "w-[105%]",
							}}
						/>
					</div>
					<div className="flex flex-col gap-12 mt-24 lg:flex-row">
						<div style={{ flex: 1 }}>
							<Image
								src={latestTech}
								className="w-full"
								removeWrapper
								alt="About Us"
							/>
						</div>
						<div style={{ flex: 2 }} className="flex flex-col gap-6">
							<h3 className="~text-xl/3xl font-medium">
								The Future of Dentistry is Digital:
							</h3>
							<p className="~text-base/lg">
								Dentists today already utilize software to capture insights in
								clinical decision-making. These practices will continue to develop
								to integrate AI algorithms that enable clinicians to find the best
								modalities for their patients.
							</p>
							<p className="~text-base/lg">
								In the 21st century, digital radiographs and 3D imaging have become
								the standard of dental care. Using an intraoral scanner with
								digitized data for 3D dental impressions (vs. polyvinyl siloxane and
								rubber base impressions) for a dental crown is now commonplace.
							</p>
							<p className="~text-base/lg">
								Artificial intelligence is laying the groundwork for the future of
								the dental industry. Dental robots can now perform functions such as
								filling cavities and cleaning or extracting teeth
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center gap-12 mt-24">
						<h3 className="~text-xl/3xl text-center font-medium">
							Discover the Structure of Tooth
						</h3>
						<Image src={oralImg} />
					</div>
				</div>
				<div className="mt-24">
					<ServicesCardContainer
						className="bg-[#011632]"
						cardListData={servicesCardData.filter((_, index) => index < 3)}
					/>
				</div>
				<div className="mt-24">
					<PlaylistSection />
				</div>
			</ContainerWrapper>
		</>
	);
};

export default About;
