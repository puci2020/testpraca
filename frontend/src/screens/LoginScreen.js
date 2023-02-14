import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, reset } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading, isError, message, user } = useSelector(
    (state) => state.auth,
  )

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (user) {
      navigate(redirect)
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, redirect, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <FormContainer>
      <h2>Zaloguj się</h2>
      {isError && <Message>{message}</Message>}
      {isLoading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group style={{marginBottom:'20px'}} controlId="email">
          <Form.Label>Adres e-mail</Form.Label>
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
        
        <Button type="submit" className='bnt-block'>
          Zaloguj się
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Jesteś nowym użytkownikiem ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Załóż konto
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen