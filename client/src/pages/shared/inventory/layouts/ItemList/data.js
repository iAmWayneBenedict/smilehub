import React from "react";
const columns = [
	{ name: "Item Name", uid: "item_name", sortable: true },
	{ name: "Item ID", uid: "item_id", sortable: true },
	{ name: "Group", uid: "group", sortable: true },
	{ name: "Stock in Qty", uid: "stock_in_qty", sortable: true },
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
		item_name: "Dental X-ray Film",
		item_id: "DENT-001",
		group: "Dental Care Equipment",
		stock_in_qty: 350,
	},
	{
		id: 2,
		item_name: "Dental Drill",
		item_id: "DENT-002",
		group: "Dental Care Equipment",
		stock_in_qty: 420,
	},
	{
		id: 3,
		item_name: "Tooth Extraction Forceps",
		item_id: "DENT-003",
		group: "Dental Care Equipment",
		stock_in_qty: 285,
	},
	{
		id: 4,
		item_name: "Dental Chair",
		item_id: "DENT-004",
		group: "Dental Care Equipment",
		stock_in_qty: 1200,
	},
	{
		id: 5,
		item_name: "Dental Mirror",
		item_id: "DENT-005",
		group: "Dental Care Equipment",
		stock_in_qty: 150,
	},
	{
		id: 6,
		item_name: "Dental Scaler",
		item_id: "DENT-006",
		group: "Dental Care Equipment",
		stock_in_qty: 230,
	},
	{
		id: 7,
		item_name: "Dental Impression Tray",
		item_id: "DENT-007",
		group: "Dental Care Equipment",
		stock_in_qty: 75,
	},
	{
		id: 8,
		item_name: "Curing Light",
		item_id: "DENT-008",
		group: "Dental Care Equipment",
		stock_in_qty: 450,
	},
	{
		id: 9,
		item_name: "Dental Handpiece",
		item_id: "DENT-009",
		group: "Dental Care Equipment",
		stock_in_qty: 380,
	},
	{
		id: 10,
		item_name: "Dental Prophy Angle",
		item_id: "DENT-010",
		group: "Dental Care Equipment",
		stock_in_qty: 160,
	},
	{
		id: 11,
		item_name: "Dental Suction Tube",
		item_id: "DENT-011",
		group: "Dental Care Equipment",
		stock_in_qty: 90,
	},
	{
		id: 12,
		item_name: "Dental Cement",
		item_id: "DENT-012",
		group: "Dental Care Equipment",
		stock_in_qty: 200,
	},
	{
		id: 13,
		item_name: "Dental Needle",
		item_id: "DENT-013",
		group: "Dental Care Equipment",
		stock_in_qty: 50,
	},
	{
		id: 14,
		item_name: "Dental Filling Material",
		item_id: "DENT-014",
		group: "Dental Care Equipment",
		stock_in_qty: 600,
	},
	{
		id: 15,
		item_name: "Dental Bib",
		item_id: "DENT-015",
		group: "Dental Care Equipment",
		stock_in_qty: 40,
	},
	{
		id: 16,
		item_name: "Dental Dam",
		item_id: "DENT-016",
		group: "Dental Care Equipment",
		stock_in_qty: 95,
	},
	{
		id: 17,
		item_name: "Dental Elevator",
		item_id: "DENT-017",
		group: "Dental Care Equipment",
		stock_in_qty: 300,
	},
	{
		id: 18,
		item_name: "Dental Syringe",
		item_id: "DENT-018",
		group: "Dental Care Equipment",
		stock_in_qty: 150,
	},
	{
		id: 19,
		item_name: "Dental Retractor",
		item_id: "DENT-019",
		group: "Dental Care Equipment",
		stock_in_qty: 180,
	},
	{
		id: 20,
		item_name: "Dental Articulator",
		item_id: "DENT-020",
		group: "Dental Care Equipment",
		stock_in_qty: 450,
	},
];

export { columns, itemsData, statusOptions };
