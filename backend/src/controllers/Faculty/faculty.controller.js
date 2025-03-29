import Faculty from "../../models/Faculty/faculty.model.js"; // Importing Faculty model
import { RegistrationToken } from "../../models/Faculty/registrationToken.model.js";
import { formattedResponse } from "../../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import { registerUserLogic } from "../user.controller.js";

const addFacultyDetails = async (data) => {
  const { token, name, email, password } = data;
  try {
    // Step 1: Validate the token
    const registrationToken = await RegistrationToken.findOne({ token });
    consoleTerminal("Registration Token :: ", registrationToken);

    if (
      !registrationToken ||
      registrationToken.expiry < Date.now() ||
      registrationToken.used
    ) {
      return formattedResponse(
        400,
        null,
        "Invalid or expired registration link"
      );
    }

    // Step 2: Create a new faculty account
    const dataToSend = { fullName: name, email, password, role: "faculty" };

    const registerFaculty = await registerUserLogic(dataToSend);
    consoleTerminal("Register Faculty :: ", registerFaculty);

    if (registerFaculty.status !== 201) {
      return formattedResponse(400, null, "Error adding faculty details");
    }

    // Step 3: Mark the token as used to prevent re-registration
    await RegistrationToken.updateOne({ token }, { $set: { used: true } });

    return formattedResponse(201, null, "Faculty details added successfully");
  } catch (error) {
    consoleTerminal("Error adding faculty details:", error);
    return formattedResponse(500, null, "Error adding faculty details");
  }
};

// New API: Fetch Faculty Details
const fetchFacultyDetails = async (userId) => {
  try {
    const faculty = await Faculty.findById(userId).populate('user university_id session_id college_id department_id'); 
    
    if (!faculty) {
      return formattedResponse(404, null, "Faculty details not found");
    }

    // Create a filtered response object
    const filteredResponse = {
      _id: faculty._id,
      name: faculty.name,
      email: faculty.email,
      employee_code: faculty.employee_code,
      avatar: faculty.avatar,
      university_id: faculty.university_id,
      session_id: faculty.session_id,
      college_id: faculty.college_id,
      department_id: faculty.department_id,
      designation: faculty.designation,
      joining_date: faculty.joining_date,
      teaching_experience_years: faculty.teaching_experience_years,
      appraisal_score: faculty.appraisal_score,
      last_appraisal_date: faculty.last_appraisal_date,
      createdAt: faculty.createdAt,
      updatedAt: faculty.updatedAt,
    };

    console.log("Faculty Details:", filteredResponse); // Log all parameters
    return formattedResponse(200, filteredResponse, "Faculty details fetched successfully");
  } catch (error) {
    consoleTerminal("Error fetching faculty details:", error);
    return formattedResponse(500, null, "Error fetching faculty details");
  }
};

// New API: Update Faculty Profile
const updateFacultyProfile = async (userId, { name, email }) => {
  try {
    // Find the faculty details for the logged-in user
    const faculty = await Faculty.findById(userId); // Fetching from Faculty model
    if (!faculty) {
      return formattedResponse(404, null, "Faculty details not found");
    }

    // Prepare the fields to update
    const updateFields = {};

    // If a new name is provided, update the name
    if (name) {
      updateFields.fullName = name;
    }

    // If a new email is provided, update the email
    if (email) {
      updateFields.email = email;
    }

    // Step 3: Update the faculty profile with the new details
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ); // Fetching from Faculty model

    if (!updatedFaculty) {
      return formattedResponse(400, null, "Error updating faculty details");
    }

    return formattedResponse(
      200,
      updatedFaculty,
      "Faculty details updated successfully"
    );
  } catch (error) {
    consoleTerminal("Error updating faculty profile:", error);
    return formattedResponse(500, null, "Error updating faculty profile");
  }
};

// New API: Update Faculty Avatar
const updateFacultyAvatar = async (userId, newAvatarLocalPath) => {
  try {
    // Upload the new avatar to Cloudinary
    const newAvatar = await uploadOnCloudinary(newAvatarLocalPath);
    if (!newAvatar.url) {
      return formattedResponse(
        400,
        null,
        "Error uploading avatar to Cloudinary"
      );
    }

    // Find the faculty details in the Faculty table
    const faculty = await Faculty.findById(userId); // Fetching from Faculty model
    if (!faculty) {
      return formattedResponse(404, null, "Faculty details not found");
    }

    // If faculty already has an avatar, delete it from Cloudinary
    let responseOfDelete = "ok";
    if (faculty.avatar) {
      const avatarPublicId = faculty.avatar.split("/").pop()?.split(".")[0];
      responseOfDelete = await deleteFromCloudinary(avatarPublicId);
    }

    // If deletion failed, return an error
    if (responseOfDelete !== "ok") {
      return formattedResponse(
        400,
        null,
        "Error deleting avatar from Cloudinary"
      );
    }

    // Update the faculty's avatar in the Faculty table
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      userId,
      { $set: { avatar: newAvatar.url } },
      { new: true }
    );

    if (!updatedFaculty) {
      return formattedResponse(400, null, "Error updating faculty avatar");
    }

    return formattedResponse(200, null, "Faculty avatar updated successfully");
  } catch (error) {
    consoleTerminal("Error updating faculty avatar:", error);
    return formattedResponse(500, null, "Error updating faculty avatar");
  }
};

export { addFacultyDetails, fetchFacultyDetails, updateFacultyProfile, updateFacultyAvatar };
