import ApexCharts from "apexcharts";
import { useEffect } from "react";

const SplineChart = () => {
	var options = {
		series: [
			{
				name: "series1",
				data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42], // *change this data to your data
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
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
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
