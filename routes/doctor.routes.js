const express = require("express");
const { Doctor } = require("../models/doctor.model");
const DoctorRoute = express.Router();

DoctorRoute.get("/", async (req, res) => {
  const { name, specialization } = req.query;
  if (name) {
    const doctors = await Doctor.find({ name: name });
    res.status(200).send({ msg: doctors });
  } else if (specialization) {
    const doctors = await Doctor.find({ specialization: specialization });
    res.status(200).send({ msg: doctors });
  } else {
    const doctors = await Doctor.find();
    res.status(200).send({ msg: doctors });
  }
});

DoctorRoute.post("/add", async (req, res) => {
  try {
    const {
      name,
      image,
      specialization,
      location,
      experience,
      date,
      slots,
      fee,
    } = req.body;
    const newDoctor = new Doctor({
      name,
      image,
      specialization,
      location,
      experience,
      date,
      slots,
      fee,
    });
    await newDoctor.save();
    res.status(200).send({ msg: "Doctor Added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

DoctorRoute.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await Doctor.findByIdAndDelete({ _id });
    res.status(200).send({ msg: "A Docotor has been Deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

DoctorRoute.patch("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const payload = req.body;
    await Doctor.findByIdAndUpdate({ _id: _id }, payload);
    res.status(200).send({ msg: "Doctor data updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = DoctorRoute;
