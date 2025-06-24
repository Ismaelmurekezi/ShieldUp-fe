// src/pages/DashboardAnalytics.jsx
import React from "react";
import Chart from "react-apexcharts";
import LayoutSuperAdmin from "../../components/LayoutSuperAdmin";
import { TrendingUp, User } from "lucide-react";


const SuperDashboardAnalytics = () => {
  // Data for the Line/Column Chart (Stock Price Movement)
  const User = {
    chart: {
      id: "user",
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
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      tickAmount: 12,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Users",
      },
      min: 50,
      max: 250, // Match design's y-axis end
      tickAmount: 4, // Number of ticks
    },
    colors: ["#3B82F6", "#B9E6FF", "#A2A77F"],
    stroke: {
      curve: "smooth",
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

  const Users = [
    {
      name: "Number of Users",
      data: [150, 200, 180, 160, 170, 190, 175, 165, 155, 145, 130, 120],
    },
  ];

  // Data for the Line/Column Chart (Stock Price Movement)
  const barChart2 = {
    chart: {
      id: "user",
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
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      tickAmount: 12,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Users",
      },
      min: 50,
      max: 250, // Match design's y-axis end
      tickAmount: 4, // Number of ticks
    },
    colors: ["#4CAF50"],
    stroke: {
      curve: "smooth",
      width: 1,
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
      opacity: 1,
    },
  };

  const barChart22 = [
    {
      name: "Number of Users",
      data: [150, 200, 180, 160, 170, 190, 175, 165, 155, 145, 130, 120],
    },
  ];

  // ----------------------------------------------------------------------

  // const barChartOptions = {
  //   chart: {
  //     id: "analytic-bar-chart",
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   xaxis: {
  //     categories: [
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //   },
  //   colors: ["#4CAF50"],
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "55%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Number of ",
  //     },
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   tooltip: {
  //     y: " user",
  //   },
  // };

  // const barChartSeries = [
  //   {
  //     name: "Number of User",
  //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 60, 66],
  //   },
  // ];

  return (
    <LayoutSuperAdmin>
      <div className="pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {/* Weekly Report Card */}
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Users
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">123</p>
            </div>
            <TrendingUp size={35} className="text-gray-400" />
          </div>

          {/* Monthly Report Card */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Users
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
            {/* <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            /> */}

            <Chart
              options={barChart2}
              series={barChart22}
              type="bar"
              height={350}
            />
          </div>
        </div>

        {/* Bottom Charts Section */}
    <p className="text-2xl font-semibold text-primary pb-2">USER CHARTS</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Number of Users
            </h3>
            <Chart options={User} series={Users} type="line" height={300} />
          </div>
        </div>
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperDashboardAnalytics;
