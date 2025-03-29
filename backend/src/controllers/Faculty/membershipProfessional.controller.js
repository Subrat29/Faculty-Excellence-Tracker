import { formattedResponse } from "../../utils/ApiResponse.js";

import ProfessionalMembership from "../../models/Faculty/membershipProfessional.js";
import consoleTerminal from "../../utils/consoleTerminal.js";

export const addProfessionalMembership = async (req, res) => {
  try {
    const mcData = req.body; // Get the membership committee data from the request
    console.log("Received Membership Data :: ", mcData);

    // Map the incoming data to match the schema fields
    const newMCData = mcData.memberships.map((membership, index) => {
      console.log(`Membership Data at index ${index}:`, membership); // Debugging log
      return {
        faculty_id: membership.faculty_id,
        mc_member_year: membership.startDate || "",
        mc_name: membership.organizationName || "",
        mc_designation: membership.roleTitle || "",
        mc_region: membership.organizationRegion || "",
        mc_url: membership.url || "",
      };
    });

    // Check for missing required fields
    newMCData.forEach((membership, index) => {
      if (
        !membership.faculty_id ||
        !membership.mc_name ||
        !membership.mc_designation
      ) {
        console.error(
          `Missing required fields in membership at index ${index}:`,
          membership
        );
      }
    });

    // Process each membership data and check if it exists in the database
    const promises = newMCData.map(async (newMC) => {
      try {
        const existingMC = await ProfessionalMembership.findOne({
          faculty_id: newMC.faculty_id,
          mc_name: newMC.mc_name,
        });

        if (existingMC) {
          const updatedMC = await ProfessionalMembership.findByIdAndUpdate(
            existingMC._id,
            { $set: newMC },
            { new: true }
          );
          return { status: "fulfilled", experience: updatedMC };
        } else {
          const createdMC = new ProfessionalMembership(newMC);
          await createdMC.save();
          return { status: "fulfilled", experience: createdMC };
        }
      } catch (error) {
        return { status: "rejected", error: error.message };
      }
    });

    // Wait for all promises to settle
    const results = await Promise.allSettled(promises);

    // Process results and handle successful and failed operations
    const successfulMCs = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.experience);
    const failedMCs = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    // Handle failed memberships if needed
    if (failedMCs.length > 0) {
      console.error("Failed to process the following memberships:", failedMCs);
    }

    return formattedResponse(
      200,
      successfulMCs,
      "Membership committee(s) added/updated successfully"
    );
  } catch (error) {
    console.error("Error adding membership committee:", error);
    return formattedResponse(500, null, "Error adding membership committee");
  }
};

export const updateMembershipProfessional = async (req, res) => {
  try {
    const { id, mpData } = req.body;
    const updatedMP = await MembershipProfessional.findByIdAndUpdate(
      id,
      mpData,
      { new: true }
    );

    if (!updatedMP) {
      return formattedResponse(404, null, "Professional membership not found");
    }

    return formattedResponse(
      200,
      updatedMP,
      "Professional membership updated successfully"
    );
  } catch (error) {
    return formattedResponse(
      400,
      null,
      "Error updating professional membership"
    );
  }
};

export const getAllProfessionalMemberships = async (faculty_id) => {
  try {
    const memberships = await ProfessionalMembership.find({ faculty_id });
    return formattedResponse(
      200,
      memberships,
      "Professional memberships fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching professional memberships:", error);
    return formattedResponse(
      400,
      null,
      "Error fetching professional memberships"
    );
  }
};
