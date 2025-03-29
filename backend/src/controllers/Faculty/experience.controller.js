import Experience from "../../models/Faculty/experience.js";
import { formattedResponse } from "../../utils/ApiResponse.js";

export const addExperience = async (req, res) => {
  try {
    const experienceData = req.body;
    console.log("Experience Data :: ", experienceData);

    // Ensure the correct key is accessed
    const newExperiences = experienceData.employment.map((experience) => ({
      faculty_id: experience.faculty_id,
      departmentName: experience.departmentName || "",
      endDate: experience.endDate || "",
      startDate: experience.startDate || "",
      organizationName: experience.organizationName || "",
      organizationId: experience.organizationId || "",
      roleTitle: experience.roleTitle || "",
    }));

    // Process each experience using Promise.allSettled
    const promises = newExperiences.map(async (experience) => {
      try {
        // Check if the experience already exists for the given faculty and organization
        const existingExperience = await Experience.findOne({
          faculty_id: experience.faculty_id,
          organizationId: experience.organizationId,
        });

        if (existingExperience) {
          // If the experience exists, update it
          const updatedExperience = await Experience.findByIdAndUpdate(
            existingExperience._id,
            { $set: experience },
            { new: true }
          );
          return { status: "fulfilled", experience: updatedExperience };
        } else {
          // If the experience doesn't exist, create a new one
          const newExperience = new Experience(experience);
          await newExperience.save();
          return { status: "fulfilled", experience: newExperience };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and categorize successful and failed operations
    const successfulExperiences = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const failedExperiences = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Log or handle errors from failed experiences
    if (failedExperiences.length > 0) {
      console.error(
        "Failed to process the following experiences:",
        failedExperiences
      );
    }

    // Respond with success or failure
    return formattedResponse(
      201,
      successfulExperiences.map((result) => result.experience),
      "Experience(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding experience:", error);
    return formattedResponse(500, null, "Error adding experience");
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id, experienceData } = req.body;
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      experienceData,
      { new: true }
    );

    if (!updatedExperience) {
      return formattedResponse(404, null, "Experience not found");
    }

    return formattedResponse(
      200,
      updatedExperience,
      "Experience updated successfully"
    );
  } catch (error) {
    return formattedResponse(400, null, "Error updating experience");
  }
};

export const getAllExperience = async (faculty_id) => {
  try {
    const experiences = await Experience.find({ faculty_id });

    return formattedResponse(
      200,
      experiences,
      "Experiences fetched successfully"
    );
  } catch (error) {
    return formattedResponse(500, null, "Error fetching experiences");
  }
};
