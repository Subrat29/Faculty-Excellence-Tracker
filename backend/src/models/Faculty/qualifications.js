import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    degree: {
      // roleTitle
      type: String,
    },
    institution: {
      // organizationName
      type: String,
    },
    subject: {
      //departmentName
      type: String,
    },
    passing_year: {
      // endDate
      type: String,
    },
    percentage: {
      type: String,
    },
    document_url: {
      type: String,
    },
    start_year: {
      // startDate
      type: String,
    },
    institute_id: {
      // organizationId
      type: String,
    },
    institution_address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Qualification", qualificationSchema);
