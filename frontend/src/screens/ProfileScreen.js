import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../features/auth/authSlice'
import { getUserOrders} from "../features/order/orderService";

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msge, setMessage] = useState(null)
  const [orders, setOrders] = useState(null)

  const [errorOrders, setErrorOrders] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { isSuccess, isLoading, isError, message, user } = useSelector(
    (state) => state.auth,
  )

  //   const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //   const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      //   if (!user.name) {
      // dispatch(getUserDetails('profile'))
      //   } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    const fetch = async () => {
      const result = await getUserOrders(user._id).then(res => res);
      setOrders(result);
      setErrorOrders(false);
      setLoadingOrders(false);
    }
    fetch();

  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Hasło nieprwidłowe')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    setPassword('')
    setConfirmPassword('')
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Moje dane</h2>
        {msge && <Message>{msge}</Message>}
        {isError && <Message>{message}</Message>}
        {isSuccess && <Message variant="success">Dane zostały zaaktualizowane !</Message>}
        {isLoading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group style={{marginBottom:'20px'}}  controlId="name">
            <Form.Label>Imię i nazwisko</Form.Label>
            <Form.Control
              type="name"
              placeholder="Wpisz imię i nazwisko"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{marginBottom:'20px'}}  controlId="email">
            <Form.Label>e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Wpisz e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{marginBottom:'20px'}}  controlId="password">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{marginBottom:'20px'}}  controlId="confirmPassword">
            <Form.Label>Powtórz hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Zaktualizuj dane
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h1>Moje zamówienia</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
            <tr>
              <th>ID Zamówienia</th>
              <th>Data</th>
              <th>Kwota</th>
              <th>0płacone</th>
              <th>Dostarczone</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} zł</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Szczegóły
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )}
      </Col>

    </Row>
  )
}

export default ProfileScreen
