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
import { columns, itemsData } from "../data";
import { Search, Plus, Trash } from "lucide-react";
import { useAppStore } from "@/store/zustand";
import { cn } from "@/lib/utils";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = ["group_name", "no_of_items", "actions"];

export default function TableAppointments() {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "group_name", //! update this based on the column in the db
		direction: "ascending",
	});
	const {
		setAddGroupItemModal,
		setAlertDialogDetails,
		setNewAppointmentModal,
		setNewScheduleModal,
	} = useAppStore();

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	// checks if all items are selected
	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	// filters the itemsData based on the search value
	const filteredItems = React.useMemo(() => {
		let filteredItemsData = [...itemsData];

		if (hasSearchFilter) {
			filteredItemsData = filteredItemsData.filter((item) => {
				return item.group_name.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredItemsData;
	}, [itemsData, filterValue, statusFilter]);

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
	const renderCell = React.useCallback((item, columnKey) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case "group_name":
				return (
					<div className="flex flex-col">
						<p className="text-base capitalize text-bold">{cellValue}</p>
					</div>
				);
			case "no_of_items":
				return (
					<div className="flex flex-col">
						<p className="text-base capitalize text-bold">{cellValue}</p>
					</div>
				);

			case "actions":
				return (
					<div className="relative flex items-center justify-start gap-2">
						<Button
							variant="light"
							color="danger"
							className="data-[hover=true]:bg-transparent p-0 text-base"
							startContent={<Trash />}
							onClick={() => {
								setAlertDialogDetails({
									type: "danger",
									message: "Are you sure you want to delete this item?",
									isOpen: true,
									dialogType: "confirm",
								});
							}}
						>
							Remove from Group
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

	// table top content with search and new item button
	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
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
							onClick={() => {
								setAddGroupItemModal({
									isOpen: true,
									title: "Add Item",
								});
							}}
							startContent={<Plus />}
						>
							Add new item
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">
						Total {itemsData.length} itemsData
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
			<div className="flex flex-col">
				{/* <div className="flex items-center justify-between px-2 py-2">
					<span className="w-[30%] text-small text-default-400">
						{selectedKeys === "all"
							? "All items selected"
							: `${selectedKeys.size} of ${filteredItems.length} selected`}
					</span>

					<div className="hidden sm:flex w-[30%] justify-end gap-2">
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
				</div> */}
				<div>
					<Button
						className="text-base"
						variant="bordered"
						color="danger"
						radius="sm"
						startContent={<Trash />}
						onClick={() => {
							setAlertDialogDetails({
								type: "danger",
								message: "Are you sure you want to delete this group?",
								isOpen: true,
								dialogType: "confirm",
							});
						}}
					>
						Delete Group
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
			aria-label="Appointments Table"
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={"start"}
						allowsSorting={column.sortable}
						className={cn(column.uid === "actions" ? "w-48" : "", "~text-sm/base")}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No itemsData found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}