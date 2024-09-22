import ApexCharts from "apexcharts";
import { useEffect } from "react";

const SplineChart = () => {
	var options = {
		series: [
			{
				name: "Total Visits",
				data: [31, 0, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42], // *change this data to your data
			},
		],
		chart: {
			height: 350,
			type: "area",
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
		},
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};

	useEffect(() => {
		var chart = new ApexCharts(document.querySelector("#spline-chart"), options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, []);
	return <div id="spline-chart" />;
};

export default SplineChart;
