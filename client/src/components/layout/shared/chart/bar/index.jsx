import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import PropTypes from 'prop-types'
import { useMemo } from "react";

const defaultData = [
	{ month: "Jan", data: 0 },
	{ month: "Feb", data: 0 },
	{ month: "Mar", data: 0 },
	{ month: "Apr", data: 0 },
	{ month: "May", data: 0 },
	{ month: "Jun", data: 0 },
	{ month: "Jul", data: 0 },
	{ month: "Aug", data: 0 },
	{ month: "Sep", data: 0 },
	{ month: "Oct", data: 0 },
	{ month: "Nov", data: 0 },
	{ month: "Dec", data: 0 },
]

const chartConfig = {
	data: {
		label: "Visit",
		color: "hsl(var(--primary))",
	},
}

export function CustomVerticalBarChart({data, filterAs}) {
	const formattedData = useMemo(() => {
		if(!data) return defaultData
		if("labels" in data)
			return data.labels.map((month, index) => ({
				month,
				data: data.data[index]
			}));
		else
			return data.categories.map((month, index) => ({
				month,
				data: data.data[index]
			}));
	}, [data])
	console.log(filterAs)
	return (
		<Card className={"border-0 shadow-none"}>
			<CardHeader className={"p-0"}>
				{/*<CardTitle>Bar Chart - Label</CardTitle>*/}
				<CardDescription>
					{filterAs === "Monthly" ? "Total Monthly Visits" : " Total Yearly Visits"}
				</CardDescription>
			</CardHeader>
			<CardContent className={"p-0"}>
				<ChartContainer className={"h-80 w-full"} config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={formattedData}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="data" fill="var(--color-data)" radius={8}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm mt-10">
				{/*<div className="flex gap-2 font-medium leading-none">*/}
				{/*	Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
				{/*</div>*/}
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the {filterAs === "Monthly" ? "current year" : "previous years"}
				</div>
			</CardFooter>
		</Card>
	)
}
CustomVerticalBarChart.propTypes = {
	data: PropTypes.object,
	filterAs: PropTypes.any
}
