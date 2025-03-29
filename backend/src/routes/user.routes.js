import { Router } from "express";
import {
  changeCurrentPassword,
  loginUserLogic,
  logoutUser,
} from "../controllers/user.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUserLogic } from "../controllers/user.controller.js";
import consoleTerminal from "../utils/consoleTerminal.js";
import { formattedResponse, sendResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};

const router = Router();

// Register Route
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      // Destructure data from request body
      const { fullName, email, password, role } = req.body;

      // Prepare data object
      const data = { fullName, email, password, role };

      // Call the function to handle user registration logic
      const result = await registerUserLogic(data);

      // If registration was successful
      if (result.status === 201) {
        return sendResponse(
          res,
          200,
          result.data,
          "User registration successful"
        );
      } else {
        return sendResponse(
          res,
          400,
          null,
          "User registration failed :: " + result.message
        );
      }
    } catch (error) {
      consoleTerminal("Error registering user:", error);
      return sendResponse(res, 500, null, "Error in "); // General error handling
    }
  })
);

// Login Route
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      // Destructure data from request body
      const data = req.body;

      // Call the function to handle user login logic
      const result = await loginUserLogic(data);

      // If login was successful
      if (result.status === 200) {
        return res
          .status(200)
          .cookie("accessToken", result.data.accessToken, options)
          .cookie("refreshToken", result.data.refreshToken, options)
          .json({
            status: result.status,
            message: result.message,
            data: result.data,
          });
      } else {
        return sendResponse(res, result.status, null, result.message);
      }
    } catch (error) {
      consoleTerminal("Error logging in user:", error);
      return sendResponse(res, 500, null, "Error logging in user");
    }
  })
);

// Logout Route
router.post(
  "/logout",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      // Call the function to handle user logout logic
      const result = await logoutUser(req.user._id);

      // If logout was successful
      if (result.status === 200) {
        return res
          .status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json({
            status: result.status,
            message: result.message,
          });
      } else {
        return sendResponse(res, result.status, null, result.message);
      }
    } catch (error) {
      consoleTerminal("Error logging out user:", error);
      return sendResponse(res, 500, null, "Error logging out user");
    }
  })
);

// Change Password route
router.post(
  "/changePassword",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user._id;

      const response = await changeCurrentPassword(
        userId,
        oldPassword,
        newPassword
      );

      if (response.data !== 200) {
        return sendResponse(res, response.status, null, response.message);
      }

      return sendResponse(res, 200, null, "Password Updated Successfully");
    } catch (error) {
      consoleTerminal("Error in updating Password :: ", error);
      return sendResponse(res, 500, null, "Internal Server Error");
    }
  })
);

export default router;
