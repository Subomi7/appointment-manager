import express from 'express';
import {
  allAppointment,
  createAppointment,
  deleteAppointment,
  singleAppointment,
  updateAppointment,
} from '../controllers/appointmentController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
const router = express.Router();

//post appointment
router.post('/', authMiddleware, adminMiddleware, createAppointment);

//get appointment
router.get('/', allAppointment);

//get single appointment
router.get('/:id', singleAppointment);

// put appointment
router.put('/:id', authMiddleware, adminMiddleware, updateAppointment);

//delete appointment
router.delete('/:id', authMiddleware, adminMiddleware, deleteAppointment);


export default router;