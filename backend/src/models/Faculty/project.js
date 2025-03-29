import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  project_name: {
    type: String,
  },
  project_start_date: {
    type: String,
  },
  project_end_date: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Proposed", "Ongoing", "Completed"],
  },
  organization_name: {
    type: String,
  },
  organization_city: {
    type: String,
  },
  funding_type: {
    type: String,
  },
  funding_path: {
    type: String,
  },
  funding_amount: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("Projects", projectSchema);
