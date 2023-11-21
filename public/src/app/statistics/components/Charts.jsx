import React, { useEffect, useState } from 'react'
import { userAppStore } from "airbnb/store/store";
import { getActiveTrips } from "airbnb/lib/lisitng";

// Revenue and Reservations Chart
import ReservationChart from './ReservationChart';
import RevenueChart from './RevenueChart';

const Charts = ({listing}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Set shouldRender to true only in the client-side environment
        setShouldRender(true);
    }, []);

    useEffect(()=>{
        const getData = async () => {
            const data = await getActiveTrips(listing.id);
            setReservations(data);
          };
            getData();
    },[]);

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

  return shouldRender ? (
    <div className='flex flex-col gap-5'>
        <ReservationChart reservations={reservations} chartData={chartData} />
        <RevenueChart reservations={reservations} chartData={chartData} />
    </div>
  ) : null
}

export default Charts