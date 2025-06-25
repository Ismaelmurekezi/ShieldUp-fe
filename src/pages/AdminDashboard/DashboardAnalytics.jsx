import Chart from "react-apexcharts";
import { TrendingUp, Users } from "lucide-react";
import useAuthStore from "../../store/authStore";

const DashboardAnalytics = () => {
  const { user, isSuperAdmin } = useAuthStore();
  const isSuper = isSuperAdmin();

  // Admin Analytics - Theft Related Charts
  const AdminAnalytics = () => {
    // Data for the Bar Chart (Theft Analytics)
    const barChartOptions = {
      chart: {
        id: "analytic-bar-chart",
        toolbar: { show: false },
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
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      yaxis: {
        title: { text: "Kind of theft" },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val) => val + " cases",
        },
      },
    };

    const barChartSeries = [
      {
        name: "Burglaries",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Armed Robberies",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Thefts",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ];

    // Data for the Pie Chart (Theft Types)
    const pieChartOptions = {
      chart: { type: "donut" },
      labels: ["Burglary", "Armed robbery", "Theft"],
      colors: ["#EF4444", "#3B82F6", "#F59E0B"],
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
                formatter: (w) =>
                  w.globals.seriesTotals.reduce((a, b) => a + b, 0),
              },
            },
          },
        },
      },
    };

    const pieChartSeries = [44, 55, 13];

    // Data for the Line Chart (Monthly Theft Trend)
    const lineChartOptions = {
      chart: {
        id: "theft-trend-chart",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      xaxis: {
        categories: [
          "Mon",
          "Tue",
          "Wed",
          "Thur",
          "Fri",
          "Sat",
          "Sun",
        ],
        tickAmount: 12,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Theft Cases" },
        min: 50,
        max: 250,
        tickAmount: 4,
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
        x: { format: "dd/MM/yy HH:mm" },
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
        name: "Theft Cases",
        data: [150, 200, 180, 160, 170, 190],
      },
    ];

    return (
      <div className="pb-6">
        {/* Summary Cards for Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#B6FFA1] p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Weekly Thefts
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">23</p>
            </div>
            <TrendingUp size={35} className="text-gray-400" />
          </div>

          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Thefts
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">89</p>
            </div>
            <TrendingUp size={35} className="text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          THEFT ANALYTICS
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

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              THEFT TYPES
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
              Monthly Theft Trend
            </h3>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={300}
            />
          </div>
        </div>
      </div>
    );
  };

  // SuperAdmin Analytics - User Related Charts
  const SuperAdminAnalytics = () => {
    // Data for User Analytics
    const userBarChartOptions = {
      chart: {
        id: "user-bar-chart",
        toolbar: { show: false },
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
        tickAmount: 12,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Number of Users" },
        min: 0,
        max: 50,
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
        data: [5, 8, 12, 7, 15, 10, 18, 14, 20, 16, 22, 25],
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
        categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        tickAmount: 12,
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Total Users" },
        min: 0,
        max: 100,
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
        x: { format: "dd/MM/yy HH:mm" },
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
        name: "Total Users",
        data: [5, 13, 25, 32, 47, 57],
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
              <p className="text-3xl font-bold text-green-700 mt-2">5</p>
            </div>
            <Users size={35} className="text-gray-400" />
          </div>

          <div className="bg-teal-100 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Monthly Users
              </p>
              <p className="text-3xl font-bold text-teal-700 mt-2">12</p>
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
               Monthly Users
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
              Weekly Users
            </h3>
            <Chart
              options={userLineChartOptions}
              series={userLineChartSeries}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
    );
  };

  // Render based on user role
  return isSuper ? <SuperAdminAnalytics /> : <AdminAnalytics />;
};

export default DashboardAnalytics;
