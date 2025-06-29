"use client";

import { useEffect } from "react";
import Chart from "react-apexcharts";
import { TrendingUp, Users, AlertCircle } from "lucide-react";
import useAuthStore from "../../store/authStore";

const DashboardAnalytics = () => {
  const { 
    user, 
    isSuperAdmin, 
    userAnalytics, 
    fetchUserAnalytics, 
    messageAnalytics,
    fetchMessageAnalytics,
    isLoading 
  } = useAuthStore();
  const isSuper = isSuperAdmin();

  // Fetch analytics data on component mount
  useEffect(() => {
    if (isSuper) {
      fetchUserAnalytics();
    } else {
      fetchMessageAnalytics();
    }
  }, [isSuper]);

  // Admin Analytics - Theft Related Charts
  const AdminAnalytics = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      );
    }

    // Generate month labels for the last 12 months
    const generateMonthLabels = () => {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const now = new Date();
      const labels = [];

      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(
          `${months[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`
        );
      }

      return labels;
    };

    // Process crime data by type and month
    const processMonthlyCrimeData = () => {
      if (!messageAnalytics?.crimeTypesByMonth) {
        return {
          burglary: Array(12).fill(0),
          armedRobbery: Array(12).fill(0),
          theft: Array(12).fill(0)
        };
      }

      const result = {
        burglary: Array(12).fill(0),
        armedRobbery: Array(12).fill(0),
        theft: Array(12).fill(0)
      };

      messageAnalytics.crimeTypesByMonth.forEach(monthData => {
        const monthIndex = monthData.monthIndex;
        result.burglary[monthIndex] = monthData.burglary || 0;
        result.armedRobbery[monthIndex] = monthData.armedRobbery || 0;
        result.theft[monthIndex] = monthData.theft || 0;
      });

      return result;
    };

    const monthlyCrimeData = processMonthlyCrimeData();

    // Data for the Bar Chart (Monthly Crime Analytics by Type)
    const barChartOptions = {
      chart: {
        id: "analytic-bar-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories: generateMonthLabels(),
        tickAmount: 12,
        labels: { rotate: -45 },
      },
      colors: ["#4CAF50", "#00BCD4", "#FFC107"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      yaxis: {
        title: { text: "Number of Cases" },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val) => `${val} cases`,
        },
      },
    };

    const barChartSeries = [
      {
        name: "Burglary",
        data: monthlyCrimeData.burglary,
      },
      {
        name: "Armed Robbery",
        data: monthlyCrimeData.armedRobbery,
      },
      {
        name: "Theft",
        data: monthlyCrimeData.theft,
      },
    ];

    // Prepare crime types data for pie chart
    const crimeTypesData = messageAnalytics?.crimeTypes 
      ? Object.entries(messageAnalytics.crimeTypes).map(([name, value]) => ({
          name,
          value
        }))
      : [];

    // Data for the Pie Chart (Crime Types)
    const pieChartOptions = {
      chart: { type: "donut" },
      labels: crimeTypesData.map(item => item.name),
      colors: ["#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" },
          },
        },
      ],
      legend: {
        position: "right",
        fontSize: "14px",
        markers: {
          width: 12,
          height: 12,
          radius: 4,
        },
      },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: () => messageAnalytics?.totalMessages || 0,
              },
            },
          },
        },
      },
    };

    const pieChartSeries = crimeTypesData.map(item => item.value);

    // Generate day labels for the last 7 days
    const generateDayLabels = () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const now = new Date();
      const labels = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        labels.push(`${days[date.getDay()]} ${date.getDate()}`);
      }

      return labels;
    };

    // Data for the Line Chart (Weekly Crime Trend)
    const lineChartOptions = {
      chart: {
        id: "crime-trend-chart",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      xaxis: {
        categories: generateDayLabels(),
        tickAmount: 7,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Crime Cases" },
        min: 0,
        max: Math.max(...(messageAnalytics?.weeklyData || [0])) + 2,
        tickAmount: 5,
      },
      colors: ["#3B82F6"],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} cases`,
        },
      },
      markers: { size: 0 },
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

    const lineChartSeries = [
      {
        name: "Crime Cases",
        data: messageAnalytics?.weeklyData || Array(7).fill(0),
      },
    ];

    return (
      <div className="pb-6">
        {/* Summary Cards for Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Cases
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                {messageAnalytics?.weeklyMessages || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
            </div>
            <AlertCircle size={35} className="text-gray-400" />
          </div>

          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Cases
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">
                {messageAnalytics?.monthlyMessages || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
            </div>
            <AlertCircle size={35} className="text-gray-400" />
          </div>

          <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">Total Cases</p>
              <p className="text-3xl font-bold text-yellow-700 mt-2">
                {messageAnalytics?.totalMessages || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </div>
            <AlertCircle size={35} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          CRIME ANALYTICS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Crime Cases by Type
            </h3>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              CRIME TYPES DISTRIBUTION
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
              Weekly Crime Trend
            </h3>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={300}
            />
          </div>

          {/* Growth Rate Card */}
          {messageAnalytics?.messageGrowthRate && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Growth Rate
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Growth:</span>
                  <span
                    className={`font-semibold ${
                      messageAnalytics.messageGrowthRate.weekly > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {messageAnalytics.messageGrowthRate.weekly > 0 ? "+" : ""}
                    {messageAnalytics.messageGrowthRate.weekly}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Growth:</span>
                  <span
                    className={`font-semibold ${
                      messageAnalytics.messageGrowthRate.monthly > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {messageAnalytics.messageGrowthRate.monthly > 0 ? "+" : ""}
                    {messageAnalytics.messageGrowthRate.monthly}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // SuperAdmin Analytics - User Related Charts
  const SuperAdminAnalytics = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      );
    }

    // Generate month labels for the last 12 months
    const generateMonthLabels = () => {
      const months = [
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
      ];
      const now = new Date();
      const labels = [];

      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(
          `${months[date.getMonth()]} ${date
            .getFullYear()
            .toString()
            .slice(-2)}`
        );
      }

      return labels;
    };

    // Generate day labels for the last 7 days
    const generateDayLabels = () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const now = new Date();
      const labels = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        labels.push(`${days[date.getDay()]} ${date.getDate()}`);
      }

      return labels;
    };

    // Data for User Analytics
    const userBarChartOptions = {
      chart: {
        id: "user-bar-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories: generateMonthLabels(),
        tickAmount: 12,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Number of Users" },
        min: 0,
        max: Math.max(...(userAnalytics?.monthlyData || [0])) + 5,
        tickAmount: 5,
      },
      colors: ["#4CAF50"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val) => val + " users",
        },
      },
    };

    const userBarChartSeries = [
      {
        name: "New Users",
        data: userAnalytics?.monthlyData || [],
      },
    ];

    // Data for User Growth Line Chart
    const userLineChartOptions = {
      chart: {
        id: "user-growth-chart",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      xaxis: {
        categories: generateDayLabels(),
        tickAmount: 7,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Daily New Users" },
        min: 0,
        max: Math.max(...(userAnalytics?.weeklyData || [0])) + 2,
        tickAmount: 5,
      },
      colors: ["#3B82F6"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => val + " users",
        },
      },
      markers: { size: 5 },
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

    const userLineChartSeries = [
      {
        name: "Daily New Users",
        data: userAnalytics?.weeklyData || [],
      },
    ];

    return (
      <div className="pb-6">
        {/* Summary Cards for SuperAdmin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Users
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                {userAnalytics?.weeklyUsers || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
            </div>
            <Users size={35} className="text-gray-400" />
          </div>

          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Users
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">
                {userAnalytics?.monthlyUsers || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Users size={35} className="text-gray-400" />
          </div>

          <div className="bg-[#FFFC99] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">Total Users</p>
              <p className="text-3xl font-bold text-yellow-700 mt-2">
                {userAnalytics?.totalUsers || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </div>
            <Users size={35} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          USER ANALYTICS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly User Registrations
            </h3>
            <Chart
              options={userBarChartOptions}
              series={userBarChartSeries}
              type="bar"
              height={350}
            />
          </div>

          {/* User Growth Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Daily User Registrations (Last 7 Days)
            </h3>
            <Chart
              options={userLineChartOptions}
              series={userLineChartSeries}
              type="line"
              height={350}
            />
          </div>
        </div>

        {/* Additional Analytics */}
        {userAnalytics?.userGrowthRate && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Growth Rate
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Growth:</span>
                  <span
                    className={`font-semibold ${
                      userAnalytics.userGrowthRate.weekly > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {userAnalytics.userGrowthRate.weekly > 0 ? "+" : ""}
                    {userAnalytics.userGrowthRate.weekly}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Growth:</span>
                  <span
                    className={`font-semibold ${
                      userAnalytics.userGrowthRate.monthly > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {userAnalytics.userGrowthRate.monthly > 0 ? "+" : ""}
                    {userAnalytics.userGrowthRate.monthly}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render based on user role
  return isSuper ? <SuperAdminAnalytics /> : <AdminAnalytics />;
};

export default DashboardAnalytics;
