import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import {
  addFacultyDetails,
  fetchFacultyDetails,
  updateFacultyProfile,
  updateFacultyAvatar,
} from "../../controllers/Faculty/faculty.controller.js";

const router = Router();

// Route for faculty registration
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const data = req.body;
    consoleTerminal("Token :: ", data.token);
    consoleTerminal("Name :: ", data.name);
    consoleTerminal("Email && Password :: ", data.email, data.password);

    if (!data.token || !data.name || !data.email || !data.password) {
      return sendResponse(res, 400, null, "All fields are required");
    }

    try {
      const addFacultyResult = await addFacultyDetails(data);
      consoleTerminal("AddFacultyResult :: ", addFacultyResult);

      if (addFacultyResult.status !== 201) {
        if (addFacultyResult.status === 400) {
          return sendResponse(
            res,
            400,
            null,
            "Invalid or expired registration link"
          );
        } else {
          return sendResponse(res, 400, null, "Error adding faculty details");
        }
      }

      return sendResponse(res, 201, null, "Faculty details added successfully");
    } catch (error) {
      consoleTerminal(error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

// Route for fetching faculty details
router.get(
  "/details/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
      const facultyResult = await fetchFacultyDetails(userId);
      consoleTerminal("Fetch Faculty Result :: ", facultyResult);
      return sendResponse(res, facultyResult.status, facultyResult.data, facultyResult.message);
    } catch (error) {
      consoleTerminal(error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

// Route for updating faculty profile
router.put(
  "/updateProfile/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      return sendResponse(res, 400, null, "At least one field (name or email) is required");
    }

    try {
      const updateResult = await updateFacultyProfile(userId, { name, email });
      consoleTerminal("Update Faculty Profile Result :: ", updateResult);
      return sendResponse(res, updateResult.status, updateResult.data, updateResult.message);
    } catch (error) {
      consoleTerminal(error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

// Route for updating faculty avatar
router.put(
  "/updateAvatar/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const avatar = req.file; // Assuming you're using multer or similar for file uploads

    if (!avatar) {
      return sendResponse(res, 400, null, "Avatar file is required");
    }

    try {
      const updateAvatarResult = await updateFacultyAvatar(userId, avatar.path);
      consoleTerminal("Update Faculty Avatar Result :: ", updateAvatarResult);
      return sendResponse(res, updateAvatarResult.status, updateAvatarResult.data, updateAvatarResult.message);
    } catch (error) {
      consoleTerminal(error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

export default router;