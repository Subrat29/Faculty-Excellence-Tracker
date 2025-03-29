import { Router } from "express";
import {
  addCollegeAdminDetails,
  addDepartmentAdminDetails,
  fetchAdminProfile,
  generateRegistrationLink,
  registerUniversityAdmin,
  updateAdminAvatar,
  updateAdminProfile,
} from "../../controllers/Admin/admin.controller.js";
import { ValidateToken, VerifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
const router = Router();

// Update Admin Avatar
router.put(
  "/updateAdminAvatar",
  VerifyJWT,
  upload.single("avatar"),
  asyncHandler(async (req, res) => {
    try {
      const { user } = req;
      consoleTerminal("User:", user);
      const newAvatarLocalPath = req.file?.path;
      consoleTerminal("New Avatar Local Path:", newAvatarLocalPath);

      if (!newAvatarLocalPath) {
        return sendResponse(res, 400, null, "Avatar file is required");
      }

      const result = await updateAdminAvatar(user._id, newAvatarLocalPath);

      // If update was successful
      if (result.status === 200) {
        return sendResponse(res, 200, result.data, result.message);
      } else {
        return sendResponse(res, result.status, null, result.message);
      }
    } catch (error) {
      consoleTerminal("Error updating admin avatar:", error);
      return sendResponse(res, 500, null, "Error updating admin avatar");
    }
  })
);

// Fetch Admin Profile
router.get(
  "/getAdminDetails",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { user } = req;

      // Call the function to handle fetching the admin profile
      const result = await fetchAdminProfile(user._id);

      // Send the response based on the result from the logic
      if (result.status === 200) {
        return sendResponse(res, 200, result.data, result.message);
      } else {
        return sendResponse(res, result.status, null, result.message);
      }
    } catch (error) {
      consoleTerminal("Error fetching admin details:", error);
      return sendResponse(res, 500, null, "Error fetching admin details");
    }
  })
);

// Update Admin Profile
router.put(
  "/updateAdminProfile",
  VerifyJWT,
  upload.single("avatar"),
  asyncHandler(async (req, res) => {
    try {
      const { user } = req;
      const { name, email } = req.body;
      const avatar = req.file?.path;

      // Ensure at least one of the fields (name, email, or avatar) is provided
      if (![name, email, avatar].some(Boolean)) {
        return sendResponse(
          res,
          400,
          null,
          "At least one field (name, email, avatar) is required for update."
        );
      }

      // Call the function to handle updating the admin profile
      const result = await updateAdminProfile(user._id, {
        name,
        email,
        avatar,
      });

      // Send the response based on the result from the logic
      if (result.status === 200) {
        return sendResponse(
          res,
          200,
          null,
          "Admin Profile Updated Sucessfully"
        );
      } else {
        return sendResponse(res, 400, null, "Error updating admin details");
      }
    } catch (error) {
      consoleTerminal("Error updating admin profile:", error);
      return sendResponse(res, 500, null, "Error updating admin details");
    }
  })
);

// Generate Registration Link (Generic for different roles)
router.post(
  "/generateRegistrationLink",
  ValidateToken,
  asyncHandler(async (req, res) => {
    try {
      const { email, role } = req.body;

      if (!email || !role) {
        return sendResponse(res, 400, null, "Email and Role are required");
      }

      // Call the function to handle generating the registration link
      const result = await generateRegistrationLink(email, role);
      consoleTerminal("Result :: ", result);

      if (result.status !== 200) {
        return sendResponse(
          res,
          400,
          null,
          "Error generating registration link :: " + result.message
        );
      }

      // Send the response based on the result from the logic
      return sendResponse(res, 200, null, result.message);
    } catch (error) {
      consoleTerminal("Error generating registration link:", error);
      return sendResponse(res, 500, null, "Error generating registration link");
    }
  })
);

// Register College Admin
router.post(
  "/register/collegeadmin",
  asyncHandler(async (req, res) => {
    const data = req.body;
    consoleTerminal("Token :: ", data.token);
    consoleTerminal("Name :: ", data.name);
    consoleTerminal("Email && Password :: ", data.email, data.password);

    try {
      // Call the function to handle college admin registration
      const AddCollegeAdminResult = await addCollegeAdminDetails(data);
      consoleTerminal("AddCollegeAdminResult :: ", AddCollegeAdminResult);

      // Check if the registration was successful
      if (AddCollegeAdminResult.status !== 201) {
        if (AddCollegeAdminResult.status === 400) {
          return sendResponse(
            res,
            400,
            null,
            "Invalid or expired registration link"
          );
        } else {
          return sendResponse(
            res,
            400,
            null,
            "Error adding college admin details"
          );
        }
      }

      // Respond with a success message
      return sendResponse(
        res,
        201,
        null,
        "College Admin details added successfully"
      );
    } catch (error) {
      consoleTerminal(error);
      sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

// Register Department Admin
router.post(
  "/register/departmentadmin",
  asyncHandler(async (req, res) => {
    const data = req.body;
    consoleTerminal("Token :: ", data.token);
    consoleTerminal("Name :: ", data.name);
    consoleTerminal("Email && Password :: ", data.email, data.password);

    try {
      // Call the function to handle department admin registration
      const AddDepartmentAdminResult = await addDepartmentAdminDetails(data);
      consoleTerminal("AddDepartmentAdminResult :: ", AddDepartmentAdminResult);

      // Check if the registration was successful
      if (AddDepartmentAdminResult.status !== 201) {
        if (AddDepartmentAdminResult.status === 400) {
          return sendResponse(
            res,
            400,
            null,
            "Invalid or expired registration link"
          );
        } else {
          return sendResponse(
            res,
            400,
            null,
            "Error adding department admin details"
          );
        }
      }

      // Respond with a success message
      return sendResponse(
        res,
        201,
        null,
        "Department Admin details added successfully"
      );
    } catch (error) {
      consoleTerminal(error);
      sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

// Register University Admin
router.post(
  "/register/universityAdmin",
  asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      consoleTerminal("Email :: ", email);

      const response = await registerUniversityAdmin(email);

      if (response.status !== 201) {
        return sendResponse(
          res,
          400,
          null,
          "Error in adding University Admin !"
        );
      }

      return sendResponse(
        res,
        201,
        null,
        "University Admin added Successfully !"
      );
    } catch (error) {
      consoleTerminal("Error in Adding University Admin :: ", error);
      return sendResponse(res, 500, null, "Internal Server Error!");
    }
  })
);

export default router;
