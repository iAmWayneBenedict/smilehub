import React from "react";
const columns = [
	{ name: "NAME", uid: "FULLNAME", sortable: true },
	{ name: "DIAGNOSIS", uid: "DIAGNOSIS", sortable: true },
	{ name: "STATUS", uid: "STATUS", sortable: true },
	{ name: "ROLE", uid: "ROLE", sortable: true },
	{ name: "LAST APPOINTMENT", uid: "Last_Appointment", sortable: true },
	{ name: "NEXT APPOINTMENT", uid: "Next_Appointment", sortable: true },
	{ name: "OPTIONS", uid: "options" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const patients = [
	{
		id: 1,
		name: "Mary Joseph",
		diagnosis: "Teeth Whitening",
		status: "Successful",
		last_appointment: "20/10/2024",
		next_appointment: "",
	},
	{
		id: 2,
		name: "John Doe",
		diagnosis: "Root Canal",
		status: "On Progress",
		last_appointment: "15/07/2024",
		next_appointment: "22/08/2024",
	},
	{
		id: 3,
		name: "Alice Smith",
		diagnosis: "Dental Implants",
		status: "Canceled",
		last_appointment: "10/06/2024",
		next_appointment: "",
	},
	{
		id: 4,
		name: "Bob Brown",
		diagnosis: "Teeth Cleaning",
		status: "Successful",
		last_appointment: "02/05/2024",
		next_appointment: "",
	},
	{
		id: 5,
		name: "Charlie Johnson",
		diagnosis: "Braces",
		status: "On Progress",
		last_appointment: "01/08/2024",
		next_appointment: "01/09/2024",
	},
	{
		id: 6,
		name: "Diana White",
		diagnosis: "Crown Fitting",
		status: "Successful",
		last_appointment: "20/07/2024",
		next_appointment: "",
	},
	{
		id: 7,
		name: "Emily Davis",
		diagnosis: "Wisdom Teeth Removal",
		status: "Canceled",
		last_appointment: "25/04/2024",
		next_appointment: "",
	},
	{
		id: 8,
		name: "Frank Miller",
		diagnosis: "Teeth Whitening",
		status: "On Progress",
		last_appointment: "30/07/2024",
		next_appointment: "30/08/2024",
	},
	{
		id: 9,
		name: "Grace Wilson",
		diagnosis: "Cavity Filling",
		status: "Successful",
		last_appointment: "12/06/2024",
		next_appointment: "",
	},
	{
		id: 10,
		name: "Henry Thomas",
		diagnosis: "Teeth Whitening",
		status: "On Progress",
		last_appointment: "14/07/2024",
		next_appointment: "14/08/2024",
	},
	{
		id: 11,
		name: "Ivy Garcia",
		diagnosis: "Root Canal",
		status: "Canceled",
		last_appointment: "18/05/2024",
		next_appointment: "",
	},
	{
		id: 12,
		name: "Jack Martinez",
		diagnosis: "Dental Implants",
		status: "On Progress",
		last_appointment: "11/07/2024",
		next_appointment: "11/08/2024",
	},
	{
		id: 13,
		name: "Katherine Lee",
		diagnosis: "Teeth Cleaning",
		status: "Successful",
		last_appointment: "05/05/2024",
		next_appointment: "",
	},
	{
		id: 14,
		name: "Leo Perez",
		diagnosis: "Braces",
		status: "On Progress",
		last_appointment: "22/07/2024",
		next_appointment: "22/08/2024",
	},
	{
		id: 15,
		name: "Mona Clark",
		diagnosis: "Crown Fitting",
		status: "Canceled",
		last_appointment: "09/06/2024",
		next_appointment: "",
	},
	{
		id: 16,
		name: "Nancy Rodriguez",
		diagnosis: "Wisdom Teeth Removal",
		status: "Successful",
		last_appointment: "17/07/2024",
		next_appointment: "",
	},
	{
		id: 17,
		name: "Oliver Lewis",
		diagnosis: "Teeth Whitening",
		status: "On Progress",
		last_appointment: "21/07/2024",
		next_appointment: "21/08/2024",
	},
	{
		id: 18,
		name: "Patricia Walker",
		diagnosis: "Cavity Filling",
		status: "Canceled",
		last_appointment: "14/06/2024",
		next_appointment: "",
	},
	{
		id: 19,
		name: "Quincy Hall",
		diagnosis: "Teeth Whitening",
		status: "Successful",
		last_appointment: "01/06/2024",
		next_appointment: "",
	},
	{
		id: 20,
		name: "Rachel Young",
		diagnosis: "Root Canal",
		status: "On Progress",
		last_appointment: "20/07/2024",
		next_appointment: "20/08/2024",
	},
];

export { columns, patients, statusOptions };
