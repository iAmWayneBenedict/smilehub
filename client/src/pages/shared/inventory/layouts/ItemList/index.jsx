import { Tabs, Tab, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useState } from "react";
import TableAppointments from "./components/Table";

const ItemList = () => {
	// controlled tabs
	const [selected, setSelected] = useState("list-of-items");
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href="/admin/inventory">Inventory</BreadcrumbItem>
						<BreadcrumbItem href="/admin/patients/item-list">Item List</BreadcrumbItem>
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

export default ItemList;
