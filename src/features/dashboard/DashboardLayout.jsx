import Spinner from "../../ui/Spinner"
import Stats from "./Stats"
import SalesChart from "./SalesChart"
import DurationChart from "./DurationChart"
import TodayActivity from "../check-in-out/TodayActivity"

import { useCabins } from "../cabins/useCabins"
import { useRecentStays } from "./useRecentStays"
import { useRecentBookings } from "./useRecentBookings"

import styled from "styled-components"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout () {

  const { bookings, isPending: isBookingsPending } = useRecentBookings()
  const { confirmedStays, isPending: isStaysPending, numDays } = useRecentStays()
  const { cabins, isPending: isCabinsPending } = useCabins()

  if(isBookingsPending || isStaysPending || isCabinsPending) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
