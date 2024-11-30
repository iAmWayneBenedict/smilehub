import Card from "./Card";
import { Users, CalendarRange,ClipboardCheck,SquareSlash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AppontmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager.js";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager.js";
import TasksAPIManager from "@/services/api/managers/task/TasksAPIManager.js";
import InventoryAPIManager from "@/services/api/managers/inventory/InventoryAPIManager.js";

const sampleData = [
	{
		title: "Total Appointments",
		value: "0",
		icon: <CalendarRange className={ "w-8 h-8 text-primary" }/>,
		bg: "bg-primary/15",
		// color: "text-primary"
		color: "text-gray-700"
	},
	{
		title: "Total Employees",
		value: "0",
		icon: <Users className={ "w-8 h-8 text-green-600" }/>,
		bg: "bg-green-100",
		// color: "text-green-500"
		color: "text-gray-700"
	},
	{
		title: "Tasks",
		value: "0",
		icon: <ClipboardCheck className={ "w-8 h-8 text-yellow-500" }/>,
		bg: "bg-yellow-100",
		// color: "text-yellow-500"
		color: "text-gray-700"
	},
	{
		title: "Item Shortages",
		value: "0",
		icon: <SquareSlash className={ "w-8 h-8 text-red-600" }/>,
		bg: "bg-red-100",
		// color: "text-red-500"
		color: "text-gray-700"
	}
]

const CardsContainer = () => {
	const { data:dataAppointments, refetch:refetchAppointments } = useQuery({
		queryKey: ["dashboardAppointments"],
		queryFn: AppontmentsAPIManager.getPatientAppointments,
		retry: false,
	});
	const { data: dataEmployees, refetch:refetchEmployees } = useQuery({
		queryKey: ["all-employees"],
		queryFn: EmployeesAPIManager.getAllEmployee,
	});
	const { data:dataTasks, refetch: refetchTasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => TasksAPIManager.getTasks(),
		retry: false,
	});const { data:dataShortages, refetch: refetchShortages } = useQuery({
		queryKey: ["inventory-items"],
		queryFn: () => InventoryAPIManager.getInventoryItems(),
		retry: false,
	});
	return (
		<div className={ "flex flex-col gap-5 mt-5 w-full xl:flex-row" }>
			<div className={ "flex flex-col sm:flex-row gap-5 w-full" }>
				<Card
					title={ sampleData[0].title }
					value={ dataAppointments?.length || sampleData[0].value }
					icon={ sampleData[0].icon }
					bg={ sampleData[0].bg }
					color={ sampleData[0].color }
				/>
				<Card
					title={ sampleData[1].title }
					value={ dataEmployees?.length || sampleData[1].value }
					icon={ sampleData[1].icon }
					bg={ sampleData[1].bg }
					color={ sampleData[1].color }
				/>
			</div>
			<div className={ "flex flex-col sm:flex-row gap-5 w-full" }>
				<Card
					title={ sampleData[2].title }
					value={ dataTasks?.length || sampleData[2].value }
					icon={ sampleData[2].icon }
					bg={ sampleData[2].bg }
					color={ sampleData[2].color }
				/>
				<Card
					title={ sampleData[3].title }
					value={ dataShortages?.items_shortage?.length || sampleData[3].value }
					icon={ sampleData[3].icon }
					bg={ sampleData[3].bg }
					color={ sampleData[3].color }
				/>
			</div>
			</div>
			);
			};

			export default CardsContainer;