import mongoose from "mongoose";

// Create a new Schema for Peer Feedback
const peerFeedbackSchema = new mongoose.Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty",
  },
  reviewGroupId: {
    type: String,
  },
  reviewerRole: {
    type: String,
  },
  completionYear: {
    type: String,
  },
  reviewType: {
    type: String,
  },
  reviewUrl: {
    type: String,
    default: "N/A", // If not provided, defaults to 'N/A'
  },
  sourceName: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  organizationCity: {
    type: String,
  },
  organizationRegion: {
    type: String,
  },
  organizationCountry: {
    type: String,
  },
});

// Create the PeerFeedback model
const PeerFeedback = mongoose.model("PeerFeedback", peerFeedbackSchema);
export default PeerFeedback;
