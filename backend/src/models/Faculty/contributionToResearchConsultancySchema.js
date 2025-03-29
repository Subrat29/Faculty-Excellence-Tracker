import mongoose from "mongoose";

const contributionToResearchConsultancySchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty", // Reference to Faculty model
    },
    academic_year: {
      type: String, // Academic year (e.g., 2023-2024)
      required: true,
    },

    // Part A: Academic Activities
    academic_activities: [
      {
        activity: {
          type: String, // Activity description
          required: true,
        },
        max_marks: {
          type: Number, // Maximum marks for the activity
          required: true,
        },
        scoreByFaculty: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByHOD: {
          type: Number, // Score awarded by the HOD
        },
        remarksByHOD: {
          type: String, // Remarks by the HOD
        },
        total_score_by_faculty: {
          type: Number, // Activity-specific total score
          required: true,
        },
        total_score_by_HOD: {
          type: Number, // Activity-specific total score
          required: true,
        },
        benchmark: {
          type: Number, // Activity-specific benchmark score
          required: true,
        },
        relative_percentage_achievement: {
          type: Number, // (Total Score / Benchmark) * 100 for each activity
          required: true,
        },
      },
    ],

    // Part B: Research and Consultancy Related Activities
    research_consultancy_activities: [
      {
        activity: {
          type: String, // Research or Consultancy activity description
          required: true,
        },
        max_marks: {
          type: Number, // Maximum marks for the activity
          required: true,
        },
        score: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByFaculty: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByHOD: {
          type: Number, // Score awarded by the HOD
        },
        remarksByHOD: {
          type: String, // Remarks by the HOD
        },
        total_score_by_faculty: {
          type: Number, // Activity-specific total score
          required: true,
        },
        total_score_by_HOD: {
          type: Number, // Activity-specific total score
          required: true,
        },
        benchmark: {
          type: Number, // Activity-specific benchmark score
          required: true,
        },
        relative_percentage_achievement: {
          type: Number, // (Total Score / Benchmark) * 100 for each activity
          required: true,
        },
      },
    ],

    // Part C: Administration Activities
    administration_activities: [
      {
        activity: {
          type: String, // Administrative activity description
          required: true,
        },
        max_marks: {
          type: Number, // Maximum marks for the activity
          required: true,
        },
        score: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByFaculty: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByHOD: {
          type: Number, // Score awarded by the HOD
        },
        remarksByHOD: {
          type: String, // Remarks by the HOD
        },
        total_score_by_faculty: {
          type: Number, // Activity-specific total score
          required: true,
        },
        total_score_by_HOD: {
          type: Number, // Activity-specific total score
          required: true,
        },
        benchmark: {
          type: Number, // Activity-specific benchmark score
          required: true,
        },
        relative_percentage_achievement: {
          type: Number, // (Total Score / Benchmark) * 100 for each activity
          required: true,
        },
      },
    ],

    // Part D: Competence Building Efforts
    competence_building_activities: [
      {
        activity: {
          type: String, // Competence building activity description
          required: true,
        },
        max_marks: {
          type: Number, // Maximum marks for the activity
          required: true,
        },
        score: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByFaculty: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByHOD: {
          type: Number, // Score awarded by the HOD
        },
        remarksByHOD: {
          type: String, // Remarks by the HOD
        },
        total_score_by_faculty: {
          type: Number, // Activity-specific total score
          required: true,
        },
        total_score_by_HOD: {
          type: Number, // Activity-specific total score
          required: true,
        },
        benchmark: {
          type: Number, // Activity-specific benchmark score
          required: true,
        },
        relative_percentage_achievement: {
          type: Number, // (Total Score / Benchmark) * 100 for each activity
          required: true,
        },
      },
    ],

    // Part E: Extension Services
    extension_services_activities: [
      {
        activity: {
          type: String, // Extension service activity description
          required: true,
        },
        max_marks: {
          type: Number, // Maximum marks for the activity
          required: true,
        },
        score: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByFaculty: {
          type: Number, // Score awarded by the HOD
          required: true,
        },
        scoreByHOD: {
          type: Number, // Score awarded by the HOD
        },
        remarksByHOD: {
          type: String, // Remarks by the HOD
        },
        total_score_by_faculty: {
          type: Number, // Activity-specific total score
          required: true,
        },
        total_score_by_HOD: {
          type: Number, // Activity-specific total score
          required: true,
        },
        benchmark: {
          type: Number, // Activity-specific benchmark score
          required: true,
        },
        relative_percentage_achievement: {
          type: Number, // (Total Score / Benchmark) * 100 for each activity
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContributionToResearchConsultancy",
  contributionToResearchConsultancySchema
);
