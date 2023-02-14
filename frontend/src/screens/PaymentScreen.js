import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../features/cart/cartSlice'

function PaymentScreen() {
  const { paymentMethod } = useSelector((state) => state.cart)

  const [payment, setPayment] = useState(paymentMethod)
  
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(payment))
    navigate('/login/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Zapłać za zamówienie</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group style={{marginBottom:'20px'}} controlId="payment">
          <Form.Label>Wybierz metode zapłaty</Form.Label>
        <Col>
        <Form.Check 
        type='radio' 
        label='PayPal' 
        id='PayPal' 
        name='paymentMethod' 
        value='PayPal' 
        checked = {payment === "PayPal"}
        onChange={(e) => setPayment(e.target.value)}
        ></Form.Check>
            

        <Form.Check 
        type='radio' 
        label='BLIK' 
        id='BLIK' 
        name='paymentMethod' 
        value='BLIK' 
        checked = {payment === "BLIK"}
        onChange={(e) => setPayment(e.target.value)}
        ></Form.Check>

        <Form.Check 
        type='radio' 
        label='Przelew' 
        id='Przelew' 
        name='paymentMethod' 
        value='Przelew' 
        checked = {payment === "Przelew"}
        onChange={(e) => setPayment(e.target.value)}
  ></Form.Check>
             </Col>
             </Form.Group>

        <Button type="submit" variant="primary">
          Kontynuuj
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen