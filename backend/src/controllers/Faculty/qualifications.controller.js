import Qualifications from "../../models/Faculty/qualifications.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

export const addQualification = async (req, res) => {
  try {
    const qualificationData = req.body; // Data coming in the request body
    console.log("Qualification Data :: ", qualificationData);

    // Ensure correct key access and transformation for new qualifications
    const newQualifications = qualificationData.qualifications.map(
      (qualification) => ({
        faculty_id: qualification.faculty_id,
        degree: qualification.roleTitle || "",
        institution: qualification.organizationName || "",
        subject: qualification.departmentName || "",
        passing_year: qualification.endDate || "",
        percentage: qualification.percentage || "",
        document_url: qualification.documentUrl || "",
        start_year: qualification.startDate || "",
        institute_id: qualification.organizationId || "",
        institution_address: qualification.organizationAddress || "",
      })
    );

    // Process each qualification using Promise.allSettled to handle asynchronous operations
    const promises = newQualifications.map(async (qualification) => {
      try {
        // Check if the qualification already exists for the given faculty and institution
        const existingQualification = await Qualifications.findOne({
          faculty_id: qualification.faculty_id,
          institute_id: qualification.institute_id,
        });

        if (existingQualification) {
          // If the qualification exists, update it
          const updatedQualification = await Qualifications.findByIdAndUpdate(
            existingQualification._id,
            { $set: qualification },
            { new: true }
          );
          return { status: "fulfilled", qualification: updatedQualification };
        } else {
          // If the qualification doesn't exist, create a new one
          const newQualification = new Qualifications(qualification);
          await newQualification.save();
          return { status: "fulfilled", qualification: newQualification };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and categorize successful and failed operations
    const successfulQualifications = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const failedQualifications = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Log or handle errors from failed qualifications
    if (failedQualifications.length > 0) {
      console.error(
        "Failed to process the following qualifications:",
        failedQualifications
      );
    }

    // Respond with success or failure
    return formattedResponse(
      201,
      successfulQualifications.map((result) => result.qualification),
      "Qualification(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding qualification:", error);
    return formattedResponse(500, null, "Error adding qualification");
  }
};

export const updateQualification = async (req, res) => {
  try {
    const { id, qualificationData } = req.body;
    const updatedQualification = await Qualifications.findByIdAndUpdate(
      id,
      qualificationData,
      { new: true }
    );

    if (!updatedQualification) {
      return formattedResponse(404, null, "Qualification not found");
    }

    return formattedResponse(
      200,
      updatedQualification,
      "Qualification updated successfully"
    );
  } catch (error) {
    return formattedResponse(400, null, "Error updating qualification");
  }
};

// controller to fetch all the details ...!
export const fetchQualifications = async (faculty_id) => {
  try {
    const qualifications = await Qualifications.find({ faculty_id }).sort({
      endDate: -1,
    });

    consoleTerminal("Qualifications :: ", qualifications);

    return formattedResponse(
      200,
      qualifications,
      "Qualifications fetched successfully"
    );
  } catch (error) {
    consoleTerminal("Error in getting Details of Qualifications", error);
    return formattedResponse(
      500,
      null,
      "Error in getting Details of Qualifications"
    );
  }
};
