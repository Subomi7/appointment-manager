import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/appointments/${id}`
      );
      setAppointment(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch appointment details');
      setLoading(false);
      console.error(error);
    }
  };

  const formatAppointmentId = (id) => {
    return `APT-${id.slice(-6).toUpperCase()}`;
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://localhost:3000/api/appointments/${id}`);
        navigate('/');
      } catch (error) {
        setError('Failed to delete appointment');
        console.error(error);
      }
    }
  };

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (!appointment)
    return <Alert variant='warning'>Appointment not found</Alert>;
  return (
    <div className='bg-body-tertiary'>
      <Link to='/' role='button' className='text-decoration-none'><IoArrowBackOutline />Back to List</Link>
      <Card>
        <Card.Header>
          <Row className='align-items-center'>
            <Col>
              <h3 className='mb-0'>
                <Badge bg='primary' className='me-2'>
                  {formatAppointmentId(appointment._id)}
                </Badge>
                <Badge
                  bg={
                    appointment.status === 'Completed'
                      ? 'success'
                      : appointment.status === 'Cancelled'
                      ? 'danger'
                      : appointment.status === 'Confirmed'
                      ? 'info'
                      : 'warning'
                  }
                >
                  {appointment.status}
                </Badge>
              </h3>
            </Col>
            <Col xs='auto'>
              <Button
                variant='outline-primary'
                className='me-2'
                onClick={() => navigate(`/edit/${appointment._id}`)}
              >
                Edit
              </Button>
              <Button variant='outline-danger' onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Patient Name:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Doctor:</strong> {appointment.doctorName}
              </p>
              <p>
                <strong>Specialty:</strong> {appointment.specialty}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(appointment.date).toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {appointment.location}
              </p>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(appointment.createdAt).toLocaleString()}
              </p>
            </Col>
          </Row>
          <div className='mt-3'>
            <h5>Notes</h5>
            <p>{appointment.notes || 'No notes available'}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppointmentDetails;
