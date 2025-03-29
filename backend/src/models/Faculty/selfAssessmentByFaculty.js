import mongoose from "mongoose";

const selfAssessmentSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    academic_year: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    allocated_load: {
      lectures: {
        type: Number,
        required: true,
      },
      tutorials: {
        type: Number,
        default: 0,
        required: true,
      },
      practicals: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    lecture_details: {
      scheduled: {
        type: Number,
        required: true,
        default: 0,
      },
      taken: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    tutorial_details: {
      scheduled: {
        type: Number,
        required: true,
        default: 0,
      },
      taken: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    class_details: {
      number_of_students: {
        type: Number,
        required: true,
      },
      average_attendance_percentage: {
        type: Number,
        required: true,
      },
    },
    faculty_responses: {
      teaching_subject_for_first_time: {
        type: Boolean,
        description:
          "Whether the faculty is teaching the subject for the first time",
        required: true,
      },
      subject_in_specialization: {
        type: Boolean,
        description:
          "Whether the subject is in the faculty's area of specialization",
        required: true,
      },
      student_enthusiasm: {
        type: Boolean,
        description: "Whether students showed enthusiasm for the subject",
        required: true,
      },
      more_than_five_tutorials: {
        type: Boolean,
        description: "Whether more than five tutorials were taken",
        required: true,
      },
      evaluation_results_discussed: {
        type: Boolean,
        description: "Whether evaluation results were discussed with students",
        required: true,
      },
      use_of_audio_visual_aids: {
        type: Boolean,
        description: "Whether audio-visual aids were used in teaching",
        required: true,
      },
      dictated_notes_more_than_25_percent: {
        type: Boolean,
        description: "Whether dictated notes were more than 25% of the content",
        required: true,
      },
      question_bank_given: {
        type: Boolean,
        description: "Whether a question bank was provided to the students",
        required: true,
      },
      course_file_prepared: {
        type: Boolean,
        description: "Whether the course file was prepared",
        required: true,
      },
      more_than_90_percent_classes_taken: {
        type: Boolean,
        description: "Whether more than 90% of classes were taken",
        required: true,
      },
      students_interactive: {
        type: Boolean,
        description: "Whether students were interactive in class",
        required: true,
      },
      satisfaction_with_teaching: {
        type: Boolean,
        description: "Whether the faculty was satisfied with their teaching",
        required: true,
      },
      extra_classes_for_weak_students: {
        type: Boolean,
        description: "Whether extra classes were taken for weak students",
        required: true,
      },
      faculty_suggestions: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SelfAssessmentByFaculty",
  selfAssessmentSchema
);
