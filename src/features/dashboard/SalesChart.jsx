import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts"

import {
  eachDayOfInterval, format, isSameDay, subDays
} from "date-fns"

import DashboardBox from "./DashboardBox"
import Heading from "../../ui/Heading"

import { useDarkMode } from "../../context/DarkModeContext"

import styled from "styled-components"

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
];
   
function SalesChart ({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode()

  const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    }
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })

  const data = allDates.map((date) => {
    return{
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0)
    }
  })

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from &nbsp;
        {format(allDates.at(0), 'MMM dd yyyy')}
        &nbsp;
        &mdash;
        &nbsp;
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={data} >
          <XAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            dataKey='label'/>
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit='$' />
          <CartesianGrid
            strokeDasharray='4'/>
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            type='monotone'
            strokeWidth={2}
            name='Total sales'
            unit='$'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}/>
          <Area
            dataKey='extrasSales'
            type='monotone'
            strokeWidth={2}
            name='Extras sales'
            unit='$'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}/>
            
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
    