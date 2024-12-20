import {
	ScheduleComponent,
	Week,
	Inject,
	ViewsDirective,
	ViewDirective,
	Day,
	TimelineViews,
	DragAndDrop,
	Print,
} from "@syncfusion/ej2-react-schedule";
import PropTypes from "prop-types";
import { Browser, extend, Internationalization, registerLicense } from "@syncfusion/ej2-base";
import { useCallback, useEffect, useRef, useState } from "react";
registerLicense(import.meta.env.VITE_CALENDAR_LICENCE_KEY);
import * as dataSource from "./datasource.json";
import { UserRound, FileText, Clock4 } from "lucide-react";
import "./styles.css";
import {
	Button,
	CircularProgress,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { Printer, Filter, CircleHelp } from "lucide-react";
import {
	getISODateString,
	getOrdinalSuffix,
	getThisWeekMondayAndSaturday,
	months,
	patientStatus,
	purpose,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager.js";

const COLORS = [
	{
		Status: "Cancelled",
		PrimaryColor: "#fbdddd",
		SecondaryColor: "#eb5757",
		HighlightColor: "#ffc5c5",
	},
	{
		Status: "Completed",
		PrimaryColor: "#d4efdf",
		SecondaryColor: "#27ae60",
		HighlightColor: "#d8ffe8",
	},
	{
		Status: "On-going",
		PrimaryColor: "#d5e6fb",
		SecondaryColor: "#2f80ed",
		HighlightColor: "#c1dcff",
	},
	{
		Status: "Pending",
		PrimaryColor: "#f9f1d8",
		SecondaryColor: "#e2b93b",
		HighlightColor: "#fff3cd",
	},
];
const Calendar = () => {
	const scheduleObj = useRef(null);
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();
	const { monday, saturday } = getThisWeekMondayAndSaturday();
	let instance = new Internationalization();
	const [isCompletedData, setIsCompletedData] = useState(false);
	const [weeklyAppointmentsData, setWeeklyAppointmentsData] = useState(null);
	const [filterType, setFilterType] = useState("all");
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
	const [filterKeys, setFilterKeys] = useState(new Set(["text"]));

	const {
		data: appointmentsDataRequest,
		isLoading,
		isSuccess,
		refetch,
		isError,
	} = useQuery({
		queryKey: ["calendarAppointments"],
		queryFn: AppointmentsAPIManager.getPatientAppointments,
	});

	useEffect(() => {
		let newAppointmentData = [];
		if (isSuccess) {
			newAppointmentData = handlePopulateCalendarSchema(appointmentsDataRequest);
			setWeeklyAppointmentsData(newAppointmentData);
			setIsCompletedData(true);
		}
	}, [appointmentsDataRequest, isSuccess]);

	useEffect(() => {
		if (isError) {
			setIsCompletedData(true);
		}
	}, [isError]);

	// hide the syncfusion license error message
	// ! This is a temporary fix. bug in syncfusion license key
	useEffect(() => {
		document.querySelectorAll("div[style]").forEach((el) => {
			if (
				el.innerText?.toLowerCase()?.includes("free account") &&
				el.outerHTML?.includes("position: fixed")
			)
				el.style.display = "none";
		});
	}, [isCompletedData]);

	useEffect(() => {
		if (!isSuccess) return;

		// reset the data to the original
		if (filterKeys.size === 1) {
			setWeeklyAppointmentsData(handlePopulateCalendarSchema(appointmentsDataRequest));
			setIsCompletedData(true);

			return;
		}
		let filteredAppointmentData = null;
		const filterKeysArr = [...filterKeys];

		//		// filter data based on the selected filter keys
		if (filterType === "purpose")
			filteredAppointmentData = appointmentsDataRequest.filter((item) =>
				filterKeysArr.includes(item.PURPOSE)
			);
		else
			filteredAppointmentData = appointmentsDataRequest.filter((item) =>
				filterKeysArr.includes(item.STATUS)
			);
		setWeeklyAppointmentsData(handlePopulateCalendarSchema(filteredAppointmentData));
		setIsCompletedData(true);
	}, [isSuccess, filterKeys]);

	const handlePopulateCalendarSchema = (arrData) => {
		return arrData?.map((item) => {
			const random_number = Math.floor(Math.random() * 4);
			const [startTime, endTime] = item.APPOINTMENT_TIME.split(" - ");
			return {
				Id: item.ID,
				Subject: item.STATUS,
				Time: item.APPOINTMENT_TIME,
				Purpose: item.PURPOSE,
				DentistName: "Dr. John Doe",
				StartTime: getISODateString(`${item.APPOINTMENT_DATE} ${startTime}`),
				EndTime: getISODateString(`${item.APPOINTMENT_DATE} ${endTime}`),
				// random color
				...COLORS.find((color) => item.STATUS === color.Status),
			};
		});
	};

	// This function is used to create the event template which is used to display the event content in the Schedule
	const eventTemplate = (props) => {
		return (
			<div className="template-wrap" style={{ backgroundColor: props.PrimaryColor }}>
				<div className="subject">
					<div
						className="header"
						style={{
							color: props?.SecondaryColor,
							backgroundColor: props.HighlightColor,
						}}
					>
						<div
							className="highlight"
							style={{ backgroundColor: props?.SecondaryColor }}
						></div>
						{props.Subject}
					</div>
				</div>
				<div className="event-description">
					<div className="item" style={{ color: props?.SecondaryColor }}>
						<UserRound size={20} />
						<span className="ml-2">{props?.DentistName}</span>
					</div>
					<div className="item" style={{ color: props?.SecondaryColor }}>
						<FileText size={20} />
						<span className="ml-2">{props?.Purpose}</span>
					</div>
					<div className="item" style={{ color: props?.SecondaryColor }}>
						<Clock4 size={20} />
						<span className="ml-2">{props?.Time}</span>
					</div>
				</div>
			</div>
		);
	};
	eventTemplate.propTypes = {
		PrimaryColor: PropTypes.string,
		SecondaryColor: PropTypes.string,
		Subject: PropTypes.string,
		StartTime: PropTypes.instanceOf(Date),
		EndTime: PropTypes.instanceOf(Date),
		ImageName: PropTypes.string,
		Description: PropTypes.string,
	};

	// This function is used to create the timeline event template which is used to display the timeline event content in the Schedule
	const timelineEventTemplate = (props) => {
		return (
			<div className="template-wrap" style={{ background: props.PrimaryColor }}>
				<div
					className="subject"
					style={{
						background: props.SecondaryColor,
						borderRightWidth: 15,
						borderLeftWidth: 15,
						borderLeftColor: props.PrimaryColor,
						borderRightColor: props.PrimaryColor,
						borderLeftStyle: "solid",
						borderRightStyle: "solid",
					}}
				>
					{props.Subject}
				</div>
			</div>
		);
	};
	timelineEventTemplate.propTypes = {
		PrimaryColor: PropTypes.string,
		SecondaryColor: PropTypes.string,
		Subject: PropTypes.string,
	};

	// This function is used to get the date header text based on the current view
	const getDateHeaderText = (value) => {
		return `${instance.formatDate(value, {
			skeleton: "E",
		})} (${instance.formatDate(value, {
			skeleton: "d",
		})})`;
	};

	// This function is used to get the date header template based on the current view
	const dateHeaderTemplate = (props) => {
		return (
			<div>
				<div className="date-calendar-header">{getDateHeaderText(props.date)}</div>
			</div>
		);
	};

	// This function is used to apply the category color to the event based on the current view
	const onEventRendered = (args) => {
		applyCategoryColor(args, scheduleObj.current.currentView);
	};

	const onPrintClick = () => {
		scheduleObj.current.print();
	};
	const SchedulerElement = useCallback(() => {
		return (
			<div className="overflow-x-scroll max-w-[100vw] lg:max-w-[80vw]">
				<div className="min-w-[80rem] lg:min-w-[60rem]">
					<ScheduleComponent
						eventSettings={{
							dataSource: weeklyAppointmentsData,
						}}
						showHeaderBar={false}
						selectedDate={new Date()}
						workDays={[1, 2, 3, 4, 5, 6]}
						workHours={{ start: "09:00", end: "18:00" }}
						showWeekend={false}
						cssClass="event-template"
						startHour="09:00"
						endHour="18:00"
						readonly={true}
						ref={scheduleObj}
						dateHeaderTemplate={dateHeaderTemplate}
						eventRendered={onEventRendered}
					>
						<ViewsDirective>
							<ViewDirective option={"Week"} eventTemplate={eventTemplate} />
						</ViewsDirective>
						<Inject services={[Week, Print]} />
					</ScheduleComponent>
				</div>
			</div>
		);
	}, [weeklyAppointmentsData]);
	return (
		<div style={{ flex: 1 }} className="bg-white">
			<div className="flex flex-col w-full h-full">
				<div className="p-5">
					<h3 className="text-lg font-darkText">Schedule</h3>
					<div className="flex flex-wrap items-center justify-between px-0 mt-5 sm:~px-6/14">
						<div>
							<h6 className="~text-lg/xl font-medium">
								Weekly schedule from {monday.day + getOrdinalSuffix(monday.day)} to{" "}
								{saturday.day + getOrdinalSuffix(saturday.day)}{" "}
								{months[currentMonth]} {currentYear}
							</h6>
						</div>
						<div className="flex gap-3 mt-3 sm:mt-0">
							<Dropdown closeOnSelect={false}>
								<DropdownTrigger>
									<Button isIconOnly variant="bordered" size="lg">
										<Filter />
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label="Single selection example"
									variant="flat"
									disallowEmptySelection
									selectionMode="single"
									selectedKeys={selectedKeys}
									onSelectionChange={setSelectedKeys}
								>
									<DropdownItem
										key="diagnosis"
										textValue="diagnosis"
										hideSelectedIcon
									>
										<Dropdown closeOnSelect={false}>
											<DropdownTrigger>Purpose</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												selectionMode="multiple"
												selectedKeys={filterKeys}
												onSelectionChange={(keys) => {
													setFilterType("purpose");
													setFilterKeys(keys);
													setIsCompletedData(false);
												}}
											>
												{purpose.map((item) => (
													<DropdownItem textValue={item} key={item}>
														{item}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</DropdownItem>
									<DropdownItem key="status" textValue="status" hideSelectedIcon>
										<Dropdown closeOnSelect={false}>
											<DropdownTrigger>Status</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												selectionMode="multiple"
												selectedKeys={filterKeys}
												onSelectionChange={(keys) => {
													setFilterType("status");
													setFilterKeys(keys);
													setIsCompletedData(false);
												}}
											>
												{patientStatus.map((item) => (
													<DropdownItem textValue={item} key={item}>
														{item}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button
								isIconOnly
								variant="bordered"
								radius="sm"
								size="lg"
								onClick={onPrintClick}
							>
								<Printer />
							</Button>
						</div>
					</div>
				</div>
				{!isCompletedData ? (
					<div style={{ flex: 1 }} className="flex items-center justify-center">
						<div className="flex flex-col items-center gap-5">
							<h1>Loading Calendar ...</h1>
							<CircularProgress color="primary" aria-label="Loading..." />
						</div>
					</div>
				) : (
					<SchedulerElement />
				)}
			</div>
		</div>
	);
};

export default Calendar;
function applyCategoryColor(args, currentView) {
	let categoryColor = args.data.CategoryColor;
	if (!args.element || !categoryColor) {
		return;
	}
	if (currentView === "Agenda") {
		args.element.firstChild.style.borderLeftColor = categoryColor;
	} else {
		args.element.style.backgroundColor = categoryColor;
	}
}
