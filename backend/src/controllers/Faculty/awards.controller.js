import Awards from "../../models/Faculty/awards.js";
import { formattedResponse } from "../../utils/ApiResponse.js";

export const addAward = async (req, res) => {
  try {
    const awardData = req.body;
    console.log("Award Data :: ", awardData);

    // Ensure the correct key is accessed
    const newAwards = awardData.distinctions.map((award) => ({
      faculty_id: award.faculty_id,
      title: award.roleTitle || "",
      awarding_body: award.organizationName || "",
      date: award.startDate || "",
      description: award.departmentName || "",
      url: award.url || "",
    }));

    // Process each award using Promise.allSettled
    const promises = newAwards.map(async (award) => {
      try {
        // Check if the award already exists for the given faculty and title
        const existingAward = await Awards.findOne({
          faculty_id: award.faculty_id,
          title: award.title,
        });

        if (existingAward) {
          // If the award exists, update it
          const updatedAward = await Awards.findByIdAndUpdate(
            existingAward._id,
            { $set: award },
            { new: true }
          );
          return { status: "fulfilled", award: updatedAward };
        } else {
          // If the award doesn't exist, create a new one
          const newAward = new Awards(award);
          await newAward.save();
          return { status: "fulfilled", award: newAward };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and categorize successful and failed operations
    const successfulAwards = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const failedAwards = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Log or handle errors from failed awards
    if (failedAwards.length > 0) {
      console.error("Failed to process the following awards:", failedAwards);
    }

    // Respond with success or failure
    return formattedResponse(
      201,
      successfulAwards.map((result) => result.award),
      "Award(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding award:", error);
    return formattedResponse(500, null, "Error adding award");
  }
};

export const updateAward = async (req, res) => {
  try {
    const { id, awardData } = req.body;
    const updatedAward = await Awards.findByIdAndUpdate(id, awardData, {
      new: true,
    });

    if (!updatedAward) {
      return formattedResponse(404, null, "Award not found");
    }

    return formattedResponse(200, updatedAward, "Award updated successfully");
  } catch (error) {
    return formattedResponse(400, null, "Error updating award");
  }
};

export const fetchAwards = async (faculty_id) => {
  try {
    const awards = await Awards.find({ faculty_id });
    return formattedResponse(200, awards, "Awards fetched successfully");
  } catch (error) {
    return formattedResponse(400, null, "Error fetching awards");
  }
};
