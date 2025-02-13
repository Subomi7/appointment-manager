import mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: 'appointment-data',
    });
    console.log('mongoDB connected successfully');
  } catch (error) {
    console.log(error.message);
  }
};
