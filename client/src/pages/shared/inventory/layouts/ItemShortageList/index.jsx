import { Tabs, Tab, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useState } from "react";
import TableAppointments from "./components/Table";

const ItemListShortage = () => {
	// controlled tabs
	const [selected, setSelected] = useState("list-of-items");
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-list-shortage`}>
							Item Shortage List
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
						<Tab key="list-of-items" title="LIST OF ITEM">
							<TableAppointments />
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ItemListShortage;
