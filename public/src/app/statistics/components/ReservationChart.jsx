import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const ReservationChart = ({reservations, chartData}) => {

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
            type: 'bar',
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
            show: true,
            width: 1,
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
                return `${monthNames[parseInt(month) - 1]}-${year}`;
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
    <div className='flex flex-col justify-center items-center gap-4 '>
        <span className='font-semibold'>Number of Reservations Per month</span>
        <DynamicChart series={chartSeries} options={columnChart.options} className="rounded-lg w-full bg-white shadow-lg shadow-[#7f5dca6c] overflow-hidden" type="bar" height={300} />
    </div>
  )
}

export default ReservationChart