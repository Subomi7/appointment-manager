import { useState } from 'react';
import { Form, Button, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://appointment-manager-4t9u.onrender.com/api/appointments/signup',
        {
          username: formData.username,
          password: formData.password,
          adminCode: formData.adminCode,
        }
      );

      login(response.data.token, response.data.isAdmin);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className='mt-5'>
      <Card className='mx-auto' style={{ maxWidth: '400px' }}>
        <Card.Header>
          <Card.Title>Admin Signup</Card.Title>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Admin Registration Code</Form.Label>
              <Form.Control
                type='password'
                name='adminCode'
                value={formData.adminCode}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Form.Text className='text-muted'>
                Required for admin registration
              </Form.Text>
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
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <div className='text-center mt-3'>
              Already have an account? <Link to='/login'>Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
