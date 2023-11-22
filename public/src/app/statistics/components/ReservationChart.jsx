import React, { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const ReservationChart = ({reservations, chartData, isLoading}) => {

    // Function to count reservations per month
    const countReservationsByMonth = () => {
        const monthlyCounts = {};

        reservations.forEach((reservation) => {
            const startDate = new Date(reservation.tripinfo.startDate);
            const monthYear = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;
            if (monthlyCounts[monthYear]) {
                monthlyCounts[monthYear]++;
            } else {
                monthlyCounts[monthYear] = 1;
            }
        });

        return monthlyCounts;
    };
    
    const reservationsByMonth  = countReservationsByMonth();

    const chartSeries = [{
        name: 'Reservations',
        data: chartData.reverse().map(monthYear => reservationsByMonth[monthYear] || 0),
    }];

    // columnChartOptions
const columnChart = {
    options: {
        chart: {
            height: 300,
            type: 'area',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#805dca'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
            curve: 'smooth',
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
    <div className='flex flex-col justify-center items-center gap-4  rounded-lg bg-violet-100 shadow-lg shadow-[#7f5dca6c] px-0 md:px-3 py-2'>
        <span className='font-semibold'>Number of Reservations Per month</span>
        {isLoading ? <RingLoader color='#7f5dca6c' size={50} /> : <DynamicChart series={chartSeries} options={columnChart.options} className="rounded-lg w-full  overflow-hidden" type="area" height={300} />}
    </div>
  )
}

export default ReservationChart