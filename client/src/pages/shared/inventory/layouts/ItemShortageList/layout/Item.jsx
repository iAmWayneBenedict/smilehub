import { decrypt } from "@/lib/utils";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { Breadcrumbs, BreadcrumbItem, Button, Tabs, Tab } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ItemShortage = () => {
	// controlled tabs
	const [selected, setSelected] = useState("list-of-items");
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const [data, setData] = useState({});
	const { setAlertDialogDetails } = useAppStore();
	const params = useParams();
	const navigate = useNavigate();
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);

	const getMutation = useMutation({
		mutationFn: InventoryAPIManager.getInventoryItem,
		onSuccess: (data) => {
			setData(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: InventoryAPIManager.postDeleteItem,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				title: "Success",
				message: "Item deleted successfully",
				type: "success",
				confirmCallback: () => {
					navigate(`/${currentUser}/inventory/item-list-shortage`);
				},
			});
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				title: "Error",
				message: error?.message || "An error occurred",
				type: "danger",
			});
		},
	});

	useEffect(() => {
		getMutation.mutate({
			ID: params.item,
		});
	}, []);
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list-shortage`}>
							Item List Shortage
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list-shortage`}>
							{data?.NAME}
						</BreadcrumbItem>
					</Breadcrumbs>
				</div>
				<div className="mt-7">
					<Tabs
						selectedKey={selected}
						onSelectionChange={setSelected}
						variant={"underlined"}
						aria-label="Tabs variants"
						color="primary"
						classNames={{
							tabContent:
								"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold",
						}}
					>
						<Tab key="list-of-items" title="LIST OF ITEM">
							<div>
								<div className="flex items-end justify-start gap-3">
									<div className="flex gap-3">
										<Button
											aria-label="New Appointment"
											color="primary"
											onClick={() => {
												navigate(
													`/${currentUser}/inventory/item-list-shortage/edit/${params.item}`
												);
											}}
											startContent={<Pencil size={20} />}
										>
											Edit Details
										</Button>
									</div>
								</div>
								<div className="flex flex-col w-full gap-10 mt-10">
									<div className="flex flex-row gap-10">
										<div
											style={{ flex: 1 }}
											className="flex flex-col border-2 rounded-md border-[#bcbec1]"
										>
											<div className="border-b-1 border-[#bcbec1] px-6 py-3 ~text-lg/xl font-bold">
												Item
											</div>
											<div className="flex flex-row p-6">
												<div style={{ flex: 1 }} className="flex flex-col">
													<h4 className="~text-lg/3xl font-bold">
														{data?.ID}
													</h4>
													<p className="~text-lg/xl font-medium">
														Item ID
													</p>
												</div>
												<div style={{ flex: 3 }} className="flex flex-col">
													<h4 className="~text-lg/3xl font-bold">
														{data?.ITEM_GROUP}
													</h4>
													<p className="~text-lg/xl font-medium">
														Item Group
													</p>
												</div>
											</div>
										</div>

										<div
											style={{ flex: 1 }}
											className="flex flex-col border-2 rounded-md border-[#bcbec1]"
										>
											<div className="border-b-1 border-[#bcbec1] px-6 py-3 ~text-lg/xl font-bold">
												Inventory in Qty
											</div>
											<div className="flex flex-row p-6">
												<div style={{ flex: 1 }} className="flex flex-col">
													<h4 className="~text-lg/3xl font-bold">
														{data?.QUANTITY}
													</h4>
													<p className="~text-lg/xl font-medium">
														Stocks Left
													</p>
												</div>
											</div>
										</div>
									</div>
									<div
										style={{ flex: 1 }}
										className="flex flex-col border-2 rounded-md border-[#bcbec1]"
									>
										<div className="border-b-1 border-[#bcbec1] px-6 py-3 ~text-lg/xl font-bold">
											Location
										</div>
										<div className="flex flex-row p-6">
											<p className="~text-lg/xl font-medium">
												{data.LOCATION}
											</p>
										</div>
									</div>
								</div>
								<div>
									<Button
										variant="bordered"
										color="danger"
										radius="sm"
										className="mt-10 text-base"
										startContent={<Trash />}
										onClick={() => {
											setAlertDialogDetails({
												isOpen: true,
												title: "Delete Item",
												message:
													"Are you sure you want to delete this item?",
												type: "danger",
												dialogType: "confirm",
												confirmCallback: () => {
													deleteMutation.mutate({
														ID: data.ID,
														EMPLOYEE_ID: user.id,
														NAME: user.fullname,
													});
												},
											});
										}}
									>
										Delete Item
									</Button>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ItemShortage;
