import React from "react";
const columns = [
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "ID", uid: "id", sortable: true },
	{ name: "EMAIL", uid: "email", sortable: true },
	{ name: "PHONE NUMBER", uid: "phone_number", sortable: true },
	{ name: "DATE ADDED", uid: "date_added", sortable: true },
	{ name: "", uid: "options", sortable: true },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const dentistsData = [
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

export { columns, dentistsData, statusOptions };
