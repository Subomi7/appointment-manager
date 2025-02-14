import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    latitude: {type: Number},
    longitude: {type: Number},
    status: {
      type: String,
      enum: ['Scheduled', 'Awaiting', 'Cancelled'],
      default: 'Awaiting',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const APPOINTMENT = mongoose.model("appointment", appointmentSchema)

export default APPOINTMENT