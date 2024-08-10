import TableDentists from "./components/Table";

const Dentists = () => {
	return (
		<div style={{ flex: 1 }} className="mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<TableDentists />
			</div>
		</div>
	);
};

export default Dentists;
