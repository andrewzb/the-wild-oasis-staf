import { useSettings } from './useSettings'

import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'

import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
  const {isLoading, settings: {
    minBookingLenght,
    maxBookingLenght,
    maxGuestsPerBooking,
    breakfastPrice,
  } = {}} = useSettings()

  const {isUpdating, updateSetting} = useUpdateSetting()

  function handeleUpdate(e, fieldName){
    const { value } = e.target
    if (!value) return
    updateSetting({[fieldName]: value})

  }

  if (isLoading) return <Spinner/>

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLenght} disabled={isUpdating} onBlur={e => handeleUpdate(e, 'minBookingLenght')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLenght} disabled={isUpdating} onBlur={e => handeleUpdate(e, 'maxBookingLenght')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isUpdating} onBlur={e => handeleUpdate(e, 'maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={e => handeleUpdate(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
