// src/pages/DashboardAnalytics.jsx
import React from "react";
import Chart from "react-apexcharts";
import DashboardLayout from "../../components/DashboardLayout";
import { TrendingUp } from "lucide-react";


const DashboardAnalytics = () => {
  // Data for the Bar Chart (Analytic Charts)
  const barChartOptions = {
    chart: {
      id: "analytic-bar-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    colors: ["#4CAF50", "#00BCD4", "#FFC107"], // Green, Cyan, Amber for Net Profit, Revenue, Free Cash Flow
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      title: {
        text: "$ (Thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  const barChartSeries = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  // Data for the Pie Chart (Theft Occur)
  const pieChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Burglary", "Normal", "Intense"],
    colors: ["#EF4444", "#3B82F6", "#F59E0B"], // Red, Blue, Orange
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "right", // Place legend to the right
      fontSize: "14px",
      markers: {
        width: 12,
        height: 12,
        radius: 4,
      },
    },
    dataLabels: {
      enabled: false, // Hide data labels on slices if needed
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // Adjust donut hole size
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
  };

  const pieChartSeries = [44, 55, 13]; // Corresponding to Burglary, Normal, Intense

  // Data for the Line/Column Chart (Stock Price Movement)
  const stockPriceOptions = {
    chart: {
      id: "stock-price-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        "Feb '17",
        "Mar '17",
        "Mar '17",
        "Apr '17",
        "Apr '17",
        "May '17",
        "May '17",
      ],
      tickAmount: 6, // Number of ticks on x-axis
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Price",
      },
      min: 50, // Match design's y-axis start
      max: 250, // Match design's y-axis end
      tickAmount: 4, // Number of ticks
    },
    colors: ["#3B82F6"], // Blue for the line
    stroke: {
      curve: "smooth", // Smooth line
      width: 2,
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // alternating row colors
        opacity: 0.5,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const stockPriceSeries = [
    {
      name: "Price",
      data: [
        150, 200, 180, 160, 170, 190, 175, 165, 155, 145, 130, 120, 110, 125,
        140, 150, 160,
      ], // Sample data based on trend
    },
  ];

  // Data for Product A & B Bar/Column Chart
  const productChartOptions = {
    chart: {
      id: "product-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
    },
    colors: ["#22C55E", "#3B82F6"], // Green for Product A, Blue for Product B
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      title: {
        text: "", // No y-axis title in the design
      },
      min: 0,
      max: 9000,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " units"; // Example unit
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetY: -10,
      markers: {
        width: 12,
        height: 12,
        radius: 4,
      },
    },
  };

  const productChartSeries = [
    {
      name: "Product A",
      data: [4500, 7500, 8000, 5000, 7000, 4000, 6800],
    },
    {
      name: "Product B",
      data: [3500, 4500, 6500, 3000, 4800, 3200, 4500],
    },
  ];

  return (
    <DashboardLayout>
      <div className="pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Report Card */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Report
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">123</p>
            </div>
            <TrendingUp size={35} className="text-gray-400" />
          </div>

          {/* Monthly Report Card */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Report
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">123</p>
            </div>
            <TrendingUp size={35} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ANALYTIC CHARTS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            />
          </div>

          {/* Pie Chart (Theft Occur) */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              THEFT OCCUR
            </h3>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="donut"
              width={300}
            />
          </div>
        </div>

        {/* Bottom Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Stock Price Movement
            </h3>
            <Chart
              options={stockPriceOptions}
              series={stockPriceSeries}
              type="line"
              height={300}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product A & Product B
            </h3>{" "}
            <Chart
              options={productChartOptions}
              series={productChartSeries}
              type="bar"
              height={300}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytics;
