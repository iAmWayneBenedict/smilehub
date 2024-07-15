import { useEffect } from "react";
import ContainerWrapper from "../wrappers/ContainerWrapper";
import SectionHeader from "./components/SectionHeader";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import "./style.css";

const FAQ = () => {
	const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
	useEffect(() => {
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
						aria-label="• Can I see who reads my email campaigns?"
						title="• Can I see who reads my email campaigns?"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</AccordionItem>
					<AccordionItem
						key="2"
						data-accordion-item="2"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• Do you offer non-profit discounts?"
						title="• Do you offer non-profit discounts?"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</AccordionItem>
					<AccordionItem
						key="3"
						data-accordion-item="3"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• Can I see who reads my email campaigns?"
						title="• Can I see who reads my email campaigns?"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</AccordionItem>
					<AccordionItem
						key="4"
						data-accordion-item="4"
						className="~px-6/10 ~text-base/lg pt-2 ~pb-3/7"
						indicator={({ isOpen }) => (isOpen ? <CircleMinus /> : <CirclePlus />)}
						aria-label="• Can I see who reads my email campaigns?"
						title="• Can I see who reads my email campaigns?"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</AccordionItem>
				</Accordion>
			</div>
		</ContainerWrapper>
	);
};

export default FAQ;
