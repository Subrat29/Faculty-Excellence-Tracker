import PeerFeedback from "../../models/Faculty/peerReview.js";
import { formattedResponse } from "../../utils/ApiResponse.js"; // Adjust the import path as necessary
import consoleTerminal from "../../utils/consoleTerminal.js";

export const addPeerFeedback = async (req, res) => {
  try {
    const peerFeedbackData = req.body; // Get the peer feedback data from the request
    console.log("Received Peer Feedback Data :: ", peerFeedbackData);

    // Map the incoming data to match the PeerFeedback schema fields
    const newPeerFeedbackData = peerFeedbackData["peer reviews"]?.map(
      (feedback, index) => {
        console.log(`Peer Feedback Data at index ${index}:`, feedback); // Debugging log
        return {
          faculty_id: feedback.faculty_id,
          reviewGroupId: feedback.reviewGroupId || "",
          reviewerRole: feedback.reviewerRole || "",
          completionYear: feedback.completionYear || "",
          reviewType: feedback.reviewType || "",
          reviewUrl: feedback.reviewUrl || "N/A",
          sourceName: feedback.sourceName || "",
          organizationName: feedback.organizationName || "",
          organizationCity: feedback.organizationCity || "",
          organizationRegion: feedback.organizationRegion || "",
          organizationCountry: feedback.organizationCountry || "",
        };
      }
    );

    // Check for missing required fields
    newPeerFeedbackData.forEach((feedback, index) => {
      if (
        !feedback.reviewGroupId ||
        !feedback.reviewerRole ||
        !feedback.sourceName ||
        !feedback.organizationName
      ) {
        console.error(
          `Missing required fields in feedback at index ${index}:`,
          feedback
        );
      }
    });

    // Process each feedback and check if it exists in the database
    const promises = newPeerFeedbackData.map(async (newFeedback) => {
      try {
        const existingFeedback = await PeerFeedback.findOne({
          reviewGroupId: newFeedback.reviewGroupId,
          sourceName: newFeedback.sourceName,
        });

        if (existingFeedback) {
          const updatedFeedback = await PeerFeedback.findByIdAndUpdate(
            existingFeedback._id,
            { $set: newFeedback },
            { new: true }
          );
          return { status: "fulfilled", feedback: updatedFeedback };
        } else {
          const createdFeedback = new PeerFeedback(newFeedback);
          await createdFeedback.save();
          return { status: "fulfilled", feedback: createdFeedback };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and handle successful and failed operations
    const successfulFeedbacks = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.feedback);
    const failedFeedbacks = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Handle failed feedbacks if needed
    if (failedFeedbacks.length > 0) {
      console.error(
        "Failed to process the following peer feedbacks:",
        failedFeedbacks
      );
    }

    return formattedResponse(
      200,
      successfulFeedbacks,
      "Peer feedback(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding peer feedback:", error);
    return formattedResponse(500, null, "Error adding peer feedback");
  }
};

export const getAllPeerFeedback = async (faculty_id) => {
  try {
    const peerFeedbacks = await PeerFeedback.find({ faculty_id });
    return formattedResponse(
      200,
      peerFeedbacks,
      "Peer feedbacks fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching peer feedbacks:", error);
    return formattedResponse(500, null, "Error fetching peer feedbacks");
  }
};
