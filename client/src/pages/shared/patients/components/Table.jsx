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

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"diagnosis",
	"status",
	"last_appointment",
	"next_appointment",
	"options",
];

export default function TablePatients({ filterType }) {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const navigate = useNavigate();
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "name",
		direction: "ascending",
	});
	const { setAlertDialogDetails, setNewAppointmentModal } = useAppStore();

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredPatients = [...patients];

		if (hasSearchFilter) {
			filteredPatients = filteredPatients.filter((patient) => {
				return patient.name.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredPatients;
	}, [patients, filterValue, statusFilter]);

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
				navigate("/admin/patients/info");
			}
		};
		switch (columnKey) {
			case "name":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "diagnosis":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "status":
				if (cellValue === "Successful") {
					return (
						<div className="flex justify-center w-full">
							<Chip
								className="w-full max-w-full text-green-600 bg-green-200"
								classNames={{
									content: "font-semibold",
								}}
								color="success"
							>
								Successful
							</Chip>
						</div>
					);
				} else if (cellValue === "On Progress") {
					return (
						<div className="flex justify-center w-full">
							<Chip
								className="w-full max-w-full text-primary bg-primary/20"
								classNames={{
									content: "font-semibold",
								}}
								color="primary"
							>
								On Progress
							</Chip>
						</div>
					);
				} else
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
			case "last_appointment":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "next_appointment":
				return (
					<div className="flex justify-center w-full">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "options":
				return (
					<div className="relative flex items-end justify-end gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="light">
									<EllipsisVertical className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu onAction={handleAction}>
								<DropdownItem key={"view"}>View</DropdownItem>
								<DropdownItem key={"edit"}>Edit</DropdownItem>
								<DropdownItem key={"delete"} className="text-danger" color="danger">
									Delete
								</DropdownItem>
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
			topContent={filterType === "search" ? topContent : null}
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
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
TablePatients.propTypes = {
	filterType: PropTypes.string,
};
