import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import TableAppointments from "./components/Table";
import AddGroup from "@/components/layout/Modals/AddGroup";

const ItemGroup = () => {
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div className="p-5 font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/inventory`}>
							Inventory
						</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/inventory/item-group`}>
							Item Group
						</BreadcrumbItem>
					</Breadcrumbs>
					<p className="mt-2 text-secondaryText">List of items groups.</p>
				</div>
				<div className="mt-10">
					<TableAppointments />
				</div>
				<AddGroup />
			</div>
		</div>
	);
};

export default ItemGroup;
