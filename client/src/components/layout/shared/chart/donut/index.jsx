import { useEffect } from "react";
import ApexCharts from "apexcharts";

const DonutChart = () => {
	const data = [44, 55];
	const labels = ["Male", "Female"]; //* labels for the chart
	const colors = ["#eb5757", "#2f80ed"]; //* colors for the chart
	var options = {
		series: data,
		chart: {
			type: "donut",
			height: 250,
		},
		labels,
		colors,
		legend: false,
		dataLabels: {
			enabled: false,
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					legend: {
						show: false,
					},
				},
			},
		],
	};

	useEffect(() => {
		var chart = new ApexCharts(document.querySelector("#donut-chart"), options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, []);
	return (
		<div className="relative">
			<div id="donut-chart" />

			{/* custom legend */}
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				<div>
					<h3 className="flex gap-2 text-lg font-semibold">
						<span>{data[0]}</span>
						<span className={`text-[#eb5757]`}>{labels[0]}</span>
					</h3>
					<h3 className="flex gap-2 text-lg font-semibold">
						<span>{data[1]}</span>
						<span className={`text-[#2f80ed]`}>{labels[1]}</span>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default DonutChart;
