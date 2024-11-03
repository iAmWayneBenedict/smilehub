import { Tabs, Tab, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useState } from "react";
import TableAppointments from "./components/Table";

const InventoryLogs = () => {
	// controlled tabs
	const [selected, setSelected] = useState("inventory-logs");
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<h3 className="p-2 text-lg sm:p-5 font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/inventory-logs`}>
							Inventory Logs
						</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div>
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
						<Tab key="inventory-logs" title="INVENTORY LOGS">
							<TableAppointments />
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default InventoryLogs;
