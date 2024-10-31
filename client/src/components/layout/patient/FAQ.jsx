import { useLayoutEffect } from "react";
import ContainerWrapper from "../wrappers/ContainerWrapper";
import SectionHeader from "./components/SectionHeader";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import "./style.css";

const FAQ = () => {
	const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
	useLayoutEffect(() => {
		const selectedKeysArray = [...selectedKeys];
		const accordionElements = document.querySelectorAll(`[data-accordion-item]`);
		if (accordionElements.length) {
			accordionElements.forEach((element) => {
				// * sets new default styling for all accordion item elements
				element.style.transition = "all .25s ease";
				const h2 = element.querySelector("h2");
				h2.style.borderBottom = "1px solid #E5E7EB";
				h2.style.paddingBottom = ".5rem";
				element.classList.remove(
					"group-[.is-splitted]:shadow-medium",
					"shadow-medium",
					"group-[.is-splitted]:px-4"
				);

				// *resets all accordion item elements to default styling provided by the framework
				element.classList.remove("bg-primary", "text-white");
				element.classList.add("group-[.is-splitted]:bg-content1");

				const spans = element.querySelectorAll("span");
				spans.forEach((span) => {
					span.classList.remove("text-white");
				});
			});
		}

		// * sets new styling for the selected accordion item element
		const selectedElement = document.querySelector(
			`[data-accordion-item="${selectedKeysArray[0]}"]`
		);
		const spans = document.querySelectorAll(
			`[data-accordion-item="${selectedKeysArray[0]}"] span`
		);
		if (!selectedElement) return;

		selectedElement.classList.add("bg-primary", "text-white");
		selectedElement.classList.remove(
			"group-[.is-splitted]:bg-content1",
			"shadow-medium",
			"group-[.is-splitted]:shadow-medium"
		);

		spans.forEach((span) => {
			span.classList.add("text-white");
		});
	}, [selectedKeys]);
	return (
		<ContainerWrapper className="flex flex-col items-center justify-center mt-36">
			<div className="flex items-center justify-center flex-column">
				<SectionHeader
					customUnderlineOptions={{ isLarge: true, classes: "w-full" }}
					textUnderlined="Frequently Asked Question"
					description="We use only the best quality materials on the market in order to provide the best products to our patients."
				/>
			</div>
			<div className="max-w-[50rem] w-full mt-20">
				<Accordion
					selectedKeys={selectedKeys}
					onSelectionChange={setSelectedKeys}
					variant="splitted"
					className="w-full"
					disableIndicatorAnimation={true}
				>
					<AccordionItem
						key="1"
						data-accordion-item="1"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• What dental services do you offer? "
						title="• What dental services do you offer? "
					>
						<p>We offer a comprehensive range of dental services, including:</p>
						<div className="grid grid-cols-3 mt-2">
							<li className="text-base">Extractions</li>
							<li className="text-base">Oral Prophylaxis (Teeth Cleaning)</li>
							<li className="text-base">Temporary Fillings</li>
							<li className="text-base">Pit & Fissure Sealants </li>
							<li className="text-base">Fluoride Treatments</li>
							<li className="text-base">Root Canal Therapy</li>
							<li className="text-base">Impaction/Surgery</li>
							<li className="text-base">Inlays</li>
							<li className="text-base">Stainless Steel Crowns</li>
							<li className="text-base">Retainers (with or without Pontics) </li>
							<li className="text-base">Denture Repair</li>
							<li className="text-base">Rebase/Reline</li>
							<li className="text-base">X-rays</li>
							<li className="text-base">Laminates</li>
							<li className="text-base">Jacket Crowns/Bridges</li>
							<li className="text-base">Bleaching</li>
							<li className="text-base">Orthodontics (Braces)</li>
							<li className="text-base">Myobrace/Trainer for Kids</li>
							<li className="text-base">Veneers</li>
							<li className="text-base">Dentures</li>
							<li className="text-base">Fixed Bridges</li>
							<li className="text-base">General Check-ups </li>
						</div>
					</AccordionItem>
					<AccordionItem
						key="2"
						data-accordion-item="2"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• What are your hours of operation?"
						title="• What are your hours of operation?"
					>
						<p>Our office is open during the following hours:</p>
						<li>Monday: 9:00 AM – 5:00 PM</li>
						<li>Tuesday: 9:00 AM – 5:00 PM </li>
						<li>Wednesday: 9:00 AM – 5:00 PM</li>
						<li>Thursday: 9:00 AM – 5:00 PM</li>
						<li>Friday: 9:00 AM – 5:00 PM</li>
						<li>Saturday: 9:00 AM – 5:00 PM</li>
						<li>Sunday: Closed</li>
					</AccordionItem>
					<AccordionItem
						key="3"
						data-accordion-item="3"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• Is your clinic child-friendly?"
						title="• Is your clinic child-friendly?"
					>
						Absolutely! We are committed to making dental visits comfortable and enjoyable for children of all ages. Our
						staff is trained to provide a positive, fun experience for kids. 
					</AccordionItem>
					<AccordionItem
						key="4"
						data-accordion-item="4"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• What payment methods do you accept?"
						title="• What payment methods do you accept?"
					>
						We accept the following payment options: Cash MasterCard Visa GCash 
					</AccordionItem>
					<AccordionItem
						key="5"
						data-accordion-item="5"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• How can I book an appointment?"
						title="• How can I book an appointment?"
					>
						Booking an appointment is easy! You can schedule by calling us, walking in, or booking online through our website. Simply click the "Book Appointment" button in the upper right corner of our webpage. Walk-ins are also welcome!
					</AccordionItem>
				</Accordion>
			</div>
		</ContainerWrapper>
	);
};

export default FAQ;
