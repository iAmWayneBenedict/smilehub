import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import TableAppointments from "./components/Table";

const ItemGroup = () => {
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href="/admin/inventory">Inventory</BreadcrumbItem>
						<BreadcrumbItem href="/admin/patients/item-group">
							Item Group
						</BreadcrumbItem>
					</Breadcrumbs>
					<p className="mt-2 text-secondaryText">List of items groups.</p>
				</div>
				<div className="mt-10">
					<TableAppointments />
				</div>
			</div>
		</div>
	);
};

export default ItemGroup;
