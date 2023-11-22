import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RevenueChart = ({reservations, chartData, isLoading}) => {

    // Function to count reservations per month
    const totalPriceByMonth  = () => {
        const monthlyTotalPrices  = {};

        reservations?.forEach((reservation) => {
            const startDate = new Date(reservation.tripinfo.startDate);
            const monthYear = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;
            const price = parseFloat(reservation.tripinfo.price);
            if (monthlyTotalPrices[monthYear]) {
                monthlyTotalPrices[monthYear] += price;
            } else {
                monthlyTotalPrices[monthYear] = price;
            }
        });

        return monthlyTotalPrices;
    };
    const totalPricesByMonth = totalPriceByMonth();

    const chartSeries = [{
        name: 'Total Price',
        data: chartData.map(monthYear => totalPricesByMonth[monthYear] || 0),
    }];

    // columnChartOptions
const columnChart = {
    options: {
        chart: {
            height: 300,
            type: 'bar',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#e2a03f'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        grid: {
            borderColor: '#e0e6ed',
        },
        xaxis: {
            categories: chartData.map(monthYear => {
                const [year, month] = monthYear.split('-');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${monthNames[parseInt(month) - 1]}`;
            }),
            axisBorder: {
                color: '#e0e6ed',
            },
        },
        yaxis: {
            opposite: false,
            labels: {
                offsetX: 0,
            },
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
    },
};

  return (
    <div className='flex flex-col justify-center items-center gap-4 bg-amber-100 rounded-lg shadow-lg shadow-[#e2a13f71] px-0 md:px-3 py-2'>
        <span className='font-semibold'>Total Price Per month</span>
        {isLoading ? <RingLoader color='#e2a13f71' size={50} /> : <DynamicChart series={chartSeries} options={columnChart.options} className="rounded-lg w-full overflow-hidden" type="bar" height={300} />}
    </div>
  )
}

export default RevenueChart