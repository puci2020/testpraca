import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {addOrder} from "../features/order/orderService";
import {clearCart} from "../features/cart/cartSlice";





const PlaceOrderScreen = () => {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

//Calculate prices
const addDecimals = (num) => {
    return (Math.round(num *100) / 100).toFixed(2)
}

const itemsPrice = addDecimals(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0))


    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()



    const shippingPrice = (itemsPrice > 100 ? 0 : 8.99)


const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice))





const placeOrderHandler = () => {

    addOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        user: user._id
    }).then(res => {
        dispatch(clearCart());
        navigate(`/order/${res}`);
     });

  }


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
<Row>
    <Col md={8}>
        <ListGroup>
            <ListGroupItem variant='flush'>
            <h1>Adres wysyłki</h1>
            <p>
            <i className='fas fa-shipping-fast'></i> {cart.shippingAddress.address}  <br></br>
            <i className='fas fa-city'></i> {cart.shippingAddress.postalCode}   {cart.shippingAddress.city}, {cart.shippingAddress.country}
            </p>
            </ListGroupItem>

            <ListGroupItem>
            <h1> Metoda płatności </h1>
            <i class="fa-solid fa-credit-card"></i> {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
            <h1> Wybrane produkty </h1>
            {cart.cartItems.lenght === 0 ? ( <Message> Twój koszyk jest pusty</Message>
            ) : (
            <ListGroup variant='flush'>
            {cart.cartItems.map((item, index) => (
            <ListGroupItem key={index}>
                <Row>
                    <Col md={1}>
                    <Image src={item.image} alt={item.name}
                    fluid rounded />
                    </Col>

                    <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={4}>
                    {item.qty} x {item.price} zł = {item.qty * item.price} zł
                    </Col>
                    </Row>
                </ListGroupItem>
            ))}
                </ListGroup>
        )}
            </ListGroupItem>
        </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Podsumowanie</h2>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Produkty</Col>
                        <Col>{itemsPrice} zł</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Wysyłka</Col>
                        <Col>{shippingPrice} zł</Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col><strong><h1>Suma</h1></strong></Col>
                        <Col><h1>{totalPrice} zł</h1></Col>
                    </Row>
                </ListGroupItem>

                <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Złóż zamówienie
                </Button>
                </ListGroupItem>
            </ListGroup>
        </Card>
    </Col>
</Row>
    </>
  )
}

export default PlaceOrderScreen