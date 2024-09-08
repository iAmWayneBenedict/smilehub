import { Breadcrumbs, BreadcrumbItem, Button, Tabs, Tab } from "@nextui-org/react";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Item = () => {
	// controlled tabs
	const [selected, setSelected] = useState("list-of-items");
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list`}>
							Item List
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list`}>
							Fluoride Varnish
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
											onClick={() => {}}
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
													<h4 className="~text-2xl/4xl font-bold">
														DENT-003
													</h4>
													<p className="~text-lg/xl font-medium">
														Item ID
													</p>
												</div>
												<div style={{ flex: 1 }} className="flex flex-col">
													<h4 className="~text-2xl/4xl font-bold">02</h4>
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
													<h4 className="~text-2xl/4xl font-bold">08</h4>
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
												Dental Cabinet B
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

export default Item;
