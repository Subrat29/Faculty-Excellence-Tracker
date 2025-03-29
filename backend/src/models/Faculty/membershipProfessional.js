import mongoose from "mongoose";

const ProfessionalMembership = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  mc_member_year: {
    // startDate
    type: String,
  },
  mc_name: {
    // organizationName
    type: String,
  },
  mc_designation: {
    // roleTitle
    type: String,
  },
  mc_region: {
    // organizationRegion
    type: String,
  },
  mc_url: {
    // url
    type: String,
  },
});

export default mongoose.model("ProfessionalMembership", ProfessionalMembership);
