import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  departmentName: {
    type: String,
  },
  endDate: {
    type: String,
  },
  startDate: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  organizationId: {
    type: String,
  },
  roleTitle: {
    type: String,
  },
});

export default mongoose.model("Experience", experienceSchema);
