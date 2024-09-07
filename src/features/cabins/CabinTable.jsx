
import Spinner from "../../ui/Spinner"
import CabinRow from "./CabinRow"
import Table from "../../ui/Table"
import Menus from "../../ui/Menus"

import { useCabins } from "./useCabins"
import { useSearchParams } from "react-router-dom"

function CabinTable () {
  const {isLoading, cabins} = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) {
    return <Spinner />
  }

  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins;
  if(filterValue === 'all') filteredCabins = cabins
  if(filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if(filterValue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  
  const sortBy = searchParams.get('sortBy') || 'startData-asc'
  const [fieldName, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins.sort(
    ( a, b ) => (a[fieldName] - b[fieldName]) * modifier )
  
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' role="table">
        <Table.Header role="row">
            <div>&nbsp;</div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div>&nbsp;</div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} /> } />
      </Table>
    </Menus>
  )
}

export default CabinTable
