import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { protect } from "../middleware/auth.js";
import { allowRole } from "../middleware/role.js";

const adminRouter = express.Router();

/* Add Doctor */
adminRouter.post("/add-doctor", protect, allowRole("admin"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor"
    });

    res.json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* View All Appointments */
adminRouter.get("/appointments", protect, allowRole("admin"), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name email");

    res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default adminRouter;