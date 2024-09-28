const columns = [
	{ name: "Item Name", uid: "NAME", sortable: true },
	{ name: "No. of Items", uid: "QUANTITY", sortable: true },
	{ name: "Actions", uid: "actions" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const itemsData = [
	{
		id: 1,
		item_name: "Dental Care Equipment",
		no_of_items: 15,
	},
	{
		id: 2,
		item_name: "Dental Care Product",
		no_of_items: 32,
	},
];

export { columns, itemsData, statusOptions };
