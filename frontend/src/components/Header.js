import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function Header() {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'><Navbar.Brand>
            <img
              alt=""
              src="/images/logo.png"
              width="80"
              height="80"
            />{'     PollubSklep'}
      
          </Navbar.Brand></LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className='ms-auto'>
          <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'></i>   Koszyk</Nav.Link>
            </LinkContainer>
            
             {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item><i className="fas fa-user"></i>  Mój profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}><i class="fa-solid fa-arrow-right-from-bracket"></i> Wyloguj się
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Zaloguj się
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header