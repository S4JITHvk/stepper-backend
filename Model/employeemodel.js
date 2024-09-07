const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  // Personal Details
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
  },
  education: {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  employment: {
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    salaryAmount: { type: Number, required: true },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
