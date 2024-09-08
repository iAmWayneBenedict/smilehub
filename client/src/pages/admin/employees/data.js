import React from "react";
const columns = [
	{ name: "NAME", uid: "FULLNAME", sortable: true },
	{ name: "ID", uid: "ID", sortable: true },
	{ name: "EMAIL", uid: "EMAIL", sortable: true },
	{ name: "GENDER", uid: "GENDER", sortable: true },
	{ name: "ROLE", uid: "ROLE", sortable: true },
	{ name: "DATE ADDED", uid: "DATETIME", sortable: true },
	{ name: "", uid: "options", sortable: true },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const employeeData = [
	{
		id: 87364569,
		name: "John Doe",
		image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
		role: "Dentist",
		email: "doe.john@gmail.com",
		phone_number: "09123456789",
		date_added: "04/18/2024",
		time_added: "10:40 AM",
	},
	{
		id: 51348679,
		name: "Nalyn Bagono",
		image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
		role: "Dentist",
		email: "bagono.nalyn@gmail.com",
		phone_number: "09123456789",
		date_added: "04/18/2024",
		time_added: "6:00 PM",
	},
];

export { columns, employeeData, statusOptions };
