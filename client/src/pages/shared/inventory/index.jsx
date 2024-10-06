import { Button, Image, Link } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import MedicalIcon from "@/components/icons/MedicalIcon";
import { ChevronsRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager";
import { useState } from "react";
import { useEffect } from "react";
import { FileClock } from "lucide-react";

const Inventory = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const [itemsInventory, setItemsInventory] = useState(null);
	const [groupInventory, setGroupInventory] = useState(null);
	const [shortageInventory, setShortageInventory] = useState(null);

	const getInventoryData = async () => {
		const inventory = await InventoryAPIManager.getInventoryItems();
		const group = await InventoryAPIManager.getInventoryGroups();

		return Promise.all([inventory, group]);
	};

	useEffect(() => {
		getInventoryData().then((data) => {
			setItemsInventory(data[0].all_items);
			setShortageInventory(data[0].items_shortage);
			setGroupInventory(data[1]);
		});
	}, []);

	return (
		<div style={{ flex: 1 }} className="">
			<div style={{ flex: 1 }} className="relative p-10 bg-white">
				<div className="w-full h-full p-5">
					<div className="flex items-center justify-between w-full">
						<div>
							<h3 className="text-lg font-bold uppercase text-darkText">Inventory</h3>
							<p className="text-lightText">List of items available.</p>
						</div>
						<div>
							<Button
								color="primary"
								startContent={<PlusIcon />}
								as={Link}
								href={`/${currentUser}/inventory/item-list/add`}
							>
								Add new item
							</Button>
						</div>
					</div>
					<div className="flex flex-row flex-wrap gap-5 mt-10">
						<div className="rounded-lg border-2 border-[#03A9F5] flex flex-col items-center w-72">
							<div className="flex flex-col items-center mt-5">
								<MedicalIcon color="#03A9F5" width={57} height={57} />
								<div className="flex flex-col items-center mt-2">
									<h3 className="text-3xl font-bold">
										{itemsInventory?.length || 0}
									</h3>
									<h6 className="text-lg font-semibold">Item List</h6>
								</div>
							</div>
							<div className="w-full bg-[#03A9F5]/30 flex flex-col items-center mt-5 border-t-2 border-[#03A9F5]">
								<Button
									as={Link}
									href={`/${currentUser}/inventory/item-list`}
									variant="flat"
									disableRipple
									className="bg-transparent"
									endContent={<ChevronsRight size={20} />}
								>
									View Full List
								</Button>
							</div>
						</div>
						<div className="rounded-lg border-2 border-[#01A768] flex flex-col items-center w-72">
							<div className="flex flex-col items-center mt-5">
								<MedicalIcon color="#01A768" width={57} height={57} />
								<div className="flex flex-col items-center mt-2">
									<h3 className="text-3xl font-bold">
										{groupInventory?.length || 0}
									</h3>
									<h6 className="text-lg font-semibold">Items Group</h6>
								</div>
							</div>
							<div className="w-full bg-[#01A768]/30 flex flex-col items-center mt-5 border-t-2 border-[#01A768]">
								<Button
									as={Link}
									href={`/${currentUser}/inventory/item-group`}
									variant="flat"
									disableRipple
									className="bg-transparent"
									endContent={<ChevronsRight size={20} />}
								>
									View Groups
								</Button>
							</div>
						</div>
						<div className="rounded-lg border-2 border-[#F0483E] flex flex-col items-center w-72">
							<div className="flex flex-col items-center mt-5">
								<MedicalIcon color="#F0483E" width={57} height={57} />
								<div className="flex flex-col items-center mt-2">
									<h3 className="text-3xl font-bold">
										{shortageInventory?.length || 0}
									</h3>
									<h6 className="text-lg font-semibold">Items Shortage</h6>
								</div>
							</div>
							<div className="w-full bg-[#F0483E]/30 flex flex-col items-center mt-5 border-t-2 border-[#F0483E]">
								<Button
									as={Link}
									variant="flat"
									disableRipple
									className="bg-transparent"
									href={`/${currentUser}/inventory/item-list-shortage`}
									endContent={<ChevronsRight size={20} />}
								>
									Resolve Now
								</Button>
							</div>
						</div>
						<div className="flex flex-col items-center border-2 border-orange-300 rounded-lg w-72">
							<div className="flex flex-col items-center justify-center h-full">
								<FileClock color="orange" width={57} height={57} />
								<div className="flex flex-col items-center mt-2">
									<h6 className="text-lg font-semibold">Inventory Logs</h6>
								</div>
							</div>
							<div className="flex flex-col items-center w-full mt-5 border-t-2 border-orange-300 bg-orange-500/30">
								<Button
									as={Link}
									variant="flat"
									disableRipple
									className="bg-transparent"
									href={`/${currentUser}/inventory/inventory-logs`}
									endContent={<ChevronsRight size={20} />}
								>
									View Logs
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Inventory;
