import CabinTable from "../features/cabins/CabinTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import AddCabin from "../features/cabins/AddCabin"
import CabinTableOperation from "../features/cabins/CabinTableOperation"

function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>
      <Row>
        <CabinTable />
        {/* <Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
        {showForm && <CreateCabinForm />} */}
        <AddCabin/>
      </Row>
    </>
  )
}

export default Cabins
