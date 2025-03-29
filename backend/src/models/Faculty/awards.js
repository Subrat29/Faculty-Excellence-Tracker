import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  title: {
    // roleTitle
    type: String,
  },
  awarding_body: {
    // organizationName
    type: String,
  },
  date: {
    // startDate
    type: String,
  },
  description: {
    // departmentName
    type: String,
  },
  url: {
    //URL
    type: String,
  },
});

export default mongoose.model("Awards", awardSchema);
