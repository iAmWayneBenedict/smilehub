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
	Chip,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { columns, patients } from "../data";
import { X, Search, Plus, ChevronDown, EllipsisVertical } from "lucide-react";
import { capitalize } from "@/lib/utils";
import { useAppStore } from "@/store/zustand";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const INITIAL_VISIBLE_COLUMNS = [
	"FULLNAME",
	"DIAGNOSIS",
	"STATUS",
	"Last_Appointment",
	"Next_Appointment",
	"options",
];

export default function TablePatients({
	type,
	filterType: statusFilterProp,
	filterKeys: filterKeysProp,
	setTotalPatients: setTotalPatientsProp = () => {},
}) {
	const [filterKeys, setFilterKeys] = React.useState(filterKeysProp);
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState(statusFilterProp);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const navigate = useNavigate();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "name",
		direction: "ascending",
	});

	useEffect(() => {
		setFilterKeys(filterKeysProp);
		setStatusFilter(statusFilterProp);
	}, [filterKeysProp, statusFilterProp]);

	const { setAlertDialogDetails, setNewAppointmentModal } = useAppStore();

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ["patients-appointments"],
		queryFn: PatientsAPIManager.getAppointmentPatient,
	});
	const {
		data: patientsData,
		isLoading: isLoadingPatientData,
		isSuccess: isSuccessPatientData,
		refetch: refetchPatientData,
	} = useQuery({
		queryKey: ["all-patients"],
		queryFn: PatientsAPIManager.getAllPatients,
	});

	useEffect(() => {
		if (isSuccessPatientData) {
			setTotalPatientsProp(patientsData.length);
		}
	}, [isSuccessPatientData]);

	const mutationArchive = useMutation({
		mutationFn: PatientsAPIManager.postChangeStatusPatient,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Patient archived successfully",
			});
			refetchPatientData();
			refetch();
		},
		onError: (error) => {
			console.error(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: "An error occurred while archiving the patient",
			});
		},
	});

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		if (!isSuccess || !isSuccessPatientData) return [];
		const archivedPatients = patientsData
			.filter((patient) => patient.ROLE === "ARCHIVE")
			.map((patient) => parseInt(patient.ID));
		let filteredPatients = data.patients.filter((patient) =>
			type === "archived"
				? archivedPatients.includes(patient.ID)
				: !archivedPatients.includes(patient.ID)
		);
		if (hasSearchFilter) {
			filteredPatients = filteredPatients.filter((patient) => {
				return patient.FULLNAME.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}
		if (statusFilter === "diagnosis") {
			if (filterKeys.length === 1) return filteredPatients;
			filteredPatients = filteredPatients.filter((patient) => {
				return filterKeys.includes(patient.DIAGNOSIS);
			});
		}
		if (statusFilter === "status") {
			if (filterKeys.length === 1) return filteredPatients;
			filteredPatients = filteredPatients.filter((patient) => {
				return filterKeys.includes(patient.STATUS);
			});
		}

		return filteredPatients;
	}, [data, isSuccess, filterValue, statusFilter, filterKeys, isSuccessPatientData]);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [filteredItems, rowsPerPage, page]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);
	const pages = Math.ceil(filteredItems.length / rowsPerPage);
	const renderCell = React.useCallback((appointment, columnKey) => {
		const cellValue = appointment[columnKey];
		const handleAction = (key) => {
			if (key === "view") {
				navigate(`/${currentUser}/patients/info/` + appointment.ID);
			} else if (key === "edit") {
				navigate(`/${currentUser}/patients/edit/` + appointment.ID);
			} else if (key === "details") {
				navigate(`/${currentUser}/patients/details/` + appointment.ID);
			} else if (key === "archive") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Archive Patient",
					message: "Are you sure you want to archive this patient?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationArchive.mutate({ ID: appointment.ID, ROLE: "ARCHIVE" });
					},
				});
			} else if (key === "patient") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Unarchive Patient",
					message: "Are you sure you want to unarchive this patient?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationArchive.mutate({ ID: appointment.ID, ROLE: "PATIENT" });
					},
				});
			}
		};
		switch (columnKey) {
			case "FULLNAME":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "DIAGNOSIS":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "STATUS":
				if (cellValue === "Completed") {
					return (
						<div className="flex justify-center w-full">
							<Chip
								className="w-full max-w-full text-green-600 bg-green-200"
								classNames={{
									content: "font-semibold",
								}}
								color="success"
							>
								Completed
							</Chip>
						</div>
					);
				} else if (cellValue === "Pending") {
					return (
						<div className="flex justify-center w-full">
							<Chip
								className="w-full max-w-full text-primary bg-primary/20"
								classNames={{
									content: "font-semibold",
								}}
								color="primary"
							>
								Pending
							</Chip>
						</div>
					);
				} else if (cellValue === "Cancelled") {
					return (
						<div className="flex justify-center w-full">
							<Chip
								className="w-full max-w-full text-red-600 bg-red-200"
								classNames={{
									content: "font-semibold",
								}}
								color="danger"
							>
								Cancelled
							</Chip>
						</div>
					);
				}
				break;
			case "Last_Appointment":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "Next_Appointment":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "options":
				return (
					<div className="relative flex items-end justify-end gap-2">
						<Dropdown aria-label="dropdown-options">
							<DropdownTrigger aria-label="trigger-dropdown">
								<Button isIconOnly size="sm" variant="light">
									<EllipsisVertical className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu onAction={handleAction} aria-label="menu-dropdown">
								<DropdownItem key={"view"} aria-label="view">
									View
								</DropdownItem>
								<DropdownItem key={"edit"} aria-label="edit">
									Edit
								</DropdownItem>
								<DropdownItem key={"details"} aria-label="details">
									Details
								</DropdownItem>
								{type === "regular" && currentUser === "admin" && (
									<DropdownItem
										key={"archive"}
										className="text-warning"
										aria-label="archive"
										color="warning"
									>
										Archive
									</DropdownItem>
								)}
								{type === "archived" && (
									<DropdownItem
										key={"patient"}
										className="text-warning"
										aria-label="patient"
										color="warning"
									>
										Unarchive
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-center gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<Search />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, onClear]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="flex items-center justify-between px-2 py-2">
				<span className="w-[30%] text-small text-default-400">
					{/* {selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`} */}
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

	return (
		<Table
			aria-label="Patients Table"
			isHeaderSticky={false}
			bottomContentPlacement="outside"
			classNames={{
				wrapper: "w-full shadow-none",
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
			topContent={statusFilterProp === "search" ? topContent : null}
			bottomContent={bottomContent}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid !== "name" ? "center" : "start"}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No patients found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.ID}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
TablePatients.propTypes = {
	type: PropTypes.string,
	filterType: PropTypes.string,
	filterKeys: PropTypes.array,
	setTotalPatients: PropTypes.func,
};
