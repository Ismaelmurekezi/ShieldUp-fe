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
    colors: ["#4CAF50", "#00BCD4", "#FFC107"], 
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
        text: "Kind of theft",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return  val + " ";
        },
      },
    },
  };

  const barChartSeries = [
    {
      name: "Burglaries",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 63, 60, 66],
    },
    {
      name: "Armed Robberies",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 13, 50, 26],
    },
    {
      name: "Thefts",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 21, 6, 16],
    },
  ];

  // Data for the Pie Chart (Theft Occur)
  const pieChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Burglary", "Armed robbery", "Theft"],
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
      tickAmount: 12  , // Number of ticks on x-axis
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Theft Occur",
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
      name: "Theft",
      data: [
        150, 200, 180, 160, 170, 190, 175, 165, 155, 145, 130, 120
      ], 
    },
   
  ];

  return (
    <DashboardLayout>
      <div className="pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Report Card */}
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
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
            <h3 className="text-2xl text-primary font-semibold mb-4">
              The Overall Monthly Report
            </h3>
            <Chart
              options={stockPriceOptions}
              series={stockPriceSeries}
              type="line"
              height={300}
            />
          </div>


        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytics;
