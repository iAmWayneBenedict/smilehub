import SplineChart from "@/components/layout/shared/chart/spline";
import {
	Select,
	SelectItem,
	Button,
	Tabs,
	Tab,
	Divider,
	Skeleton,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import TableDashboard from "./Table";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ellipsis, Plus, ChevronUp, Trash, UserRound, Pencil, Triangle } from "lucide-react";
import DonutChart from "@/components/layout/shared/chart/donut";
import PropTypes from "prop-types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, formatDate } from "@/lib/utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import {
	convertDateYYYYMMDD,
	extractTime,
	sortTimeWithMeridian,
	validateTimeStatus,
} from "@/services/api/utils";
import { useQuery } from "@tanstack/react-query";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { getLocalTimeZone, today } from "@internationalized/date";
import { formatTimeAccordionData } from "./utils";
import DashboardAPIManager from "@/services/api/managers/dashboard/DashboardAPIManager.js";
import AppointmentModal from "@/components/layout/shared/appointment/index.jsx";
import ReschedModal from "@/components/layout/Modals/ReschedModal.jsx";
import { useAppStore, useRealTimeAppointmentsPersisted } from "@/store/zustand.js";
import { useMutation } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Trash2 } from "lucide-react";
import { sendEmail } from "@/services/email";
import { useParams } from "react-router-dom";
import CardsContainer from "@/pages/shared/dashboard/components/CardsContainer.jsx";
import CustomBarChart from "@/pages/shared/dashboard/components/BarChart.jsx";
import { CustomVerticalBarChart } from "@/components/layout/shared/chart/bar/index.jsx";

