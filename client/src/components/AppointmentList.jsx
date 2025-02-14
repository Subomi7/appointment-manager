import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import PlaceHolder from './PlaceHolder';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        'https://appointment-manager-4t9u.onrender.com/api/appointments'
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const formatAppointmentId = (id) => {
    // Take last 6 characters of MongoDB ID for shorter display
    return `APT-${id.slice(-6).toUpperCase()}`;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatAppointmentId(appointment._id).includes(searchTerm.toUpperCase());
    const matchesDate = filterDate
      ? appointment.date.includes(filterDate)
      : true;
    return matchesSearch && matchesDate;
  });

  // if (loading) return <Spinner animation='border' />;
  if (error) return <Alert variant='danger'>{error}</Alert>;

  return (
    <div className='p-2'>
      <h2 className='mb-4 text-white'>Appointments</h2>

      <Row bg-body-tertiary className='mb-4'>
        <Col md={6}>
          <Form.Control
            type='text'
            placeholder='Search by ID, patient, or doctor name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            type='date'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {loading ? (
          <>
            <div className='d-flex flex-wrap justify-content-between gap-4 pt-2'>
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
            </div>
          </>
        ) : (
          <>
            {filteredAppointments.map((appointment) => (
              <Col key={appointment._id} md={6} lg={4} className='mb-4 cursor-pointer'>
                <Card
                  className='h-100 cursor-pointer card1'
                  onClick={() => navigate(`/appointment/${appointment._id}`)}
                >
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    <Badge bg='primary'>
                      {formatAppointmentId(appointment._id)}
                    </Badge>
                    <Badge
                      bg={
                        appointment.status === 'Scheduled'
                          ? 'success'
                          : appointment.status === 'Cancelled'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{appointment.patientName}</Card.Title>
                    <Card.Text>
                      <strong>Doctor:</strong> {appointment.doctorName}
                      <br />
                      <strong>Date:</strong>{' '}
                      {new Date(appointment.date).toLocaleString()}
                      <br />
                      <strong>Location:</strong> {appointment.location}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </div>
  );
};

export default AppointmentList;
