/* eslint-disable no-unused-vars */
import React from "react";
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
import { capitalize } from "@/lib/utils";
import { useAppStore } from "@/store/zustand";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = ["time", "date", "patient_name", "dentist", "status"];

export default function TableAppointments() {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "time", //! update this based on the column in the db
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

	// filters the appointments based on the search value
	const filteredItems = React.useMemo(() => {
		let filteredAppointments = [...appointments];

		if (hasSearchFilter) {
			filteredAppointments = filteredAppointments.filter((appointment) => {
				return appointment.patient_name.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredAppointments;
	}, [appointments, filterValue, statusFilter]);

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
		const handleAction = (key) => {
			if (key === "reschedule") {
				setNewScheduleModal({
					isOpen: true,
					title: "Change Status",
					data: null,
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
				});
			}
		};
		switch (columnKey) {
			case "time":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "date":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "patient_name":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "dentist":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "status":
				return (
					<div className="relative flex items-center justify-start gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button variant="light" className="text-primary">
									Reschedule
								</Button>
							</DropdownTrigger>
							<DropdownMenu variant="faded" onAction={handleAction}>
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
							onClick={() => {
								// display the alert dialog
								setAlertDialogDetails({
									isOpen: true,
									title: "Delete Appointment",
									message: "Are you sure you want to delete this appointment?",
									type: "danger",
									dialogType: "confirm",
								});
							}}
						>
							<X />
						</Button>
					</div>
				);
			// case "options":
			// 	return (
			// 		<div className="relative flex items-end justify-end gap-2 max-w-24">
			// 			<Dropdown>
			// 				<DropdownTrigger>
			// 					<Button isIconOnly size="sm" variant="light">
			// 						<EllipsisVertical className="text-default-300" />
			// 					</Button>
			// 				</DropdownTrigger>
			// 				<DropdownMenu onAction={handleAction}>
			// 					<DropdownItem key={"reschedule"}>Reschedule</DropdownItem>
			// 					<DropdownItem key={"delete"} className="text-danger" color="danger">
			// 						Delete
			// 					</DropdownItem>
			// 				</DropdownMenu>
			// 			</Dropdown>
			// 		</div>
			// 	);
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
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<Search />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDown className="text-small" />}
									variant="flat"
								>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button
							color="primary"
							onClick={() =>
								setNewAppointmentModal({
									isOpen: true,
									title: "New Appointment",
									data: null,
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
						Total {appointments.length} appointments
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
			<div className="flex items-center justify-between px-2 py-2">
				<span className="w-[30%] text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`}
				</span>

				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={page === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Previous
					</Button>
					<Pagination
						showControls={false}
						showShadow
						color="primary"
						page={page}
						total={pages}
						onChange={setPage}
					/>
					<Button
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
				wrapper: "w-full shadow-none",
			}}
			selectedKeys={selectedKeys}
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
			topContent={topContent}
			bottomContent={bottomContent}
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
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
