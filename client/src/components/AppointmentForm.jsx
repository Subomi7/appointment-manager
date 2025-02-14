import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const defaultFormData = {
  patientName: '',
  doctorName: '',
  specialty: '',
  date: '',
  location: '',
  status: 'Scheduled',
  notes: '',
};

const AppointmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id && id !== 'new';
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchAppointment();
    } else {
      setFormData(defaultFormData);
    }
  }, [isEditMode]);

  const fetchAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://appointment-manager-4t9u.onrender.com/api/appointments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const appointment = response.data;
      setFormData({
        ...appointment,
        date: new Date(appointment.date).toISOString().split('T')[0],
      });
    } catch (error) {
      console.error(error);
      setError('Failed to fetch appointment');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (isEditMode) {
        await axios.put(
          `https://appointment-manager-4t9u.onrender.com/api/appointments/${id}`,
          formData,
          { headers }
        );
      } else {
        await axios.post(
          'https://appointment-manager-4t9u.onrender.com/api/appointments',
          formData,
          { headers }
        );
      }
      navigate('/');
    } catch (error) {
      setError('Failed to save appointment');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className='text-white'>
        {isEditMode ? 'Edit Appointment' : 'Create New Appointment'}
      </h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit} className='appointment-form'>
        <Form.Group className='mb-3'>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type='text'
            name='patientName'
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type='text'
            name='doctorName'
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Specialty</Form.Label>
          <Form.Control
            type='text'
            name='specialty'
            value={formData.specialty}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Status</Form.Label>
          <Form.Select
            name='status'
            value={formData.status}
            onChange={handleChange}
          >
            <option value='Scheduled'>Scheduled</option>
            <option value='Awaiting'>Awaiting</option>
            <option value='Cancelled'>Cancelled</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as='textarea'
            name='notes'
            value={formData.notes}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={isLoading}>
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
              {isEditMode ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{isEditMode ? 'Update' : 'Create'} Appointment</>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;
