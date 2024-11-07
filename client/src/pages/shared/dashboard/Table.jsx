/* eslint-disable no-unused-vars */
import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import { columns, appointments } from "./data";
import { X, Clock, CheckCheck, CalendarDays, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AppontmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager.js";
import { useAppStore } from "@/store/zustand.js";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager.js";
import { useEffect } from "react";
import { sendEmail } from "@/services/email";
import { formatDate } from "@/lib/utils";
import { convertDateYYYYMMDD } from "@/services/api/utils";

const INITIAL_VISIBLE_COLUMNS = [
	"APPOINTMENT_TIME",
	"APPOINTMENT_DATE",
	"FULLNAME",
	"dentist",
	"STATUS",
];

export default function TableDashboard({ type }) {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "APPOINTMENT_TIME",
		direction: "ascending",
	});
	const { setNewScheduleModal, setAlertDialogDetails, setRefetchArr, refetchArr } = useAppStore();

	const queryClient = useQueryClient();

	// handle header columns
	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const { data, isSuccess, isLoading, isError, refetch } = useQuery({
		queryKey: ["dashboardAppointments"],
		queryFn: AppontmentsAPIManager.getPatientAppointments,
		retry: false,
	});

	useEffect(() => {
		const isExist = refetchArr.find((item) => item.queryKey === "dashboardAppointments");
		if (isExist) return;
		setRefetchArr([...refetchArr, { queryKey: "dashboardAppointments", refetch }]);
	}, [refetch, refetchArr]);

	const changeStatusMutation = useMutation({
		mutationFn: AppointmentsAPIManager.postChangeStatusAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment status changed successfully!",

				confirmCallback: () => {
					location.href = "/admin/dashboard?tab=" + type;
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
	const deleteAppointmentMutation = useMutation({
		mutationFn: AppointmentsAPIManager.postDeleteAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment status deleted successfully!",

				confirmCallback: () => {
					location.href = "/admin/dashboard?tab=" + type;
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

	// filter appointments
	const filteredItems = React.useMemo(() => {
		if (isLoading) return [];
		if (isError) return [];
		if (isSuccess && data.length === 0) return [];
		let filteredAppointments = [];
		if (type === "completed") {
			filteredAppointments = data?.filter((item) => item.STATUS === "Completed");
		} else {
			filteredAppointments = data?.filter((item) => item.STATUS !== "Completed") || [];
		}
		//	limit to 5 items only
		return filteredAppointments.slice(0, 5);
	}, [type, data, isLoading, isError]);
	// paginate appointments
	const items = React.useMemo(() => {
		return filteredItems.slice(0, 5);
	}, [filteredItems]);

	// sort appointments
	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);
	// render cell
	const renderCell = React.useCallback((appointment, columnKey) => {
		const cellValue = appointment[columnKey];
		const date = formatDate(new Date(convertDateYYYYMMDD(appointment.APPOINTMENT_DATE)));
		const time = appointment.APPOINTMENT_TIME.split("-")[0];
		const handleAction = (key) => {
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
						changeStatusMutation.mutate({
							ID: appointment.ID,
							STATUS: "Cancelled",
						});
						sendEmail({
							type: "notification",
							name: appointment.FULLNAME,
							email: appointment.EMAIL,
							title: "Appointment Cancellation",
							content: `Your appointment on ${date} at ${time} has been cancelled. Please contact the clinic for more information.`,
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
						changeStatusMutation.mutate({
							ID: appointment.ID,
							STATUS: "On-going",
						});
						sendEmail({
							type: "notification",
							name: appointment.FULLNAME,
							email: appointment.EMAIL,
							title: "Appointment Status Update",
							content: `Your appointment on ${date} at ${time} is now on-going. Please be at the clinic on or before the given time. `,
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
						changeStatusMutation.mutate({
							ID: appointment.ID,
							STATUS: "Completed",
						});
						sendEmail({
							type: "notification",
							name: appointment.FULLNAME,
							email: appointment.EMAIL,
							title: "Appointment Status Update",
							content: `Your appointment on ${date} at ${time} is now completed. Thank you for choosing our clinic. `,
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
						changeStatusMutation.mutate({
							ID: appointment.ID,
							STATUS: "Pending",
						});
					},
				});
			}
		};
		switch (columnKey) {
			case "APPOINTMENT_TIME":
				return (
					<div className="flex flex-col min-w-16">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "APPOINTMENT_DATE":
				return (
					<div className="flex flex-col min-w-16">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "FULLNAME":
				return (
					<div className="flex flex-col min-w-16">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "dentist":
				return (
					<div className="flex flex-col min-w-16">
						<p className="capitalize text-bold text-small">Dr. John Doe</p>
					</div>
				);
			case "STATUS":
				return (
					<div className="relative flex items-center justify-start gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button
									variant="light"
									aria-label="resched"
									className="text-primary"
								>
									{cellValue}
								</Button>
							</DropdownTrigger>
							<DropdownMenu variant="faded" onAction={handleAction}>
								<DropdownItem key={"pending"} startContent={<Clock size={20} />}>
									Pending
								</DropdownItem>
								<DropdownItem key={"on_going"} startContent={<Clock size={20} />}>
									On-going
								</DropdownItem>
								<DropdownItem key={"done"} startContent={<CheckCheck size={20} />}>
									Done
								</DropdownItem>
								<DropdownItem
									key={"reschedule"}
									startContent={<CalendarDays size={20} />}
								>
									Reschedule
								</DropdownItem>
								<DropdownItem
									key={"cancel"}
									startContent={<Trash2 size={20} />}
									className="text-danger"
									color="danger"
								>
									Cancel
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>

						<Button
							color="danger"
							size="sm"
							isIconOnly
							aria-label="delete"
							onClick={() => {
								const date = formatDate(
									new Date(convertDateYYYYMMDD(appointment.APPOINTMENT_DATE))
								);
								const time = appointment.APPOINTMENT_TIME.split("-")[0];
								sendEmail({
									type: "notification",
									name: appointment.FULLNAME,
									email: appointment.EMAIL,
									title: "Appointment Deletion",
									content: `Your appointment on ${date} at ${time} has been deleted. Please contact the clinic for more information.`,
								});

								// display the alert dialog
								setAlertDialogDetails({
									isOpen: true,
									title: "Delete Appointment",
									message: "Are you sure you want to delete this appointment?",
									type: "danger",
									dialogType: "confirm",
									confirmCallback: () => {
										deleteAppointmentMutation.mutate({
											ID: appointment.ID,
										});
									},
								});
							}}
						>
							<X />
						</Button>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	// render table
	return (
		<Table
			aria-label="Appointments"
			isHeaderSticky={false}
			bottomContentPlacement="outside"
			classNames={{
				th: "bg-primary text-white data-[hover=true]:text-gray-300",
				table: "min-w-[40rem]",
				wrapper:
					"min-h-96 bg-gray-50 p-0 max-h-[382px] shadow-none w-fit md:w-full overflow-x-scroll max-w-[80vw] md:max-w-[88vw] 2xl:max-w-none custom-scrollbar-vertical",
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No appointments found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.ID}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
TableDashboard.propTypes = {
	type: PropTypes.string,
};
