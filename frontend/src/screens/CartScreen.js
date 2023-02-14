import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { 
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
  Form,
  ListGroupItem,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../features/cart/cartSlice'


function CartScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const effectRan = useRef(false)

  const qtyFromStorage = JSON.parse(localStorage.getItem('qty'))
  const { cartItems } = useSelector((state) => state.cart)

  const location = useLocation()
  // const qtyInUrl = new URLSearchParams(location).get('qty')
  // const urlQty = qtyInUrl ? Number(qtyInUrl) : 1
  const urlQty = location.search ? Number(location.search.split('=')[1]) : 1
  const [qty, setQty] = useState(urlQty)


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping')
  }

 
  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Twój koszyk jest pusty <Link to="/">Powrót</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((product) => (
              <ListGroupItem key={product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col md={2}>{product.price} zł</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={product.qty}
                      onChange={(e) => (
                        setQty(Number(e.target.value)),
                        dispatch(addToCart({ ...product, qty }))
                      )}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="subtotal">
                Cena za ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)} zł
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Złóż zamówienie
              </Button>
            </ListGroupItem>
          </ListGroup>
        
      </Col>
    </Row>
  )
}

export default CartScreen
