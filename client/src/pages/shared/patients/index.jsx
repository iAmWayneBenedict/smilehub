import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Link,
} from "@nextui-org/react";
import { Plus, Search, Filter, CircleHelp } from "lucide-react";
import TablePatients from "./components/Table";
import { useState } from "react";

const Patients = () => {
	const [filterType, setFilterType] = useState("all");
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full p-5">
				<h3 className="text-lg font-darkText">Patient Info</h3>
				<div className="flex flex-col gap-3">
					<div
						style={{ flex: 1 }}
						className="flex items-center justify-between p-4 mt-5 bg-white rounded-lg shadow-md"
					>
						<h3 className="text-2xl font-medium" style={{ flex: 1 }}>
							Total Patients <span className="text-lightText">(197)</span>
						</h3>
						<div className="flex gap-2">
							<Button
								isIconOnly
								variant="bordered"
								as={Link}
								href="/admin/patients/add"
								size="lg"
							>
								<Plus />
							</Button>
							<Button
								onClick={() =>
									setFilterType((prev) => (prev === "all" ? "search" : "all"))
								}
								isIconOnly
								variant="bordered"
								size="lg"
							>
								<Search />
							</Button>
							<Dropdown>
								<DropdownTrigger>
									<Button isIconOnly variant="bordered" size="lg">
										<Filter />
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label="Single selection example"
									variant="flat"
									disallowEmptySelection
									selectionMode="single"
									selectedKeys={selectedKeys}
									onSelectionChange={setSelectedKeys}
								>
									<DropdownItem key="diagnosis">Diagnosis</DropdownItem>
									<DropdownItem key="status">Status</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button isIconOnly variant="bordered" size="lg">
								<CircleHelp />
							</Button>
						</div>
					</div>
					<div className="p-4 mt-5 bg-white rounded-lg shadow-md ">
						<TablePatients filterType={filterType} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Patients;
