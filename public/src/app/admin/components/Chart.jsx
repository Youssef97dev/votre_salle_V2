// Libs
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PuffLoader } from "react-spinners";
const DynamicChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// APIs
import { getCount } from "airbnb/lib/admin";

// Store
import { userAppStore } from "airbnb/store/store";

const Chart = ({ title, color, borderColor, titleLink }) => {
  const { userInfo } = userAppStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Get Chart data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const chartData = await getCount(titleLink);
      if (title === "Clients") {
        setData(chartData?.filter((user) => user.roles[0] === "user"));
      } else {
        setData(chartData);
      }
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, []);

  // Calculate range from current month last year to the current month this year
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const lastYear = currentYear - 1;

  const chartData = [];
  for (let month = currentMonth; month >= 0; month--) {
    chartData.push(`${currentYear}-${month + 1}`);
  }
  for (let month = 11; month > currentMonth; month--) {
    chartData.push(`${lastYear}-${month + 1}`);
  }

  // Function to count created listing per month
  const countDataByMonth = () => {
    const monthlyCounts = {};

    data?.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const monthYear = `${createdAt.getFullYear()}-${
        createdAt.getMonth() + 1
      }`;
      if (monthlyCounts[monthYear]) {
        monthlyCounts[monthYear]++;
      } else {
        monthlyCounts[monthYear] = 1;
      }
    });

    return monthlyCounts;
  };

  const dataByMonth = countDataByMonth();

  const chartSeries = [
    {
      name: title,
      data: chartData.reverse().map((monthYear) => dataByMonth[monthYear] || 0),
    },
  ];

  // columnChartOptions
  const columnChart = {
    options: {
      chart: {
        height: 200,
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: [`${color}`],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      grid: {
        borderColor: borderColor,
      },
      xaxis: {
        categories: chartData.map((monthYear) => {
          const [year, month] = monthYear.split("-");
          const monthNames = [
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
          return `${monthNames[parseInt(month) - 1]}`;
        }),
        axisBorder: {
          color: borderColor,
        },
      },
      yaxis: {
        opposite: false,
        labels: {
          offsetX: 0,
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4  rounded-lg bg-violet-100 shadow-lg shadow-[#7f5dca6c] px-0 md:px-3 py-2">
      <span className="font-semibold">Number of {title} Per month</span>
      {loading ? (
        <PuffLoader color={`${color}`} size={50} />
      ) : (
        <DynamicChart
          series={chartSeries}
          options={columnChart.options}
          className="rounded-lg w-full  overflow-hidden"
          type="area"
          height={200}
        />
      )}
    </div>
  );
};

export default Chart;
