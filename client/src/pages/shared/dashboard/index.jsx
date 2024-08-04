import SplineChart from "@/components/layout/shared/chart/spline";
import { Select, SelectItem, Button, Tabs, Tab, Divider } from "@nextui-org/react";
import TableDashboard from "./Table";
import { useState } from "react";
import { Ellipsis, Plus, ChevronDown, Trash, UserRound, Pencil, Triangle } from "lucide-react";
import DonutChart from "@/components/layout/shared/chart/donut";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const AdminDashboard = () => {
	const [selected, setSelected] = useState("new-appointments");

	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">Dashboard</h3>
				<div className="flex gap-3">
					<div style={{ flex: 1 }} className="flex flex-col gap-5">
						{/* top chart */}
						<div style={{ flex: 1 }} className="p-4 bg-white rounded-lg shadow-md">
							<div className="flex justify-between">
								<h3 className="text-xl font-medium" style={{ flex: 1 }}>
									Patient Visit
								</h3>
								<div
									className="flex items-center justify-end gap-3"
									style={{ flex: 1 }}
								>
									<span className="text-lightText">Sort by</span>
									<div className="w-full max-w-36">
										<Select
											variant="bordered"
											selectedKeys={["Yearly"]}
											color="primary"
											className="bg-white "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-full",
											}}
										>
											<SelectItem key={"Monthly"} value={"Monthly"}>
												Monthly
											</SelectItem>
											<SelectItem key={"Yearly"} selected value={"Yearly"}>
												Yearly
											</SelectItem>
										</Select>
									</div>
								</div>
							</div>
							<SplineChart />
						</div>

						{/* bottom table */}
						<div style={{ flex: 1 }} className="p-4 bg-white rounded-lg shadow-md">
							<Tabs
								selectedKey={selected}
								onSelectionChange={setSelected}
								variant={"underlined"}
								aria-label="Tabs variants"
								color="primary"
								classNames={{
									tabContent:
										"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold",
								}}
							>
								<Tab key="new-appointments" title="NEW APPOINTMENTS">
									<TableDashboard />
								</Tab>
								<Tab key="completed-appointments" title="COMPLETED APPOINTMENTS">
									<TableDashboard />
								</Tab>
							</Tabs>
						</div>
					</div>
					{/* right side */}
					<div className="flex flex-col gap-5 w-120">
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md">
							<div className="flex justify-between">
								<h2 className="text-2xl font-semibold">Total Patients</h2>
								<Button isIconOnly variant="light">
									<Ellipsis />
								</Button>
							</div>
							<div className="flex items-center pl-5 mt-2">
								<div style={{ flex: 2 }}>
									<h1 className="text-6xl font-bold">99</h1>
								</div>
								<div style={{ flex: 5 }} className="h-48">
									<DonutChart />
								</div>
							</div>
						</div>
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold">Upcoming schedule</h2>
								<Button
									variant="light"
									disableRipple
									className="flex items-center gap-3 text-primary data-[hover=true]:opacity-70 data-[hover=true]:bg-transparent"
								>
									<span className="text-base font-semibold">New Appointment</span>
									<span className="p-1 rounded-md border-1">
										<Plus />
									</span>
								</Button>
							</div>
							<div className="flex flex-col">
								<div data-per-time-container className="relative">
									<div className="absolute h-full mt-2 w-[1px] bg-[#cbd5e1] top-0 left-[4.5rem]" />
									<div className="absolute -bottom-2 left-[4rem] h-4 w-4 rounded-full bg-black" />
									<div data-per-time-indicator className="relative">
										<div className="absolute top-1 left-[4rem] h-4 w-4 rounded-full bg-black" />
										<h6>8 : 00</h6>
									</div>
									<AccordionSchedule />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;

const data = [
	{
		time: "4:00 pm - 4:30 pm",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
	{
		time: "4:30 pm - 5:00 pm",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
	{
		time: "5:00 pm - 5:30 pm",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
];

// AccordionSchedule component
const AccordionSchedule = () => {
	const [selectedChapter, setSelectedChapter] = useState("item-0");
	useEffect(() => {
		const timer = setInterval(() => {
			const index = data.findIndex((item) => item.time.includes("pm"));
			const newIndex = index + 1;
			if (newIndex < data.length) {
				setSelectedChapter(`item-${newIndex}`);
			} else {
				setSelectedChapter("item-0");
			}
		}, [60000]);
	}, []);
	return (
		<div data-per-time-content>
			<div className="ml-24">
				<Accordion
					type="single"
					value={selectedChapter}
					onValueChange={setSelectedChapter}
					collapsible
					className="flex flex-col gap-2"
				>
					{/* <AccordionItem
						value={`item-${0}`}
						aria-label="0"
						className={cn(
							"border-0",
							selectedChapter === "item-0" ? "opacity-100" : "opacity-50"
						)}
					>
						<AccordionTrigger
							showChevron={false}
							className={cn(
								"px-3 py-1 rounded-xl hover:no-underline",
								selectedChapter === "item-0" ? "border" : "border-0"
							)}
						>
							<div className="flex items-center gap-10">
								<div className="flex items-center gap-5">
									<div className="h-3 w-3 bg-[#bdbdbd] rounded-full" />
									<h6 className="font-bold">8:00</h6>
								</div>
								<div>
									<h6
										className={
											selectedChapter === "item-0"
												? "no-underline"
												: "line-through"
										}
									>
										Bolaji Abdulraheem
									</h6>
								</div>
							</div>
							{selectedChapter == "item-0" && (
								<div className="flex items-center gap-3">
									<small className="text-gray-400">Upcoming</small>
									<div className="p-1 border rounded-lg">
										<ChevronDown strokeWidth={3} className="text-[#2F80ED]" />
									</div>
								</div>
							)}
						</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem> */}
					{data &&
						data.map((item, index) => {
							let firstTime = item.time.split(" - ")[0];
							firstTime = firstTime.includes("am")
								? firstTime.replace(" am", "")
								: firstTime.replace(" pm", "");
							return (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									aria-label="index"
									className="border-0"
								>
									<AccordionTrigger
										showChevron={false}
										className="px-3 py-1 border rounded-xl hover:no-underline"
									>
										<div className="flex items-center gap-10">
											<div className="flex items-center gap-5">
												<div className="h-3 w-3 bg-[#bdbdbd] rounded-full" />
												<h6 className="font-bold">{firstTime}</h6>
											</div>
											<div>
												<h6>{item.patient_name}</h6>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<small className="text-gray-400">Upcoming</small>
											<div className="p-1 border rounded-lg">
												<ChevronDown
													strokeWidth={3}
													className="text-[#2F80ED]"
												/>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="flex flex-col mt-3 border rounded-xl">
											<div className="flex flex-col gap-2 p-3">
												<div className="flex items-center gap-2">
													<h5
														style={{ flex: 1 }}
														className="~text-base font-semibold"
													>
														Patient
													</h5>
													<h6 style={{ flex: 3 }} className="~text-base">
														{item.patient_name}
													</h6>
												</div>
												<div className="flex items-center gap-2">
													<h5
														style={{ flex: 1 }}
														className="~text-base font-semibold"
													>
														Time
													</h5>
													<h6 style={{ flex: 3 }} className="~text-base">
														{item.time}
													</h6>
												</div>
												<div className="flex items-center gap-2">
													<h5
														style={{ flex: 1 }}
														className="~text-base font-semibold"
													>
														Purpose
													</h5>
													<h6 style={{ flex: 3 }} className="~text-base">
														{item.purpose}
													</h6>
												</div>
											</div>
											<Divider />
											<div className="flex justify-between p-2">
												<div className="flex gap-2">
													<Button
														isIconOnly
														variant="light"
														className="border"
													>
														<Trash size={20} className="text-red-500" />
													</Button>
													<Button
														isIconOnly
														variant="light"
														className="border"
													>
														<UserRound
															size={20}
															className="text-[#2F80ED]"
														/>
													</Button>
													<Button
														isIconOnly
														variant="light"
														className="border"
													>
														<Pencil
															size={20}
															className="text-[#2F80ED]"
														/>
													</Button>
												</div>
												<div>
													<Button color="primary">
														Begin Appointment
													</Button>
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}

					{/* <AccordionItem value={`item-${2}`} aria-label="2" className="border-0">
						<AccordionTrigger
							showChevron={false}
							className="relative px-3 py-1 border rounded-xl hover:no-underline"
						>
							<div
								data-accordion-item-arrow
								className="absolute -left-[1rem] -translate-y-1/2 top-1/2"
							>
								<Triangle
									fill="#2f80ed"
									color="#2f80ed"
									className="transform rotate-90"
									size={10}
								/>
							</div>
							<div className="flex items-center gap-10">
								<div className="flex items-center gap-5">
									<div className="h-3 w-3 bg-[#27ae60] rounded-full" />
									<h6 className="font-bold">8:00</h6>
								</div>
								<div>
									<h6>Bolaji Abdulraheem</h6>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<small className="text-gray-400">Upcoming</small>
								<div className="p-1 border rounded-lg">
									<ChevronDown strokeWidth={3} className="text-[#2F80ED]" />
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col mt-3 border rounded-xl">
								<div className="flex flex-col gap-2 p-3">
									<div className="flex items-center gap-2">
										<h5
											style={{ flex: 1 }}
											className="~text-base font-semibold"
										>
											Patient
										</h5>
										<h6 style={{ flex: 3 }} className="~text-base">
											Bolaji Abdulraheem
										</h6>
									</div>
									<div className="flex items-center gap-2">
										<h5
											style={{ flex: 1 }}
											className="~text-base font-semibold"
										>
											Time
										</h5>
										<h6 style={{ flex: 3 }} className="~text-base">
											8:30 - 9:00
										</h6>
									</div>
									<div className="flex items-center gap-2">
										<h5
											style={{ flex: 1 }}
											className="~text-base font-semibold"
										>
											Purpose
										</h5>
										<h6 style={{ flex: 3 }} className="~text-base">
											Palatal Expander
										</h6>
									</div>
								</div>
								<Divider />
								<div className="flex justify-between p-2">
									<div className="flex gap-2">
										<Button isIconOnly variant="light" className="border">
											<Trash size={20} className="text-red-500" />
										</Button>
										<Button isIconOnly variant="light" className="border">
											<UserRound size={20} className="text-[#2F80ED]" />
										</Button>
										<Button isIconOnly variant="light" className="border">
											<Pencil size={20} className="text-[#2F80ED]" />
										</Button>
									</div>
									<div>
										<Button color="primary">Begin Appointment</Button>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem> */}
				</Accordion>
			</div>
		</div>
	);
};
