import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savePaymentMethod} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()


  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              label="1"
              name='paymentMethod'
              type='radio'
              id='radio-1'
            />
          </Col>
        </Form.Group> 
        <Button type='submit' variant='primary' className='my-2'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
