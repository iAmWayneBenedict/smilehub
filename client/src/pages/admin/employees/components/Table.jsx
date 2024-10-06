/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Pagination,
	User,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Checkbox,
	Select,
	SelectItem,
	Switch,
} from "@nextui-org/react";
import { columns, employeeData } from "../data";
import { EllipsisVertical, Plus, UserRoundPlus } from "lucide-react";
import { useAppStore } from "@/store/zustand";
import RightArrow from "../../../../assets/icons/Right-2.svg";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager.js";
import { extractDateTime, getDateTime } from "@/pages/shared/dashboard/utils.js";
import { employeeRoles } from "@/services/api/utils.js";
import PropTypes from "prop-types";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = [
	"FULLNAME",
	"ID",
	"EMAIL",
	"GENDER",
	"ROLE",
	"DATETIME",
	"options",
];

export default function TableEmployees({ type }) {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [isViewArchive, setIsViewArchive] = React.useState(false);
	const navigate = useNavigate();
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "FULLNAME", //! update this based on the column in the db
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

	const { data, isSuccess, refetch } = useQuery({
		queryKey: ["all-employees"],
		queryFn: EmployeesAPIManager.getAllEmployee,
	});

	const mutationStatus = useMutation({
		mutationFn: EmployeesAPIManager.postChangeEmployeeStatus,
		onSuccess: () => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Employee status updated successfully",
			});
			refetch();
		},
		onError: (error) => {
			console.error(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: "An error occurred while archiving the employee",
			});
		},
	});

	// filters the employee based on the search value
	const filteredItems = React.useMemo(() => {
		if (!isSuccess) return [];
		let filteredEmployee = [];
		if (type === "archived") {
			filteredEmployee = data.filter((employee) => employee.STATUS === "ARCHIVE");
		} else {
			filteredEmployee = data.filter((employee) => employee.STATUS !== "ARCHIVE");
		}
		if (hasSearchFilter && statusFilter === "all") {
			filteredEmployee = filteredEmployee.filter((employee) => {
				return employee.name?.toLowerCase()?.includes(filterValue?.toLowerCase());
			});
		} else if (statusFilter === "role") {
			const selectedValues = [...filterValue];
			if (!selectedValues.length) return filteredEmployee;
			filteredEmployee = filteredEmployee.filter((employee) => {
				return selectedValues.includes(employee.ROLE);
			});
		}
		return filteredEmployee;
	}, [data, filterValue, statusFilter]);

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
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	// renders the cell based on the column
	const renderCell = React.useCallback((employee, columnKey) => {
		const cellValue = employee[columnKey];
		const handleAction = (key) => {
			if (key === "view") {
				navigate(`/${currentUser}/employees/profile/` + employee?.ID);
			}
			if (key === "archive") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Archive Employee",
					message: "Are you sure you want to archive this employee?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationStatus.mutate({ ID: employee.ID, STATUS: "ARCHIVE" });
					},
				});
			}
			if (key === "activate") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Activate Employee",
					message: "Are you sure you want to activate this employee?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationStatus.mutate({ ID: employee.ID, STATUS: "ACTIVE" });
					},
				});
			}
			if (key === "admin") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Archive Employee",
					message: "Are you sure you want to change the status of this employee?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationStatus.mutate({ ID: employee.ID, STATUS: "ADMIN" });
					},
				});
			}
			if (key === "staff") {
				setAlertDialogDetails({
					isOpen: true,
					type: "warning",
					title: "Archive Employee",
					message: "Are you sure you want to change the status of this employee?",
					dialogType: "confirm",
					confirmCallback: () => {
						mutationStatus.mutate({ ID: employee.ID, STATUS: "STAFF" });
					},
				});
			}
		};
		switch (columnKey) {
			case "FULLNAME":
				return (
					<div className="flex justify-start">
						<User
							name={cellValue}
							description={employee.role}
							avatarProps={{
								src: employee.image,
							}}
						/>
					</div>
				);
			case "ID":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "EMAIL":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-small">{cellValue}</p>
					</div>
				);
			case "GENDER":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "ROLE":
				return (
					<div className="flex gap-3">
						<div>
							<p className="text-sm capitalize text-bold">{cellValue}</p>
						</div>
					</div>
				);
			case "DATETIME":
				const { dateObject, timeObject } = extractDateTime(cellValue);
				return (
					<div className="flex gap-3">
						<div>
							<p className="text-sm capitalize text-bold">{dateObject.dateString}</p>
							<p className="text-xs capitalize text-bold text-default-400">
								{timeObject.timeString}
							</p>
						</div>
					</div>
				);
			case "options":
				return (
					<div className="flex w-12 gap-3">
						<Dropdown aria-label="dropdown-options">
							<DropdownTrigger aria-label="trigger-dropdown">
								<Button isIconOnly size="sm" variant="light">
									<EllipsisVertical className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu onAction={handleAction} aria-label="menu-dropdown">
								<DropdownItem key={"view"} aria-label="view">
									Profile
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
								{type === "archived" && currentUser === "admin" && (
									<DropdownItem
										key={"activate"}
										className="text-warning"
										aria-label="archive"
										color="warning"
									>
										Activate
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
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between gap-3">
					<h1 className="text-xl font-semibold">List of Employees</h1>
					{currentUser === "admin" && (
						<div className="flex gap-3">
							<Button
								color="primary"
								onClick={() => navigate(`/${currentUser}/employees/registration`)}
								startContent={<UserRoundPlus size={20} />}
							>
								Add new employee
							</Button>
						</div>
					)}
				</div>
				<div className="flex items-center justify-between mt-3">
					<span className="text-default-400 text-small" style={{ flex: 1 }}>
						{filteredItems?.length || 0} available employee(s)
					</span>
					<div className="flex justify-end gap-4" style={{ flex: 1 }}>
						<div className="flex flex-col w-full max-w-xs gap-2">
							<Select
								label="Filter by role"
								size="sm"
								selectedKeys={filterValue}
								className="max-w-xs"
								selectionMode="multiple"
								onSelectionChange={(e) => {
									setFilterValue(e);
									setStatusFilter("role");
								}}
							>
								{employeeRoles.map((employee) => (
									<SelectItem key={employee.name}>{employee.name}</SelectItem>
								))}
							</Select>
						</div>
					</div>
				</div>
			</div>
		);
	}, [visibleColumns, setNewAppointmentModal, data, filteredItems]);

	// table bottom content with pagination
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

	// render the table
	return (
		<Table
			aria-label="Employees table"
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
			topContent={topContent}
			bottomContent={bottomContent}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
						className={column.uid === "options" ? "w-5" : ""}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No Employees found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.ID}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
TableEmployees.propTypes = {
	type: PropTypes.string,
};
