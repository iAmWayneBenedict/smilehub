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
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { cn, decrypt } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { useMemo } from "react";

//! change this based on the columns in the db
const INITIAL_VISIBLE_COLUMNS = ["NAME", "QUANTITY", "actions"];

export default function TableAppointments() {
	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "NAME", //! update this based on the column in the db
		direction: "ascending",
	});
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const navigate = useNavigate();
	const params = useParams();
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);

	const {
		setAddGroupItemModal,
		setAlertDialogDetails,
		setNewAppointmentModal,
		setNewScheduleModal,
	} = useAppStore();
	const { data, isSuccess, isLoading, refetch, isError } = useQuery({
		queryKey: ["group-items"],
		queryFn: InventoryAPIManager.getInventoryItems,
		retry: false,
	});

	const { data: groupsData, isSuccess: isSuccessGroupData } = useQuery({
		queryKey: ["groups"],
		queryFn: InventoryAPIManager.getInventoryGroups,
	});

	const groupDetailData = useMemo(() => {
		if (!isSuccessGroupData) return [];

		return groupsData.find((item) => item.NAME === params.group);
	}, [groupsData, params, isSuccessGroupData]);

	const deleteGroupMutation = useMutation({
		mutationFn: InventoryAPIManager.postDeleteGroup,
		onSuccess: () => {
			setAlertDialogDetails({
				type: "success",
				title: "Success!",
				message: "Deleted group successfully?",
				isOpen: true,

				confirmCallback: () => {
					navigate(`/${currentUser}/inventory/item-group`);
				},
			});
		},
		onError: (error) => {
			console.log(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});
	const deleteItemMutation = useMutation({
		mutationFn: InventoryAPIManager.postDeleteItem,
		onSuccess: () => {
			setAlertDialogDetails({
				type: "success",
				title: "Success!",
				message: "Deleted group successfully?",
				isOpen: true,

				confirmCallback: () => {
					refetch();
				},
			});
		},
		onError: (error) => {
			console.log(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	// checks if all items are selected
	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	// filters the itemsData based on the search value
	const filteredItems = React.useMemo(() => {
		if (isLoading || !isSuccess || !groupDetailData || isError) return [];
		const items = data.all_items.filter((item) => item.ITEM_GROUP === groupDetailData.NAME);
		let filteredItemsData = [...items];

		if (hasSearchFilter) {
			filteredItemsData = filteredItemsData.filter((item) => {
				return item.GROUP_NAME.toLowerCase().includes(filterValue?.toLowerCase());
			});
		}

		return filteredItemsData;
	}, [data, isSuccess, isLoading, filterValue, statusFilter, groupDetailData, isError]);

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
			case "NAME":
				return (
					<div className="flex flex-col">
						<p className="text-base capitalize text-bold">{cellValue}</p>
					</div>
				);
			case "QUANTITY":
				return (
					<div className="flex flex-col">
						<p className="text-base capitalize text-bold">{cellValue}</p>
					</div>
				);

			case "actions":
				return (
					<div className="relative flex items-center justify-start gap-1">
						<Button
							variant="light"
							className="text-base"
							size="sm"
							onClick={() => {
								navigate(
									`/${currentUser}/inventory/item-group/${item.ITEM_GROUP}/edit/${item.ID}`
								);
							}}
							isIconOnly
						>
							<Pencil size={20} />
						</Button>
						<Button
							variant="light"
							color="danger"
							className="text-base"
							isIconOnly
							size="sm"
							onClick={() => {
								setAlertDialogDetails({
									type: "danger",
									message: "Are you sure you want to delete this item?",
									isOpen: true,
									dialogType: "confirm",
									confirmCallback: () => {
										deleteItemMutation.mutate({
											ID: item.ID,
											EMPLOYEE_ID: user.id,
											NAME: user.fullname,
										});
									},
								});
							}}
						>
							<Trash size={20} />
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
								navigate(
									`/${currentUser}/inventory/item-group/${params.group}/add`
								);
							}}
							startContent={<Plus />}
						>
							Add new item
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">
						Total {filteredItems.length} item(s)
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

								confirmCallback: () => {
									deleteGroupMutation.mutate({
										ID: groupDetailData.ID,
										EMPLOYEE_ID: user.id,
										NAME: user.fullname,
									});
								},
							});
						}}
					>
						Delete Group
					</Button>
				</div>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter, groupDetailData]);

	// render the table
	return (
		<Table
			isHeaderSticky={false}
			bottomContentPlacement="outside"
			classNames={{
				th: "bg-primary text-white data-[hover=true]:text-gray-300",
				table: "min-w-[40rem]",
				wrapper:
					"min-h-96 bg-gray-50 custom-scrollbar-vertical p-0 shadow-none w-fit md:w-full overflow-x-scroll max-w-[89vw] sm:max-w-[96vw] lg:max-w-[80vw] 2xl:max-w-none",
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
						align={"start"}
						allowsSorting={column.sortable}
						className={cn(column.uid === "actions" ? "w-48" : "", "~text-sm/base")}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No items data found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.ID}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
