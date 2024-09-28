import ApexCharts from "apexcharts";
import { useEffect } from "react";
import PropTypes from "prop-types";

const SplineChart = ({ data }) => {
	const calculateMaxValue = (dataArray) => {
		if (!dataArray) return 10;

		const maxDataValue = Math.max(...dataArray);
		const padding = 10; // Adding padding so the highest point is not at the very top of the chart
		return Math.ceil(maxDataValue / padding) * padding || 10; // Ensure at least a max value of 10 if data is 0
	};
	useEffect(() => {
		var options = {
			series: [
				{
					name: "Total Visits",
					data: data?.data,
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
				categories: data?.labels,
			},
			yaxis: {
				tickAmount: 10,
				min: 0,
				max: calculateMaxValue(data?.data),
				forceNiceScale: true,
			},
			tooltip: {
				x: {
					format: "dd/MM/yy HH:mm",
				},
			},
		};
		var chart = new ApexCharts(document.querySelector("#spline-chart"), options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [data]);
	return <div id="spline-chart" />;
};
SplineChart.propTypes = {
	data: PropTypes.any,
};

export default SplineChart;
