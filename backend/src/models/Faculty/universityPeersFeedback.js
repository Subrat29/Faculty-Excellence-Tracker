import mongoose from "mongoose";

const universityPeersFeedbackSchema = new mongoose.Schema({
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
  num_peer_group_members: {
    type: Number,
    required: true,
  },

  feedback_attributes: [
    {
      attribute_name: {
        type: String,
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
    type: Number,
    required: true,
  },

  total_score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "UniversityPeersFeedback",
  universityPeersFeedbackSchema
);
