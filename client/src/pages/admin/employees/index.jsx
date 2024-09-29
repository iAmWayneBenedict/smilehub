import { Tabs, Tab } from "@nextui-org/tabs";
import TableEmployees from "./components/Table";
import { useState } from "react";

const Employees = () => {
	// controlled tabs
	const [selected, setSelected] = useState("employees");

	return (
		<div style={{ flex: 1 }} className="mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
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
					<Tab key="employees" title="EMPLOYEES">
						<TableEmployees type={"regular"} />
					</Tab>
					<Tab key="archived-employees" title="ARCHIVED EMPLOYEES">
						<TableEmployees type={"archived"} />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default Employees;
