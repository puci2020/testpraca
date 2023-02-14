import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../features/cart/cartSlice'

function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/login/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Dane wysyłki</h1>
      <Form onSubmit={submitHandler}>
      
        <Form.Group style={{marginBottom:'20px'}} controlId="address">
          <Form.Label>Adres zamieszkania</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz adres zamieszkania"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        

        <Form.Group style={{marginBottom:'20px'}} controlId="city">
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz miasto"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group style={{marginBottom:'20px'}} controlId="postalCode">
          <Form.Label>Kod pocztowy</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz kod pocztowy miasta"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group style={{marginBottom:'20px'}} controlId="country">
          <Form.Label>Państwo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz państwo"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="btn-primary">
          Kontynuuj
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen