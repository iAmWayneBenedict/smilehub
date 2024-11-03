/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Pagination,
} from "@nextui-org/react";
import { columns, appointments } from "../data";
import {
	X,
	Search,
	Plus,
	ChevronDown,
	Clock,
	CheckCheck,
	CalendarDays,
	Trash2,
} from "lucide-react";
import { capitalize, formatDate } from "@/lib/utils";
import { useAppStore } from "@/store/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import PropTypes from "prop-types";
import { sendEmail } from "@/services/email";
import { convertDateYYYYMMDD } from "@/services/api/utils";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = [
	"APPOINTMENT_TIME",
	"APPOINTMENT_DATE",
	"FULLNAME",
	"dentist",
	"STATUS",
];

export default function TableAppointments({ type }) {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "APPOINTMENT_TIME", //! update this based on the column in the db
		direction: "ascending",
	});
	const { setAlertDialogDetails, setNewAppointmentModal, setNewScheduleModal } = useAppStore();

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	// checks if all items are selected
	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);
	const queryClient = useQueryClient();

	const { data, isLoading, isSuccess, isError, refetch } = useQuery({
		queryKey: ["allAppointments"],
		queryFn: AppointmentsAPIManager.getPatientAppointments,
		retry: false,
	});

	const changeStatusMutation = useMutation({
		mutationFn: AppointmentsAPIManager.postChangeStatusAppointment,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment status changed successfully!",
			});
			refetch();
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
			});
			refetch();
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

	// filters the appointments based on the search value
	const filteredItems = React.useMemo(() => {
		if (isLoading) return [];
		if (isError) return [];
		let filteredAppointments = [];
		if (type === "completed") {
			filteredAppointments = data?.filter((item) => item.STATUS === "Completed");
		} else {
			filteredAppointments = data?.filter((item) => item.STATUS !== "Completed");
		}

		if (hasSearchFilter) {
			filteredAppointments = filteredAppointments.filter((appointment) => {
				return appointment.FULLNAME.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredAppointments;
	}, [filterValue, statusFilter, data, isSuccess, isError]);

	// paginates the filtered items
	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [filteredItems, rowsPerPage, page]);

	// sorts the items based on the sort descriptor
	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);
	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	// renders the cell based on the column
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
						sendEmail({
							type: "notification",
							name: appointment.FULLNAME,
							email: appointment.EMAIL,
							title: "Appointment Status Update",
							content: `Your appointment on ${date} at ${time} is now pending. Please wait for further updates. `,
						});
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
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "APPOINTMENT_DATE":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "FULLNAME":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "dentist":
				return (
					<div className="flex flex-col">
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
								// display the alert dialog
								setAlertDialogDetails({
									isOpen: true,
									title: "Delete Appointment",
									message: "Are you sure you want to delete this appointment?",
									type: "danger",
									dialogType: "confirm",
									confirmCallback: () => {
										const date = formatDate(
											new Date(
												convertDateYYYYMMDD(appointment.APPOINTMENT_DATE)
											)
										);
										const time = appointment.APPOINTMENT_TIME.split("-")[0];
										sendEmail({
											type: "notification",
											name: appointment.FULLNAME,
											email: appointment.EMAIL,
											title: "Appointment Deletion",
											content: `Your appointment on ${date} at ${time} has been deleted. Please contact the clinic for more information.`,
										});
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

	// handle next page
	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	// handle previous page
	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	// handle rows per page change
	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	// handle search change
	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	// handle clear search
	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	// table top content with search and new appointment button
	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex flex-col-reverse items-end justify-between gap-3 sm:flex-row">
					<Input
						isClearable
						aria-label="Search"
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<Search />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Button
							aria-label="New Appointment"
							color="primary"
							onClick={() =>
								setNewAppointmentModal({
									isOpen: true,
									title: "New Appointment",
									data: null,
									refetch: refetch,
								})
							}
							startContent={<Plus />}
						>
							New Appointment
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">
						Total {filteredItems.length} appointments
					</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		filteredItems,
		filterValue,
		onSearchChange,
		visibleColumns,
		onRowsPerPageChange,
		onClear,
		setNewAppointmentModal,
	]);

	// table bottom content with pagination
	const bottomContent = React.useMemo(() => {
		return (
			<div className="flex items-center justify-end px-2 py-2">
				<div className="flex justify-end gap-2 w-fit">
					<Button
						aria-label="Previous Page"
						isDisabled={page === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Previous
					</Button>
					<Pagination
						aria-label="Pagination"
						showControls={false}
						showShadow
						color="primary"
						page={page}
						total={pages}
						onChange={setPage}
					/>
					<Button
						aria-label="Next Page"
						isDisabled={page === pages}
						size="sm"
						variant="flat"
						onPress={onNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	// render the table
	return (
		<Table
			isHeaderSticky={false}
			bottomContentPlacement="outside"
			classNames={{
				th: "bg-primary text-white data-[hover=true]:text-gray-300",
				table: "min-w-[55rem]",
				wrapper:
					"min-h-96 bg-gray-50 p-0 w-full shadow-none w-fit md:w-full overflow-x-scroll max-w-[88vw] sm:max-w-[94vw] lg:max-w-[80vw] 2xl:max-w-none",
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
			topContent={topContent}
			bottomContent={bottomContent}
			aria-label="Appointments Table"
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
						className={column.uid === "options" ? "w-24" : ""}
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
TableAppointments.propTypes = {
	type: PropTypes.string,
};
