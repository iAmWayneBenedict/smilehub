import React from "react";
const columns = [
	{ name: "DATE", uid: "DATETIME", sortable: true },
	{ name: "NAME", uid: "NAME", sortable: true },
	{ name: "GROUP", uid: "ITEM_GROUP", sortable: true },
	{ name: "ITEM", uid: "ITEM_NAME", sortable: true },
	{ name: "ACTION", uid: "ACTION", sortable: true },
	{ name: "FROM QTY", uid: "FROM_QTY" },
	{ name: "TO QTY", uid: "TO_QTY" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const itemsData = [
	{
		ID: 1,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Add Item",
		FROM: 1,
		TO: 1,
	},
	{
		ID: 2,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Stock In",
		FROM: 1,
		TO: 12,
	},
	{
		ID: 3,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Add Group",
		FROM: "",
		TO: "",
	},
	{
		ID: 4,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Stock Out",
		FROM: 12,
		TO: 10,
	},
	{
		ID: 5,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "DENT-001",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Delete Item",
		FROM: "",
		TO: "",
	},
	{
		ID: 6,
		DATE: "2021-09-01",
		NAME: "Test Admin",
		ITEM_NAME: "",
		GROUP_NAME: "Dental Care Equipment",
		ACTION: "Delete Group",
		FROM: "",
		TO: "",
	},
];

export { columns, itemsData, statusOptions };
