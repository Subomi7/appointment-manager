import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://appointment-manager-4t9u.onrender.com/api/appointments/login',
        formData
      );
      login(response.data.token, response.data.isAdmin);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login'>
      <Container className='mt-5 p-2'>
        <Card className='mx-auto p-4' style={{ maxWidth: '400px' }}>
          <Card.Header>
            <Card.Title>Login</Card.Title>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </Form.Group>
              <Button
                type='submit'
                variant='primary'
                className='w-100'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                      className='me-2'
                    />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          </Card.Body>
          <div className='text-center mt-3'>
            Need an admin account? <Link to='/signup'>Sign Up</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
