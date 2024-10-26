import React from "react";
const columns = [
	{ name: "TIME", uid: "APPOINTMENT_TIME", sortable: true },
	{ name: "DATE", uid: "APPOINTMENT_DATE", sortable: true },
	{ name: "PATIENT NAME", uid: "FULLNAME", sortable: true },
	{ name: "PATIENT AGE", uid: "patient_age", sortable: true },
	{ name: "DENTIST", uid: "dentist", sortable: true },
	{ name: "STATUS", uid: "STATUS" },
	{ name: "OPTIONS", uid: "options" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];

const appointments = [
	{
		id: 1,
		time: "8:00 AM - 9:00 AM",
		date: "04/18/2024",
		patient_name: "John Doe",
		dentist: "Dr. Dwight",
	},
	{
		id: 2,
		time: "9:00 AM - 10:00 AM",
		date: "04/18/2024",
		patient_name: "Jane Smith",
		dentist: "Dr. Dwight",
	},
	{
		id: 3,
		time: "10:00 AM - 11:00 AM",
		date: "04/18/2024",
		patient_name: "Sam Brown",
		dentist: "Dr. Dwight",
	},
	{
		id: 4,
		time: "11:00 AM - 12:00 PM",
		date: "04/18/2024",
		patient_name: "Chris Evans",
		dentist: "Dr. Dwight",
	},
	{
		id: 5,
		time: "12:00 PM - 1:00 PM",
		date: "04/18/2024",
		patient_name: "Patricia Johnson",
		dentist: "Dr. Dwight",
	},
	{
		id: 6,
		time: "1:00 PM - 2:00 PM",
		date: "04/18/2024",
		patient_name: "Michael Clark",
		dentist: "Dr. Dwight",
	},
	{
		id: 7,
		time: "2:00 PM - 3:00 PM",
		date: "04/18/2024",
		patient_name: "Emily Davis",
		dentist: "Dr. Dwight",
	},
	{
		id: 8,
		time: "3:00 PM - 4:00 PM",
		date: "04/18/2024",
		patient_name: "Daniel Martinez",
		dentist: "Dr. Dwight",
	},
	{
		id: 9,
		time: "4:00 PM - 5:00 PM",
		date: "04/18/2024",
		patient_name: "Sophia Hernandez",
		dentist: "Dr. Dwight",
	},
	{
		id: 10,
		time: "5:00 PM - 6:00 PM",
		date: "04/18/2024",
		patient_name: "Mason Wilson",
		dentist: "Dr. Dwight",
	},
	{
		id: 11,
		time: "8:00 AM - 9:00 AM",
		date: "04/19/2024",
		patient_name: "Ava Lopez",
		dentist: "Dr. Dwight",
	},
	{
		id: 12,
		time: "9:00 AM - 10:00 AM",
		date: "04/19/2024",
		patient_name: "Liam Gonzalez",
		dentist: "Dr. Dwight",
	},
	{
		id: 13,
		time: "10:00 AM - 11:00 AM",
		date: "04/19/2024",
		patient_name: "Isabella Harris",
		dentist: "Dr. Dwight",
	},
	{
		id: 14,
		time: "11:00 AM - 12:00 PM",
		date: "04/19/2024",
		patient_name: "Ethan Clark",
		dentist: "Dr. Dwight",
	},
	{
		id: 15,
		time: "12:00 PM - 1:00 PM",
		date: "04/19/2024",
		patient_name: "Mia Lewis",
		dentist: "Dr. Dwight",
	},
	{
		id: 16,
		time: "1:00 PM - 2:00 PM",
		date: "04/19/2024",
		patient_name: "Alexander Robinson",
		dentist: "Dr. Dwight",
	},
	{
		id: 17,
		time: "2:00 PM - 3:00 PM",
		date: "04/19/2024",
		patient_name: "Charlotte Walker",
		dentist: "Dr. Dwight",
	},
	{
		id: 18,
		time: "3:00 PM - 4:00 PM",
		date: "04/19/2024",
		patient_name: "James Hall",
		dentist: "Dr. Dwight",
	},
	{
		id: 19,
		time: "4:00 PM - 5:00 PM",
		date: "04/19/2024",
		patient_name: "Amelia Young",
		dentist: "Dr. Dwight",
	},
	{
		id: 20,
		time: "5:00 PM - 6:00 PM",
		date: "04/19/2024",
		patient_name: "Lucas Allen",
		dentist: "Dr. Dwight",
	},
];

export { columns, appointments, statusOptions };
