import React from "react";
const columns = [
	{ name: "NAME", uid: "NAME", sortable: true },
	{ name: "GROUP", uid: "GROUP_NAME", sortable: true },
	{ name: "ITEM", uid: "ITEM_NAME", sortable: true },
	{ name: "ACTION", uid: "ACTION", sortable: true },
	{ name: "FROM QTY", uid: "FROM" },
	{ name: "TO QTY", uid: "TO" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const itemsData = [
	{
		ID: 1,
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Add Item",
		FROM: 1,
		TO: 1,
	},
	{
		ID: 2,
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Stock In",
		FROM: 1,
		TO: 12,
	},
	{
		ID: 3,
		NAME: "Test Admin",
		ITEM_NAME: "",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Add Group",
		FROM: "",
		TO: "",
	},
	{
		ID: 4,
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Stock Out",
		FROM: 12,
		TO: 10,
	},
	{
		ID: 5,
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Delete Item",
		FROM: "",
		TO: "",
	},
	{
		ID: 6,
		NAME: "Test Admin",
		ITEM_NAME: "",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Delete Group",
		FROM: "",
		TO: "",
	},
];

export { columns, itemsData, statusOptions };
