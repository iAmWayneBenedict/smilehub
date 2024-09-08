import TableEmployees from "./components/Table";

const Employees = () => {
	return (
		<div style={{ flex: 1 }} className="mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<TableEmployees />
			</div>
		</div>
	);
};

export default Employees;
