import mongoose from "mongoose";

const StudentFeedbackSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    subject_class_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    // Attendance Enum (can be one of the values)
    attendance: {
      type: String,
      enum: [
        "Less than 60%",
        "Between 60-70%",
        "Between 70-80%",
        "More than 80%",
      ],
      required: true,
    },

    attendance_reason: {
      type: String,
      required: false,
    },

    suggestions_for_improvement: {
      type: String,
      required: false,
    },

    tutorials_feedback: {
      type: String,
      required: true,
    },

    teacher_feedback: [
      {
        question: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          enum: [5, 4, 3, 2, 1], // Score options: Mostly (5), Quite often (4), At times (3), Hardly (2), Never (1)
          required: true,
        },
      },
    ],

    total_score: {
      type: Number,
      required: true,
    },

    aggregate_score_percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentFeedback", StudentFeedbackSchema);
