import {
	ScheduleComponent,
	Week,
	Inject,
	ViewsDirective,
	ViewDirective,
	Day,
	TimelineViews,
	Resize,
	DragAndDrop,
	Print,
} from "@syncfusion/ej2-react-schedule";
import PropTypes from "prop-types";
import { Browser, extend, Internationalization, registerLicense } from "@syncfusion/ej2-base";
import { useRef } from "react";
registerLicense(import.meta.env.VITE_CALENDAR_LICENCE_KEY);
import * as dataSource from "./datasource.json";
import { UserRound, FileText, Clock4 } from "lucide-react";
import "./styles.css";
import { Button } from "@nextui-org/react";
import { Printer, Filter, CircleHelp } from "lucide-react";
import { getOrdinalSuffix, getThisWeekMondayAndFriday, months } from "@/lib/utils";

const dataInfo = [
	{
		Id: 1,
		Subject: "Pending",
		Tags: "Eco day, Forest conserving, Earth & its resources",
		Description:
			"A day that creates awareness to promote the healthy planet and reduce the air pollution crisis on nature earth.",
		StartTime: "2024-08-26T00:30:00.000Z",
		EndTime: "2024-08-26T01:30:00.000Z",
		ImageName: "environment-day",
		DentistName: "Dr. John Doe",
		Purpose: "Checkup",
		Time: "8:30 AM - 9:30 AM",
		PrimaryColor: "#fbdddd",
		SecondaryColor: "#eb5757",
		HighlightColor: "#ffc5c5",
	},
	{
		Id: 2,
		Subject: "Pending",
		Tags: "Reduce mental stress, Follow good food habits",
		Description:
			"A day that raises awareness on different health issues. It marks the anniversary of the foundation of WHO.",
		StartTime: "2024-08-27T03:30:00.000Z",
		EndTime: "2024-08-27T04:30:00.000Z",
		DentistName: "Dr. John Doe",
		Purpose: "Teeth Whitening",
		Time: "11:30 AM - 12:30 AM",
		ImageName: "health-day",
		PrimaryColor: "#d4efdf",
		SecondaryColor: "#27ae60",
		HighlightColor: "#d8ffe8",
	},
	{
		Id: 3,
		Subject: "Pending",
		Tags: "Life threatening cancer effects, Palliative care",
		Description:
			"A day that raises awareness on cancer and its preventive measures. Early detection saves life.",
		StartTime: "2024-08-28T01:00:00.000Z",
		EndTime: "2024-08-28T02:00:00.000Z",
		DentistName: "Dr. John Doe",
		Purpose: "Wisdom Tooth Removal",
		Time: "9:00 AM - 10:00 AM",
		ImageName: "cancer-day",
		PrimaryColor: "#d5e6fb",
		SecondaryColor: "#2f80ed",
		HighlightColor: "#c1dcff",
	},
	{
		Id: 4,
		Subject: "Pending",
		Tags: "Stress-free, Smile, Resolve frustration and bring happiness",
		Description: "A general idea is to promote happiness and smile around the world.",
		StartTime: "2024-08-29T01:30:00.000Z",
		EndTime: "2024-08-29T02:30:00.000Z",
		DentistName: "Dr. John Doe",
		Purpose: "Pasta",
		Time: "9:30 AM - 10:30 AM",
		ImageName: "happiness-day",
		PrimaryColor: "#fbdddd",
		SecondaryColor: "#eb5757",
		HighlightColor: "#ffc5c5",
	},
	{
		Id: 5,
		Subject: "Pending",
		Tags: "Diverse cultural heritage, strengthen peace",
		Description:
			"A day that raises awareness on the role of tourism and its effect on social and economic values.",
		StartTime: "2024-08-30T04:00:00.000Z",
		EndTime: "2024-08-30T05:00:00.000Z",
		DentistName: "Dr. John Doe",
		Purpose: "Cleaning",
		Time: "12:00 PM - 1:00 PM",
		ImageName: "tourism-day",
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
	const { monday, friday } = getThisWeekMondayAndFriday();
	const data = extend([], dataInfo, null, true);
	let instance = new Internationalization();

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
	return (
		<div style={{ flex: 1 }} className="bg-white">
			<div className="w-full h-full">
				<div className="p-5">
					<h3 className="text-lg font-darkText">Schedule</h3>
					<div className="flex flex-wrap items-center justify-between ~px-6/14">
						<div>
							<h6 className="~text-lg/xl font-medium">
								Weekly schedule from {monday.day + getOrdinalSuffix(monday.day)} to{" "}
								{friday.day + getOrdinalSuffix(friday.day)} {months[currentMonth]}{" "}
								{currentYear}
							</h6>
						</div>
						<div className="flex gap-3">
							<Button isIconOnly variant="bordered" radius="sm" size="lg">
								<Filter />
							</Button>
							<Button
								isIconOnly
								variant="bordered"
								radius="sm"
								size="lg"
								onClick={onPrintClick}
							>
								<Printer />
							</Button>
							<Button isIconOnly variant="bordered" radius="sm" size="lg">
								<CircleHelp />
							</Button>
						</div>
					</div>
				</div>
				<ScheduleComponent
					eventSettings={{
						dataSource: data,
					}}
					showHeaderBar={false}
					selectedDate={new Date(currentYear, currentMonth, currentDay + 1)}
					workDays={[1, 2, 3, 4, 5]}
					workHours={{ start: "08:00", end: "18:00" }}
					showWeekend={false}
					cssClass="event-template"
					startHour="08:00"
					endHour="18:00"
					readonly={true}
					ref={scheduleObj}
					dateHeaderTemplate={dateHeaderTemplate}
					eventRendered={onEventRendered}
				>
					<ViewsDirective>
						<ViewDirective
							option={Browser.isDevice ? "Day" : "Week"}
							eventTemplate={eventTemplate}
						/>
					</ViewsDirective>
					<Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop, Print]} />
				</ScheduleComponent>
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
