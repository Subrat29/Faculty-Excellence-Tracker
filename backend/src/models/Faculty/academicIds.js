import mongoose from "mongoose";

const academicIdSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  orcid: {
    type: String,
  },
  scopus: {
    type: String,
  },
  researcher: {
    type: String,
  },
  google_scholar: {
    type: String,
  },
});

export default mongoose.model("AcademicIds", academicIdSchema);