const AdminDashboard = () => {
	const { setNewAppointmentModal } = useAppStore();

	const [visitData, setVisitData] = useState({
		labels: [],
		data: [],
	});

	const zoomedDevices = useMediaQuery({
		query: "(min-device-width: 900px) and (max-device-width: 1600px)",
	});
	const [selected, setSelected] = useState(new URLSearchParams(location.search).get("tab"));
	const [filterSelected, setFilterSelected] = useState(new Set(["Monthly"]));
	const [chartType, setChartType] = useState(new Set(["Line"]));

	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ["dashboard-statistics"],
		queryFn: DashboardAPIManager.getTotalPatientsStatistics,
	});

	// const { data: visitRequestData, isSuccess: isSuccessIsVisitRequestData } = useQuery({
	// 	queryKey: ["dashboard-visit", filterSelected],
	// 	queryFn: () => {
	// 		return DashboardAPIManager.getPatientVisits({
	// 			filterBy: filterSelected.has("Monthly") ? "month" : "year",
	// 			year: new Date().getFullYear(),
	// 		});
	// 	},
	// });

	useEffect(() => {
		mutation.mutate({
			filterBy: filterSelected.has("Monthly") ? "month" : "year",
			year: new Date().getFullYear(),
		});
	}, [filterSelected]);

	const mutation = useMutation({
		mutationFn: DashboardAPIManager.getPatientVisits,
		onSuccess: (data) => {
			const chartData = {
				labels: data?.categories || [],
				data: data?.data || [],
			};
			setVisitData(chartData);
		},
	});
	const mobileScreen = useMediaQuery({
		query: "(max-width: 640px)",
	});

	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9] overflow-x-hidden sm:overflow-x-auto">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">Dashboard</h3>
				<CardsContainer />
				<div className="flex flex-col gap-3 xl:flex-row mt-5">
					<div style={ { flex: 1 } } className="flex flex-col gap-5">
						{/* top chart */ }
						<div className={ "flex flex-row gap-5" }>
							{/*<div style={ { flex: 2 } } className="p-4 pb-10 bg-white rounded-lg shadow-md">*/}
							{/*	<CustomBarChart/>*/}
							{/*</div>*/}
							<div style={ { flex: 3 } } className="p-4 bg-white rounded-lg shadow-md w-[100%] sm:w-auto">
								<div className="flex justify-between gap-2 flex-col sm:flex-row sm:gap-0">
									<h3 className="text-xl font-medium flex-none sm:flex-1" >
										Patient Visit
									</h3>
									<div
										className="flex items-center gap-3 justify-start sm:justify-end flex-1"
										
									>
										<div className="flex items-center gap-3 justify-start sm:justify-end w-fit">
											<span className="text-lightText whitespace-nowrap">Chart Type</span>
											<div className="w-full max-w-36 min-w-28">
												<Select
													aria-label="Sort by"
													variant="bordered"
													selectedKeys={ chartType }
													onSelectionChange={ setChartType }
													color="primary"
													className="bg-white "
													classNames={ {
														label: "text-darkText font-semibold ",
														inputWrapper: "rounded-lg h-full",
													} }
												>
													<SelectItem key={ "Line" } selected value={ "Line" }>
														Line
													</SelectItem>
													<SelectItem key={ "Bar" } value={ "Bar" }>
														Bar
													</SelectItem>
												</Select>
											</div>
										</div>
										<div className="flex items-center gap-3 justify-start sm:justify-end w-fit">
											<span className="text-lightText whitespace-nowrap">Sort by</span>
											<div className="w-full max-w-36 min-w-28">
												<Select
													aria-label="Sort by"
													variant="bordered"
													selectedKeys={ filterSelected }
													onSelectionChange={ setFilterSelected }
													color="primary"
													className="bg-white "
													classNames={ {
														label: "text-darkText font-semibold ",
														inputWrapper: "rounded-lg h-full",
													} }
												>
													<SelectItem key={ "Monthly" } value={ "Monthly" }>
														Monthly
													</SelectItem>
													<SelectItem key={ "Yearly" } selected value={ "Yearly" }>
														Yearly
													</SelectItem>
												</Select>
											</div>
										</div>
									</div>
								</div>
								{ chartType.has("Line") && <SplineChart data={ visitData }/> }
								{ chartType.has("Bar") && <CustomVerticalBarChart data={ visitData } filterAs={ [...filterSelected][0] }/> }
							</div>

						</div>

						{/* bottom table */ }
						<div style={ { flex: 1 } } className="p-4 bg-white rounded-lg shadow-md">
							<Tabs
								selectedKey={ selected }
								onSelectionChange={ setSelected }
								variant={ "underlined" }
								aria-label="Tabs variants"
								color="primary"
								classNames={ {
									tabContent:
										"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold px-0",
								} }
							>
								<Tab key="new" title={ mobileScreen ? "NEW" : "NEW APPOINTMENTS" }>
									<TableDashboard type={ "new" }/>
								</Tab>
								<Tab
									key="completed"
									title={ mobileScreen ? "COMPLETED" : "COMPLETED APPOINTMENTS" }
								>
									<TableDashboard type={ "completed" }/>
								</Tab>
							</Tabs>
						</div>
					</div>
					{/* right side */ }
					<div
						style={ { flex: 1 } }
						className={ cn(
							"flex flex-col lg:flex-col gap-5 w-full min-w-[20rem]",
							zoomedDevices ? "xl:max-w-[27rem]" : "xl:~max-w-48/120"
						) }
					>
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md h-fit">
							<div className="flex justify-between">
								<h2 className="text-2xl font-semibold">Total Patients</h2>
							</div>
							<div className="flex items-center pl-0 mt-2 sm:pl-5">
								<div style={{ flex: 2 }}>
									<h1 className="text-6xl font-bold text-end xl:text-start">
										{data?.total_patients || 0}
									</h1>
								</div>
								<div style={{ flex: 5 }} className="h-48">
									{isLoading ? (
										<Skeleton className="rounded-lg">
											<div className="w-48 h-full"></div>
										</Skeleton>
									) : (
										<DonutChart
											femaleCount={parseInt(data?.gender_counts?.Female || 0)}
											maleCount={parseInt(data?.gender_counts?.Male || 0)}
											ratherNotToSayCount={parseInt(data?.gender_counts["Rather not"] || 0)}
										/>
									)}
								</div>
							</div>
						</div>
						<div className="p-4 pb-10 bg-white rounded-lg shadow-md">
							<CustomBarChart/>
						</div> 
						{ currentUser === "staff" && <div className="p-4 pb-10 bg-white rounded-lg shadow-md">
							<div className="flex flex-row items-center justify-between">
								<h2 className="~text-lg/xl font-semibold">Upcoming schedule</h2>
								<Button
									variant="light"
									disableRipple
									className="flex items-center gap-3 text-primary data-[hover=true]:opacity-70 data-[hover=true]:bg-transparent"
									onClick={ () =>
										setNewAppointmentModal({
											isOpen: true,
											title: "New Appointment",
											data: null,
											refetch: null,
										})
									}
								>
									<span className="~text-sm/base hidden sm:flex font-semibold">
										New Appointment
									</span>
									<span className="p-1 rounded-md border-1">
										<Plus/>
									</span>
								</Button>
							</div>
							<div className="flex flex-col">
								<AccordionSchedule/>
							</div>
						</div> }
					</div>
				</div>
			</div>
			<AppointmentModal />
			<ReschedModal />
		</div>
	);
};

