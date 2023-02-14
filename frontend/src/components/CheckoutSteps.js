import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Zaloguj się</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zaloguj się</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/login/shipping">
            <Nav.Link>Dane wysyłki</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Dane wysyłki</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/login/payment">
            <Nav.Link>Zapłać</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zapłać</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/login/placeorder">
            <Nav.Link>Podsumowanie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Podsumowanie</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps