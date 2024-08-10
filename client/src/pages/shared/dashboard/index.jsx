import SplineChart from "@/components/layout/shared/chart/spline";
import { Select, SelectItem, Button, Tabs, Tab, Divider } from "@nextui-org/react";
import TableDashboard from "./Table";
import { useLayoutEffect, useState } from "react";
import { Ellipsis, Plus, ChevronUp, Trash, UserRound, Pencil, Triangle } from "lucide-react";
import DonutChart from "@/components/layout/shared/chart/donut";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import { extractTime, validateTimeStatus } from "@/services/api/utils";

const AdminDashboard = () => {
	const zoomedDevices = useMediaQuery({
		query: "(min-device-width: 900px) and (max-device-width: 1600px)",
	});
	const [selected, setSelected] = useState("new-appointments");

	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">Dashboard</h3>
				<div className="flex flex-col gap-3 xl:flex-row">
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
					<div
						style={{ flex: 1 }}
						className={cn(
							"flex flex-col lg:flex-col gap-5 w-full ",
							zoomedDevices ? "xl:max-w-[27rem]" : "xl:~max-w-48/120"
						)}
					>
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md h-fit">
							<div className="flex justify-between">
								<h2 className="text-2xl font-semibold">Total Patients</h2>
								<Button isIconOnly variant="light">
									<Ellipsis />
								</Button>
							</div>
							<div className="flex items-center pl-5 mt-2">
								<div style={{ flex: 2 }}>
									<h1 className="text-6xl font-bold text-end xl:text-start">
										99
									</h1>
								</div>
								<div style={{ flex: 5 }} className="h-48">
									<DonutChart />
								</div>
							</div>
						</div>
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<h2 className="~text-lg/xl font-semibold">Upcoming schedule</h2>
								<Button
									variant="light"
									disableRipple
									className="flex items-center gap-3 text-primary data-[hover=true]:opacity-70 data-[hover=true]:bg-transparent"
								>
									<span className="~text-sm/base font-semibold">
										New Appointment
									</span>
									<span className="p-1 rounded-md border-1">
										<Plus />
									</span>
								</Button>
							</div>
							<div className="flex flex-col">
								<AccordionSchedule />
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
		time: "9:00 AM - 10:00 AM",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
	{
		time: "10:00 AM - 11:00 AM",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
	{
		time: "1:00 PM - 2:30 PM",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
	{
		time: "5:00 PM - 5:30 PM",
		date: "12th June 2021",
		patient_name: "Bolaji Abdulraheem",
		dentist: "Dr. Dwight",
		purpose: "Palatal Expander",
	},
];

// AccordionSchedule component
const AccordionSchedule = () => {
	const [selectedChapter, setSelectedChapter] = useState("item-0");
	const [upcomingActiveIndex, setUpcomingActiveIndex] = useState(undefined);
	const zoomedDevices = useMediaQuery({
		query: "(min-device-width: 900px) and (max-device-width: 1600px)",
	});
	useLayoutEffect(() => {
		const timeChecker = () => {
			let firstUpcomingIndex = undefined;
			data.forEach((item, index) => {
				const status = validateTimeStatus(item.time);
				if (status === "active") {
					setUpcomingActiveIndex(index + 1);
					setSelectedChapter(`item-${index + 1}`);
				} else if (status === "upcoming" && !firstUpcomingIndex) {
					setUpcomingActiveIndex(index);
					firstUpcomingIndex = index;
					setSelectedChapter(`item-${index}`);
				}
			});
		};
		timeChecker();
		const timer = setInterval(() => {
			timeChecker();
		}, [60000]);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<div data-per-time-container className="relative">
			<div
				className={cn(
					"absolute h-full mt-2 w-[1px] bg-[#cbd5e1] top-0 ",
					zoomedDevices ? "left-[3.5rem]" : "left-[4.5rem]"
				)}
			/>
			<div
				className={cn(
					"absolute -bottom-2 h-4 w-4 rounded-full bg-black",
					zoomedDevices ? "left-[3rem]" : "left-[4rem]"
				)}
			/>
			<div data-per-time-indicator className="relative">
				<div
					className={cn(
						"absolute top-1 h-4 w-4 rounded-full bg-black",
						zoomedDevices ? "left-[3rem]" : "left-[4rem]"
					)}
				/>
				<h6>8 : 00</h6>
			</div>
			<div data-per-time-content>
				<div className={cn("", zoomedDevices ? "ml-16" : "~ml-16/24")}>
					<Accordion
						type="single"
						value={selectedChapter}
						onValueChange={setSelectedChapter}
						collapsible
						className="flex flex-col gap-2"
					>
						{data &&
							data.map((item, index) => {
								const { startTime } = extractTime(item.time);

								// format the time
								const firstTime = `${startTime?.hour}:${
									startTime?.minute < 10
										? "0" + startTime?.minute
										: startTime?.minute
								} ${startTime?.meridian}`;

								const status = validateTimeStatus(item.time);
								return (
									<AccordionItem
										key={index}
										value={`item-${index}`}
										aria-label="index"
										className="border-0"
									>
										<AccordionTrigger
											showChevron={false}
											className={cn(
												"relative px-3 py-1 rounded-xl hover:no-underline",
												selectedChapter !== `item-${index}`
													? "border-0"
													: "border"
											)}
										>
											{upcomingActiveIndex == index && (
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
											)}
											<div
												className={cn(
													"flex items-center",
													zoomedDevices ? "gap-3" : "gap-10"
												)}
											>
												<div className="flex items-center gap-5">
													<div
														className={cn(
															"h-3 w-3 bg-[#bdbdbd] rounded-full",

															// For the active appointment
															upcomingActiveIndex === index &&
																"bg-[#27ae60]",

															// For the upcoming appointment except the active one
															upcomingActiveIndex !== index &&
																status === "upcoming" &&
																"bg-[#2F80ED]"
														)}
													/>
													<h6
														className={cn(
															"text-sm font-bold",
															status == "inactive" ||
																status == "active"
																? "line-through opacity-70"
																: ""
														)}
														id="time-item-accordion"
													>
														{firstTime}
													</h6>
												</div>
												<div>
													<h6
														className={cn(
															zoomedDevices ? "text-sm" : "text-base",
															status == "inactive" ||
																status == "active"
																? "line-through opacity-70"
																: ""
														)}
													>
														{item.patient_name}
													</h6>
												</div>
											</div>
											<div className="flex items-center gap-3">
												{status === "upcoming" &&
													upcomingActiveIndex === index &&
													selectedChapter === `item-${index}` && (
														<small className="block text-xs text-gray-400 lg:hidden xl:block">
															Upcoming
														</small>
													)}
												{selectedChapter === `item-${index}` && (
													<div className="p-1 border rounded-lg">
														<ChevronUp
															strokeWidth={3}
															className="text-[#2F80ED]"
														/>
													</div>
												)}
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
														<h6
															style={{ flex: 3 }}
															className="~text-base"
														>
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
														<h6
															style={{ flex: 3 }}
															className="~text-base"
														>
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
														<h6
															style={{ flex: 3 }}
															className="~text-base"
														>
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
															size={zoomedDevices ? "sm" : "md"}
														>
															<Trash
																size={20}
																className="text-red-500"
															/>
														</Button>
														<Button
															isIconOnly
															variant="light"
															className="border"
															size={zoomedDevices ? "sm" : "md"}
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
															size={zoomedDevices ? "sm" : "md"}
														>
															<Pencil
																size={20}
																className="text-[#2F80ED]"
															/>
														</Button>
													</div>
													<div>
														<Button
															color="primary"
															size={zoomedDevices ? "sm" : "md"}
														>
															Begin Appointment
														</Button>
													</div>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
					</Accordion>
				</div>
			</div>
		</div>
	);
};
