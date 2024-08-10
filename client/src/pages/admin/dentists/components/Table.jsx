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
	Pagination,
	User,
	Image,
	Link,
} from "@nextui-org/react";
import { columns, dentistsData } from "../data";
import { Plus, UserRoundPlus } from "lucide-react";
import { useAppStore } from "@/store/zustand";
import RightArrow from "../../../../assets/icons/Right-2.svg";
import { useNavigate } from "react-router-dom";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = ["name", "id", "email", "phone_number", "date_added", "options"];

export default function TableDentists() {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const navigate = useNavigate();
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "name", //! update this based on the column in the db
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

	// filters the dentists based on the search value
	const filteredItems = React.useMemo(() => {
		let filteredDentist = [...dentistsData];
		if (hasSearchFilter) {
			filteredDentist = filteredDentist.filter((dentist) => {
				return dentist.name.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredDentist;
	}, [dentistsData, filterValue, statusFilter]);

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
	const renderCell = React.useCallback((dentist, columnKey) => {
		const cellValue = dentist[columnKey];

		switch (columnKey) {
			case "name":
				return (
					<div className="flex justify-start">
						<User
							name={cellValue}
							description={dentist.role}
							avatarProps={{
								src: dentist.image,
							}}
						/>
					</div>
				);
			case "id":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "email":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "phone_number":
				return (
					<div className="flex flex-col">
						<p className="capitalize text-bold text-small">{cellValue}</p>
					</div>
				);
			case "date_added":
				return (
					<div className="flex gap-3">
						<div>
							<p className="text-sm capitalize text-bold">{cellValue}</p>
							<p className="text-xs capitalize text-bold text-default-400">
								{dentist.time_added}
							</p>
						</div>
					</div>
				);
			case "options":
				return (
					<div className="flex w-12 gap-3">
						<div>
							<Button
								as={Link}
								href="/admin/profile"
								isIconOnly
								className="bg-[#FAFAFA]"
							>
								<Image
									src={RightArrow}
									alt="right-arrow"
									aria-label="right-arrow"
								/>
							</Button>
						</div>
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
					<h1 className="text-xl font-semibold">List of Dentists</h1>
					<div className="flex gap-3">
						<Button
							color="primary"
							onClick={() => navigate("/admin/dentists/registration")}
							startContent={<UserRoundPlus size={20} />}
						>
							Add new dentist
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">
						{dentistsData.length} available dentist(s)
					</span>
				</div>
			</div>
		);
	}, [visibleColumns, setNewAppointmentModal]);

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
						className={column.uid === "options" ? "w-5" : ""}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No dentists found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
