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
		patient_age: "25",
		dentist: "Dr. Dwight",
	},
	{
		id: 2,
		time: "9:00 AM - 10:00 AM",
		date: "04/18/2024",
		patient_name: "Jane Smith",
		patient_age: "30",
		dentist: "Dr. Dwight",
	},
	{
		id: 3,
		time: "10:00 AM - 11:00 AM",
		date: "04/18/2024",
		patient_name: "Sam Brown",
		patient_age: "35",
		dentist: "Dr. Dwight",
	},
	{
		id: 4,
		time: "11:00 AM - 12:00 PM",
		date: "04/18/2024",
		patient_name: "Chris Evans",
		patient_age: "40",
		dentist: "Dr. Dwight",
	},
	{
		id: 5,
		time: "12:00 PM - 1:00 PM",
		date: "04/18/2024",
		patient_name: "Patricia Johnson",
		patient_age: "45",
		dentist: "Dr. Dwight",
	},
	{
		id: 6,
		time: "1:00 PM - 2:00 PM",
		date: "04/18/2024",
		patient_name: "Michael Clark",
		patient_age: "50",
		dentist: "Dr. Dwight",
	},
	{
		id: 7,
		time: "2:00 PM - 3:00 PM",
		date: "04/18/2024",
		patient_name: "Emily Davis",
		patient_age: "55",
		dentist: "Dr. Dwight",
	},
	{
		id: 8,
		time: "3:00 PM - 4:00 PM",
		date: "04/18/2024",
		patient_name: "Daniel Martinez",
		patient_age: "60",
		dentist: "Dr. Dwight",
	},
	{
		id: 9,
		time: "4:00 PM - 5:00 PM",
		date: "04/18/2024",
		patient_name: "Sophia Hernandez",
		patient_age: "65",
		dentist: "Dr. Dwight",
	},
	{
		id: 10,
		time: "5:00 PM - 6:00 PM",
		date: "04/18/2024",
		patient_name: "Mason Wilson",
		patient_age: "70",
		dentist: "Dr. Dwight",
	},
	{
		id: 11,
		time: "8:00 AM - 9:00 AM",
		date: "04/19/2024",
		patient_name: "Ava Lopez",
		patient_age: "75",
		dentist: "Dr. Dwight",
	},
	{
		id: 12,
		time: "9:00 AM - 10:00 AM",
		date: "04/19/2024",
		patient_name: "Liam Gonzalez",
		patient_age: "80",
		dentist: "Dr. Dwight",
	},
	{
		id: 13,
		time: "10:00 AM - 11:00 AM",
		date: "04/19/2024",
		patient_name: "Isabella Harris",
		patient_age: "85",
		dentist: "Dr. Dwight",
	},
	{
		id: 14,
		time: "11:00 AM - 12:00 PM",
		date: "04/19/2024",
		patient_name: "Ethan Clark",
		patient_age: "90",
		dentist: "Dr. Dwight",
	},
	{
		id: 15,
		time: "12:00 PM - 1:00 PM",
		date: "04/19/2024",
		patient_name: "Mia Lewis",
		patient_age: "95",
		dentist: "Dr. Dwight",
	},
	{
		id: 16,
		time: "1:00 PM - 2:00 PM",
		date: "04/19/2024",
		patient_name: "Alexander Robinson",
		patient_age: "100",
		dentist: "Dr. Dwight",
	},
	{
		id: 17,
		time: "2:00 PM - 3:00 PM",
		date: "04/19/2024",
		patient_name: "Charlotte Walker",
		patient_age: "105",
		dentist: "Dr. Dwight",
	},
	{
		id: 18,
		time: "3:00 PM - 4:00 PM",
		date: "04/19/2024",
		patient_name: "James Hall",
		patient_age: "110",
		dentist: "Dr. Dwight",
	},
	{
		id: 19,
		time: "4:00 PM - 5:00 PM",
		date: "04/19/2024",
		patient_name: "Amelia Young",
		patient_age: "115",
		dentist: "Dr. Dwight",
	},
	{
		id: 20,
		time: "5:00 PM - 6:00 PM",
		date: "04/19/2024",
		patient_name: "Lucas Allen",
		patient_age: "120",
		dentist: "Dr. Dwight",
	},
];

export { columns, appointments, statusOptions };