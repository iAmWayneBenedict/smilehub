import { Button, Image, Link } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import MedicalIcon from "@/components/icons/MedicalIcon";
import { ChevronsRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const Inventory = () => {
	const location = useLocation();
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
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
							<Button color="primary" startContent={<PlusIcon />}>
								Add new item
							</Button>
						</div>
					</div>
					<div className="flex flex-row flex-wrap gap-5 mt-10">
						<div className="rounded-lg border-2 border-[#03A9F5] flex flex-col items-center w-72">
							<div className="flex flex-col items-center mt-5">
								<MedicalIcon color="#03A9F5" width={57} height={57} />
								<div className="flex flex-col items-center mt-2">
									<h3 className="text-3xl font-bold">298</h3>
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
									<h3 className="text-3xl font-bold">02</h3>
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
									<h3 className="text-3xl font-bold">01</h3>
									<h6 className="text-lg font-semibold">Items Shortage</h6>
								</div>
							</div>
							<div className="w-full bg-[#F0483E]/30 flex flex-col items-center mt-5 border-t-2 border-[#F0483E]">
								<Button
									variant="flat"
									disableRipple
									className="bg-transparent"
									endContent={<ChevronsRight size={20} />}
								>
									Resolve Now
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