export default AdminDashboard;

// AccordionSchedule component
const AccordionSchedule = () => {
	// const [selectedChapter, setSelectedChapter] = useState("");
	// const [upcomingActiveIndex, setUpcomingActiveIndex] = useState(undefined);
	const { realTimeAppointments, setRealTimeAppointments } = useRealTimeAppointmentsPersisted();
	const { setRefetchArr, refetchArr, setAlertDialogDetails, setNewScheduleModal } = useAppStore();

	const [appointmentsArr, setAppointmentsArr] = useState([]);

	const zoomedDevices = useMediaQuery({
		query: "(min-device-width: 900px) and (max-device-width: 1600px)",
	});
	const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
		queryKey: ["appointments-today"],
		queryFn: () =>
			AppointmentsAPIManager.getTodaysAppointment({
				APPOINTMENT_DATE: convertDateYYYYMMDD(today(getLocalTimeZone())),
			}),
		retry: false,
	});

	useEffect(() => {
		const isExist = refetchArr.find((item) => item.queryKey === "appointments-today");
		if (isExist) return;
		setRefetchArr([...refetchArr, { queryKey: "appointments-today", refetch }]);
	}, [refetch, refetchArr]);

	useEffect(() => {
		if (isSuccess) {
			// const pendingItems = data.filter((item) => item.STATUS != "Completed");
			const sortedPendingItems = sortTimeWithMeridian(data);
			const timesArray = formatTimeAccordionData(sortedPendingItems);
			setAppointmentsArr(timesArray);
		}
	}, [data, isSuccess]);
	useEffect(() => {
		if (isError) {
			setAppointmentsArr([]);
		}
	}, [data, isError]);
	useLayoutEffect(() => {
		if (!isSuccess) return;
		const timeChecker = () => {
			// const pendingItems = data.filter((item) => item.STATUS != "Completed");
			const sortedPendingItems = sortTimeWithMeridian(data);
			const getNewRealTimeAppointmentPosition = () => {
				return sortedPendingItems.findIndex((item, index) => {
					return realTimeAppointments.upcomingActiveIndex === index;
				});
			};
			let firstUpcomingIndex = undefined;
			sortedPendingItems?.forEach((item, index) => {
				const status = validateTimeStatus(item.APPOINTMENT_TIME);
				if (status === "active") {
					setRealTimeAppointments({
						selectedChapter: `item-${sortedPendingItems[index + 1]?.FULLNAME}`,
						upcomingActiveIndex: index + 1,
					});
					// setUpcomingActiveIndex(index + 1);
					// setSelectedChapter(`item-${sortedPendingItems[index + 1]?.FULLNAME}`);
				} else if (status === "upcoming" && !firstUpcomingIndex) {
					if (realTimeAppointments.upcomingActiveIndex) {
						return;
					}
					if (realTimeAppointments.upcomingActiveIndex <= index || !firstUpcomingIndex) {
						setRealTimeAppointments({
							selectedChapter: `item-${sortedPendingItems[index]?.FULLNAME}`,
							upcomingActiveIndex: index,
						});
						firstUpcomingIndex = index;
						// setUpcomingActiveIndex(index);
						// setSelectedChapter(`item-${sortedPendingItems[index]?.FULLNAME}`);
					}
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
	}, [data, isSuccess]);

	const deleteAppointmentMutation = useMutation({
		mutationFn: AppointmentsAPIManager.postDeleteAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment status deleted successfully!",

				confirmCallback: () => {
					location.href = "/admin/dashboard?tab=new";
				},
			});
			if (refetchArr.length) {
				refetchArr.map((item) => item.refetch());
				setRefetchArr([]);
			}
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error ? error.message : "An error occurred while deleting the appointment",
			});
		},
	});
	const changeStatusMutation = useMutation({
		mutationFn: AppointmentsAPIManager.postChangeStatusAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment status changed successfully!",

				confirmCallback: () => {
					location.href = "/admin/dashboard?tab=new";
				},
			});
			if (refetchArr.length) {
				refetchArr.map((item) => item.refetch());
				setRefetchArr([]);
			}
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error
					? error.message
					: "An error occurred while changing the status of the appointment",
			});
		},
	});
	const handleAction = (key, appointment) => {
		const date = formatDate(new Date(convertDateYYYYMMDD(appointment.APPOINTMENT_DATE)));
		const time = appointment.APPOINTMENT_TIME.split("-")[0];
		if (key === "reschedule") {
			setNewScheduleModal({
				isOpen: true,
				title: "Change Status",
				data: {
					...appointment,
					APPOINTMENT_DATE: new Date(appointment.APPOINTMENT_DATE),
				},
				refetch: refetch,
			});
		} else if (key === "delete") {
			// display the alert dialog
			setAlertDialogDetails({
				isOpen: true,
				title: "Delete Appointment",
				message: "Are you sure you want to delete this appointment?",
				type: "danger",
				dialogType: "confirm",
			});
		} else if (key === "cancel") {
			// display the alert dialog
			setAlertDialogDetails({
				isOpen: true,
				title: "Cancel Appointment",
				message: "Are you sure you want to cancel this appointment?",
				type: "warning",
				dialogType: "confirm",
				confirmCallback: () => {
					sendEmail({
						type: "notification",
						name: appointment.FULLNAME,
						email: appointment.EMAIL,
						title: "Appointment Cancelled",
						content: `Your appointment on ${date} at ${time} has been cancelled. Please contact the clinic for more information.`,
					});
					changeStatusMutation.mutate({
						ID: appointment.ID,
						STATUS: "Cancelled",
					});
				},
			});
		} else if (key === "on_going") {
			// display the alert dialog
			setAlertDialogDetails({
				isOpen: true,
				title: "Change to 'On Going' Appointment",
				message: "Are you sure you want to change the status of this appointment?",
				type: "info",
				dialogType: "confirm",
				confirmCallback: () => {
					sendEmail({
						type: "notification",
						name: appointment.FULLNAME,
						email: appointment.EMAIL,
						title: "Appointment Status Update",
						content: `Your appointment on ${date} at ${time} is now on-going. Please be at the clinic on or before the given time.`,
					});
					changeStatusMutation.mutate({
						ID: appointment.ID,
						STATUS: "On-going",
					});
				},
			});
		} else if (key === "done") {
			// display the alert dialog
			setAlertDialogDetails({
				isOpen: true,
				title: "Change to 'Done' Appointment",
				message: "Are you sure you want to change the status of this appointment?",
				type: "info",
				dialogType: "confirm",
				confirmCallback: () => {
					sendEmail({
						type: "notification",
						name: appointment.FULLNAME,
						email: appointment.EMAIL,
						title: "Appointment Status Update",
						content: `Your appointment on ${date} at ${time} is now done. Please contact the clinic for more information.`,
					});
					changeStatusMutation.mutate({
						ID: appointment.ID,
						STATUS: "Completed",
					});
				},
			});
		} else if (key === "pending") {
			// display the alert dialog
			setAlertDialogDetails({
				isOpen: true,
				title: "Change to 'Pending' Appointment",
				message: "Are you sure you want to change the status of this appointment?",
				type: "info",
				dialogType: "confirm",
				confirmCallback: () => {
					sendEmail({
						type: "notification",
						name: appointment.FULLNAME,
						email: appointment.EMAIL,
						title: "Appointment Status Update",
						content: `Your appointment on ${date} at ${time} is now pending. Please wait for further updates.`,
					});
					changeStatusMutation.mutate({
						ID: appointment.ID,
						STATUS: "Pending",
					});
				},
			});
		}
	};
	return (
		<>
			{appointmentsArr.map(({ time, appointments: items }, index) => (
				<div key={index} data-per-time-container className="relative">
					<div
						className={cn(
							"absolute h-full mt-2 w-[1px] bg-[#cbd5e1] top-0 ",
							zoomedDevices ? "left-[3.5rem]" : "left-[4.5rem]"
						)}
					/>

					<div data-per-time-indicator className="relative">
						<div
							className={cn(
								"absolute top-1 h-4 w-4 rounded-full bg-black",
								zoomedDevices ? "left-[3rem]" : "left-[4rem]"
							)}
						/>
						<h6>{time}</h6>
					</div>
					<div data-per-time-content>
						<div className={cn("", zoomedDevices ? "ml-16" : "~ml-16/24")}>
							<Accordion
								type="single"
								value={realTimeAppointments.selectedChapter}
								onValueChange={(key) =>
									setRealTimeAppointments({
										...realTimeAppointments,
										selectedChapter: key,
									})
								}
								collapsible
								className="flex flex-col gap-2"
							>
								{items.map((item) => {
									const { startTime } = extractTime(item.APPOINTMENT_TIME);

									// format the time
									const firstTime = `${startTime?.hour}:${
										startTime?.minute < 10
											? "0" + startTime?.minute
											: startTime?.minute
									} ${startTime?.meridian}`;

									const status = validateTimeStatus(item.APPOINTMENT_TIME);

									return (
										<AccordionItem
											key={index}
											value={`item-${item.FULLNAME}`}
											aria-label="index"
											className="border-0"
										>
											<AccordionTrigger
												showChevron={false}
												className={cn(
													"relative px-3 py-1 rounded-xl hover:no-underline",
													realTimeAppointments.selectedChapter !==
														`item-${item.FULLNAME}`
														? "border-0"
														: "border"
												)}
											>
												{realTimeAppointments.upcomingActiveIndex ==
													index && (
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

																// For the upcoming appointment except the active one
																realTimeAppointments.upcomingActiveIndex <=
																	index &&
																	status === "upcoming" &&
																	"bg-[#2F80ED]",

																// For the active appointment
																realTimeAppointments.upcomingActiveIndex ===
																	index && "bg-[#27ae60]"
															)}
														/>
														<h6
															className={cn(
																"text-sm font-bold",
																status == "inactive" ||
																	status == "active"
																	? "line-through opacity-70"
																	: "",
																realTimeAppointments.upcomingActiveIndex >
																	index
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
																zoomedDevices
																	? "text-sm"
																	: "text-base",
																status == "inactive" ||
																	status == "active"
																	? "line-through opacity-70"
																	: "",

																realTimeAppointments.upcomingActiveIndex >
																	index
																	? "line-through opacity-70"
																	: ""
															)}
														>
															{item.FULLNAME}
														</h6>
													</div>
												</div>
												<div className="flex items-center gap-3">
													{status === "upcoming" &&
														realTimeAppointments.upcomingActiveIndex ===
															index &&
														realTimeAppointments.selectedChapter ===
															`item-${item.FULLNAME}` && (
															<small className="block text-xs text-gray-400 lg:hidden xl:block">
																Upcoming
															</small>
														)}
													{realTimeAppointments.selectedChapter ===
														`item-${item.FULLNAME}` && (
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
																{item.FULLNAME}
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
																{item.APPOINTMENT_TIME}
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
																{item.PURPOSE}
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
																onClick={() => {
																	setAlertDialogDetails({
																		isOpen: true,
																		title: "Archive Appointment",
																		message:
																			"Are you sure you want to archive this appointment?",
																		type: "danger",
																		dialogType: "confirm",
																		confirmCallback: () => {
																			const date = formatDate(
																				new Date(
																					convertDateYYYYMMDD(
																						item.APPOINTMENT_DATE
																					)
																				)
																			);
																			const time =
																				item.APPOINTMENT_TIME.split(
																					"-"
																				)[0];
																			sendEmail({
																				type: "notification",
																				name: item.FULLNAME,
																				email: item.EMAIL,
																				title: "Appointment Archived",
																				content: `Your appointment on ${date} at ${time} has been archived. Please contact the clinic for more information.`,
																			});
																			deleteAppointmentMutation.mutate(
																				{
																					ID: item.ID,
																				}
																			);
																		},
																	});
																}}
															>
																<Trash
																	size={20}
																	className="text-red-500"
																/>
															</Button>

															{/* <Button
																isIconOnly
																variant="light"
																className="border"
																size={zoomedDevices ? "sm" : "md"}
															>
																<UserRound
																	size={20}
																	className="text-[#2F80ED]"
																/>
															</Button> */}

															<Dropdown>
																<DropdownTrigger>
																	<Button
																		isIconOnly
																		variant="light"
																		className="border"
																		size={
																			zoomedDevices
																				? "sm"
																				: "md"
																		}
																	>
																		<Pencil
																			size={20}
																			className="text-[#2F80ED]"
																		/>
																	</Button>
																</DropdownTrigger>
																<DropdownMenu
																	variant="faded"
																	onAction={(key) =>
																		handleAction(key, item)
																	}
																>
																	<DropdownItem
																		key={"pending"}
																		startContent={
																			<Clock size={20} />
																		}
																	>
																		Pending
																	</DropdownItem>
																	<DropdownItem
																		key={"on_going"}
																		startContent={
																			<Clock size={20} />
																		}
																	>
																		On-going
																	</DropdownItem>
																	<DropdownItem
																		key={"done"}
																		startContent={
																			<CheckCheck size={20} />
																		}
																	>
																		Done
																	</DropdownItem>
																	<DropdownItem
																		key={"reschedule"}
																		startContent={
																			<CalendarDays
																				size={20}
																			/>
																		}
																	>
																		Reschedule
																	</DropdownItem>
																	<DropdownItem
																		key={"cancel"}
																		startContent={
																			<Trash2 size={20} />
																		}
																		className="text-danger"
																		color="danger"
																	>
																		Cancel
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</div>
														<div>
															{realTimeAppointments.upcomingActiveIndex ===
																index && (
																<Button
																	color="primary"
																	size={
																		zoomedDevices ? "sm" : "md"
																	}
																	onClick={() => {
																		setAlertDialogDetails({
																			isOpen: true,
																			title: "Begin Appointment",
																			message:
																				"Are you sure you want to begin this appointment? You will not be able to revert this action.",
																			type: "warning",
																			dialogType: "confirm",
																			confirmCallback: () => {
																				setRealTimeAppointments(
																					{
																						selectedChapter: `item-${
																							appointmentsArr[
																								index +
																									1
																							]
																								?.appointments[0]
																								?.FULLNAME
																						}`,
																						upcomingActiveIndex:
																							index +
																							1,
																					}
																				);
																				// setUpcomingActiveIndex(
																				// 	index + 1
																				// );
																				// setSelectedChapter(
																				// 	`item-${
																				// 		appointmentsArr[
																				// 			index +
																				// 				1
																				// 		]
																				// 			?.appointments[0]
																				// 			?.FULLNAME
																				// 	}`
																				// );
																			},
																		});
																	}}
																>
																	Begin Appointment
																</Button>
															)}
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
			))}
			{appointmentsArr.length === 0 && (
				<div className="flex items-center justify-center h-28">
					<h6 className="text-gray-400">No appointments for today</h6>
				</div>
			)}
		</>
	);
};
