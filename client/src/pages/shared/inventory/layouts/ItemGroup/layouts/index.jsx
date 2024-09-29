import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import TableAppointments from "./components/Table";
import AddGroupItem from "@/components/layout/Modals/AddGroupItem";
import { useLocation, useParams } from "react-router-dom";

const ItemGroupProduct = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const params = useParams()
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
						<BreadcrumbItem href={`/${currentUser}/inventory/item-group`}>
							{params.group}
						</BreadcrumbItem>
					</Breadcrumbs>
					<p className="mt-2 text-secondaryText">Detailed view of an item group.</p>
				</div>
				<div className="mt-10">
					<TableAppointments />
				</div>
			</div>
			<AddGroupItem />
		</div>
	);
};

export default ItemGroupProduct;
