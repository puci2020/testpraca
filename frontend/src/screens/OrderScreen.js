import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useState } from 'react'
import { Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getById} from "../features/order/orderService";
import {useSelector} from "react-redux";



const OrderScreen = () => {
// const order = useSelector((state) => state.cart)
    let { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [order, setOrder] = useState();

    const { isSuccess, isLoading, isError, message, user } = useSelector(
      (state) => state.auth,
    )


    useEffect(() => {

        const fetch = async () => {
            const result = await getById(id).then(res => res);
            setOrder(result);
            setLoading(false)
            setError(false);
        }
        fetch();
    }, [id])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
  <h1>Zamówienie {order._id}</h1>
  <Row>
    <Col md={8}>
        <ListGroup>
            <ListGroupItem variant='flush'>
            <h1>Adres wysyłki</h1>
            <p>
            <i className="fas fa-user"></i>  {order.user?.name} <br></br>
            <i className='fa-solid fa-envelope'></i>  {order.user?.email} <br></br>
            <i className='fas fa-shipping-fast'></i> {order.shippingAddress?.address}  <br></br>
            <i className='fas fa-city'></i> {order.shippingAddress?.postalCode}   {order.shippingAddress?.city}, {order.shippingAddress?.country}
            </p>
            {order.isDelivered ? <Message variant='success'>Dostarczone {order?.paidAt}</Message> : <Message variant='danger'>Nie dostarczone</Message>}
            </ListGroupItem>

            <ListGroupItem>
            <h1> Metoda płatności </h1>
            <p>
            <i className='fas fa-transgender'></i> {order.paymentMethod}
            </p>
            {order.isPaid ? <Message variant='success'>Zapłacone w {order.paidAt}</Message> : <Message variant='danger'>Brak wpłaty</Message>}
            </ListGroupItem>

            <ListGroupItem>
            <h1> Wybrane produkty </h1>
            {order.orderItems.lenght === 0 ? ( <Message> Zamówienie jest puste </Message>
            ) : (
            <ListGroup variant='flush'>
            {order.orderItems.map((item, index) => (
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
                        <Col><strong><h1>Suma</h1></strong></Col>
                        <Col><strong><h1>{order.totalPrice} zł</h1></strong></Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    </Col>
</Row>
    </>
}

export default OrderScreen
