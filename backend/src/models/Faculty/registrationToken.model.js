import mongoose from "mongoose";

const registrationTokenSchema = new mongoose.Schema({
  facultyEmail: { type: String, required: true },
  token: { type: String, required: true },
  expiry: { type: Date, required: true },
  used: { type: Boolean, default: false },
});

const RegistrationToken = mongoose.model(
  "RegistrationToken",
  registrationTokenSchema
);

export { RegistrationToken };
