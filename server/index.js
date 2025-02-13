import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import dotenv from "dotenv";
import { connect } from "./db/db.js";
import cors from "cors"
import appointmentRoute from "./routes/appointmentRoute.js"
import authRoute from "./routes/authRoute.js"

dotenv.config();

app.use(cors())
app.use(express.json());


app.get('/', function (req, res) {
  res.status(200).json({ success: true, message: "server is live" });
});

// Routes
app.use("/api/appointments", appointmentRoute)
app.use("/api/appointments", authRoute)

//MongoDB connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("cannot connect to server" + error.message);
    }
  })
  .catch((error) => {
    console.log("invalid database connection" + error.message);
  });
