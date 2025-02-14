import APPOINTMENT from '../model/appointmentModel.js';
import axios from 'axios'

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      doctorName,
      specialty,
      date,
      location,
      status,
      notes,
    } = req.body;

    // Convert address to latitude and longitude using Mapbox
    const MAPBOX_API_KEY = process.env.MAPBOX_ACCESS_TOKEN;
    const geoResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=${MAPBOX_API_KEY}`
    );

    const [longitude, latitude] = geoResponse.data.features[0]?.center || [
      null,
      null,
    ];

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: 'Invalid location, unable to fetch coordinates' });
    }

    // Create new appointment with geolocation data
    const newAppointment = new APPOINTMENT({
      patientName,
      doctorName,
      specialty,
      date,
      location,
      latitude,
      longitude,
      status,
      notes,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // const appointment = new APPOINTMENT(req.body);
  // try {
  //   const newAppointment = await appointment.save();
  //   res.status(201).json(newAppointment);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

export const allAppointment = async (req, res) => {
  try {
    const appointments = await APPOINTMENT.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const singleAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await APPOINTMENT.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await APPOINTMENT.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
