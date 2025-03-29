import mongoose from "mongoose";

const appraisalByHODSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty", // Reference to Faculty model
  },
  date: {
    type: Date, // Date when the appraisal is done
    required: true,
  },
  year: {
    type: String, // Year of the appraisal (e.g., 2023)
    required: true,
  },
  faculty_name: {
    type: String, // Name of the faculty member
    required: true,
  },
  designation: {
    type: String, // Designation of the faculty member
    required: true,
  },
  department: {
    type: String, // Department of the faculty member
    required: true,
  },

  // Part A: Performance Assessment
  performance_assessment: {
    academic: {
      raw_score: {
        type: Number, // Raw score on a 5-point scale (e.g., 5)
        required: true,
      },
      weight: {
        type: Number, // Weight of the experience (e.g., 0.2)
        required: true,
      },
      weighted_score: {
        type: Number, // Weighted score calculated as raw_score * weight
        required: true,
      },
    },
    research_and_consultancy: {
      raw_score: {
        type: Number, // Raw score on a 5-point scale
        required: true,
      },
      weight: {
        type: Number, // Weight of the experience
        required: true,
      },
      weighted_score: {
        type: Number, // Weighted score
        required: true,
      },
    },
    administration: {
      raw_score: {
        type: Number, // Raw score on a 5-point scale
        required: true,
      },
      weight: {
        type: Number, // Weight of the experience
        required: true,
      },
      weighted_score: {
        type: Number, // Weighted score
        required: true,
      },
    },
    competence_building_efforts: {
      raw_score: {
        type: Number, // Raw score on a 5-point scale
        required: true,
      },
      weight: {
        type: Number, // Weight of the experience
        required: true,
      },
      weighted_score: {
        type: Number, // Weighted score
        required: true,
      },
    },
    extension_services: {
      raw_score: {
        type: Number, // Raw score on a 5-point scale
        required: true,
      },
      weight: {
        type: Number, // Weight of the experience
        required: true,
      },
      weighted_score: {
        type: Number, // Weighted score
        required: true,
      },
    },
    total_performance_score: {
      type: Number, // Total score for performance assessment (sum of weighted scores)
      required: true,
    },
  },

  // Part B: Personal Attributes
  personal_attributes: {
    capacity_to_lead: {
      appraisal_score: {
        type: Number, // Appraisal score on a 5-point scale
        required: true,
      },
      suggestions: {
        type: String, // Suggestions for improvement
        required: false,
      },
    },
    amenability_to_discipline: {
      appraisal_score: {
        type: Number, // Appraisal score on a 5-point scale
        required: true,
      },
      suggestions: {
        type: String, // Suggestions for improvement
        required: false,
      },
    },
    perseverance: {
      appraisal_score: {
        type: Number, // Appraisal score on a 5-point scale
        required: true,
      },
      suggestions: {
        type: String, // Suggestions for improvement
        required: false,
      },
    },
    interpersonal_relations: {
      appraisal_score: {
        type: Number, // Appraisal score on a 5-point scale
        required: true,
      },
      suggestions: {
        type: String, // Suggestions for improvement
        required: false,
      },
    },
    integrity: {
      appraisal_score: {
        type: Number, // Appraisal score on a 5-point scale
        required: true,
      },
      suggestions: {
        type: String, // Suggestions for improvement
        required: false,
      },
    },
    total_personal_attributes_score: {
      type: Number, // Total score for personal attributes (sum of individual scores)
      required: true,
    },
  },

  // Grand Total Calculation
  grand_total: {
    type: Number, // Grand total out of 100 (calculated as (Total of A + Total of B) * 10)
    required: true,
  },
});

module.exports = mongoose.model("AppraisalByHOD", appraisalByHODSchema);
