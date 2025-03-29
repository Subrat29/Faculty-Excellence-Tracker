import mongoose, { Schema } from "mongoose";

// Define the Faculty Schema
const facultySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    employee_code: {
      type: String,
    },
    avatar: {
      type: String, // Store the Cloudinary URL
      required: false, // Optional field
    },
    university_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department", // Assuming 'Department' is another model
    },
    designation: {
      type: String,
      enum: [
        "Assistant Professor",
        "Associate Professor",
        "Professor",
        "Lecturer",
        "Other",
      ],
    },
    joining_date: {
      type: Date,
    },
    teaching_experience_years: {
      type: Number,
      min: 0,
    },
    appraisal_score: {
      type: Number,
      min: 0,
    },
    last_appraisal_date: {
      type: Date,
    },
    
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

facultySchema.index({ user: 1 });
// Create and export the Faculty model
const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
