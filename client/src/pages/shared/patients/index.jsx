import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Link,
	Tabs,
	Tab,
} from "@nextui-org/react";
import { Plus, Search, Filter } from "lucide-react";
import TablePatients from "./components/Table";
import { useState } from "react";
import { patientStatus, purpose } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const Patients = () => {
	const [filterType, setFilterType] = useState("all");
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
	const [filterKeys, setFilterKeys] = useState(new Set(["text"]));

	// controlled tabs
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const [totalPatients, setTotalPatients] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [selected, setSelected] = useState(searchParams.get("type") || "patients");

	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9] h-[calc(100vh-5.3rem)]">
			<div className="w-full h-full p-5">
				{/*<h3 className="text-lg font-darkText">Patient Info</h3>*/}
				<div className="flex flex-col gap-3">
					<div
						style={{ flex: 1 }}
						className="flex flex-col items-start justify-between p-4 mt-5 bg-white rounded-lg shadow-md sm:items-center sm:flex-row"
					>
						<h3 className="text-2xl font-medium" style={{ flex: 1 }}>
							Total Patients <span className="text-lightText">({totalPatients})</span>
						</h3>
						<div className="flex gap-2">
							<Button
								isIconOnly
								variant="bordered"
								as={Link}
								href={`/${currentUser}/patients/add`}
								size="md"
							>
								<Plus />
							</Button>
							<Button
								onClick={() =>
									setFilterType((prev) => (prev === "all" ? "search" : "all"))
								}
								isIconOnly
								variant="bordered"
								size="md"
							>
								<Search />
							</Button>
							<Dropdown closeOnSelect={false}>
								<DropdownTrigger>
									<Button isIconOnly variant="bordered" size="md">
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
						</div>
					</div>
					<div className="p-4 mt-5 bg-white rounded-lg shadow-md ">
						<Tabs
							selectedKey={selected}
							onSelectionChange={(e) => {
								setSelected(e);
								setSearchParams({ type: e });
							}}
							variant={"underlined"}
							aria-label="Tabs variants"
							color="primary"
							classNames={{
								tabContent:
									"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold",
							}}
						>
							<Tab key="patients" title="PATIENTS">
								<TablePatients
									type={"regular"}
									filterType={filterType}
									filterKeys={[...filterKeys]}
									setTotalPatients={setTotalPatients}
								/>
							</Tab>
							{currentUser === "admin" && (
								<Tab key="archived-patients" title="ARCHIVED PATIENTS">
									<TablePatients
										type={"archived"}
										filterType={filterType}
										filterKeys={[...filterKeys]}
										setTotalPatients={setTotalPatients}
									/>
								</Tab>
							)}
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Patients;
