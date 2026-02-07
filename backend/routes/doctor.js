import express from "express";
import { protect } from "../middleware/auth.js";
import { allowRole } from "../middleware/role.js";
import Doctor from "../models/Doctor.js";

const doctorRouter = express.Router();

doctorRouter.put(
  "/profile",
  protect,
  allowRole("doctor"),
  async (req, res) => {
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.user.id,
        {
          ...req.body,
          isProfileCompleted: true
        },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        message: "Profile updated successfully",
        doctor: updatedDoctor
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

doctorRouter.get("/list", protect, async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email")
      .select("specialization availableDays availableTimeSlots");

    res.json(doctors);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default doctorRouter;