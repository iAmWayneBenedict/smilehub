import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query";
import AppontmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager.js";
import { useMemo } from "react";
const chartData = [
	{ status: "Completed", appointments: 0 },
	{ status: "Pending", appointments: 0 },
	{ status: "On-going", appointments: 0 },
	{ status: "Cancelled", appointments: 0 },
	{ status: "Archived", appointments: 0 },
]

const chartConfig = {
	appointments: {
		label: "Appointments: ",
		color: "hsl(var(--primary))",
	},
}

export default function CustomBarChart() {
	const { data:dataAppointments, refetch:refetchAppointments } = useQuery({
		queryKey: ["dashboardAppointments"],
		queryFn: AppontmentsAPIManager.getPatientAppointments,
		retry: false,
	});
	const chartRequestData = useMemo(() => {
		
		if(!dataAppointments) return chartData
		
		const completed = dataAppointments?.filter((item) => item.STATUS === "Completed");
		const pending = dataAppointments?.filter((item) => item.STATUS === "Pending");
		const ongoing = dataAppointments?.filter((item) => item.STATUS === "On-going");
		const cancelled = dataAppointments?.filter((item) => item.STATUS === "Cancelled");
		const archived = dataAppointments?.filter((item) => item.STATUS === "Archived");
		return [
			{ status: "Completed", appointments: completed?.length },
			{ status: "Pending", appointments: pending?.length },
			{ status: "On-going", appointments: ongoing?.length },
			{ status: "Cancelled", appointments: cancelled?.length },
			{ status: "Archived", appointments: archived?.length },
		];
	}, [dataAppointments]);
	return (
		<Card className={"border-none shadow-none p-0"}>
			<CardHeader className={"px-3 pt-3"}>
				<CardTitle>Appointment Statistics</CardTitle>
				<CardDescription>
					Total appointments and status
				</CardDescription>
			</CardHeader>
			<CardContent className={"px-3"}>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartRequestData}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						
						<YAxis
							dataKey="status"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis type="number" dataKey="appointments" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar dataKey="appointments" layout="vertical" fill="var(--color-appointments)" radius={5}>
							<LabelList
								dataKey="status"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
							/>
							<LabelList
								dataKey="appointments"
								position="insideRight"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm px-3 pb-0">
				<div className="flex gap-2 font-medium leading-none">
					Appointments information statistics <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total appointments per status
				</div>
			</CardFooter>
		</Card>
	)
}
