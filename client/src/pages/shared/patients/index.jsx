import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Link,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { Plus, Search, Filter, CircleHelp } from "lucide-react";
import TablePatients from "./components/Table";
import { useState } from "react";
import { patientStatus, purpose } from "@/lib/utils";
import { useEffect } from "react";

const Patients = () => {
	const [filterType, setFilterType] = useState("all");
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
	const [filterKeys, setFilterKeys] = useState(new Set(["text"]));
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
							<Dropdown closeOnSelect={false}>
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
									<DropdownItem
										key="diagnosis"
										textValue="diagnosis"
										hideSelectedIcon
									>
										<Dropdown closeOnSelect={false}>
											<DropdownTrigger>Diagnosis</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												selectionMode="multiple"
												selectedKeys={filterKeys}
												onSelectionChange={(keys) => {
													setFilterType("diagnosis");
													setFilterKeys(keys);
												}}
											>
												{purpose.map((item) => (
													<DropdownItem textValue={item} key={item}>
														{item}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</DropdownItem>
									<DropdownItem key="status" textValue="status" hideSelectedIcon>
										<Dropdown closeOnSelect={false}>
											<DropdownTrigger>Status</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												selectionMode="multiple"
												selectedKeys={filterKeys}
												onSelectionChange={(keys) => {
													setFilterType("status");
													setFilterKeys(keys);
												}}
											>
												{patientStatus.map((item) => (
													<DropdownItem textValue={item} key={item}>
														{item}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button isIconOnly variant="bordered" size="lg">
								<CircleHelp />
							</Button>
						</div>
					</div>
					<div className="p-4 mt-5 bg-white rounded-lg shadow-md ">
						<TablePatients filterType={filterType} filterKeys={[...filterKeys]} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Patients;
