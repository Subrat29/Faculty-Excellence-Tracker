import mongoose from "mongoose";

const studentAcademicPerformanceSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty", // Reference to Faculty model
    },
    academic_year: {
      type: String, // Academic year (e.g., "2023-2024")
      required: true,
    },
    faculty_name: {
      type: String, // Name of the faculty member
      required: true,
    },

    // Performance Parameters
    performance_parameters: [
      {
        parameter_name: {
          type: String,
          required: true,
        },
        benchmark: {
          type: Number,
          required: true,
        },
        subjects: [
          {
            subject_name: {
              type: String,
              required: true,
            },
            pass_percentage: {
              type: Number,
              required: true,
            },
            average_marks: {
              type: Number,
              required: true,
            },
            num_students_above_75_percent: {
              type: Number,
              required: true,
            },
            raw_score: {
              type: Number,
              required: true,
            },
            weight: {
              type: Number,
              required: true,
            },
            weighted_score: {
              type: Number,
              required: true,
            },
          },
        ],
        total_weighted_score: {
          type: Number, // Total weighted score for this performance parameter
          required: true,
        },
      },
    ],

    total_score: {
      type: Number, // Total score out of 100
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "StudentAcademicPerformance",
  studentAcademicPerformanceSchema
);
