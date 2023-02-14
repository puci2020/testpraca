import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../features/auth/authSlice'

function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msge, setMessage] = useState(null)

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
  }, [user, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Hasło nieprawidłowe')
    } else {
      dispatch(register({ name, email, password }))
    }
  }

  return (
    <FormContainer>
      <h2>Rejestracja</h2>
      {msge && <Message>{msge}</Message>}
      {isError && <Message>{message}</Message>}
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
          Załóż konto
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Posiadasz już konto ?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
           Zaloguj się
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen