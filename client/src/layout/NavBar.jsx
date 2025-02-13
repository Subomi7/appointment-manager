import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { auth, logout } = useAuth();

  return (
    <div>
        <main className='container'>

        </main>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Appointment Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Appointments</Nav.Link>
              {auth.isAdmin && <Nav.Link href='/create'>Create New</Nav.Link>}
            </Nav>
            <Nav>
              {auth.token ? (
                <Button variant='outline-light' onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Nav.Link href='/login'>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
