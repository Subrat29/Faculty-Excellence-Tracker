import { Router } from "express";
import {
  addProfessionalMembership,
  getAllProfessionalMemberships,
  updateMembershipProfessional,
} from "../../controllers/Faculty/membershipProfessional.controller.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import consoleTerminal from "../../utils/consoleTerminal.js";
import { VerifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// Create a new membership professional
router.post("/import", VerifyJWT, async (req, res) => {
  try {
    const result = await addProfessionalMembership(req, res);
    consoleTerminal("result", result.data);
    return sendResponse(
      res,
      201,
      result.data,
      "Membership professional added successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// Update a membership professional
router.put("/update", async (req, res) => {
  try {
    const result = await updateMembershipProfessional(req, res);
    return sendResponse(
      res,
      200,
      result,
      "Membership professional updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
});

// fetch all membership professional from the database based on faculty_id
router.get(
  "/fetch/:faculty_id",
  VerifyJWT,
  asyncHandler(async (req, res) => {
    try {
      const { faculty_id } = req.params;

      const result = await getAllProfessionalMemberships(faculty_id);

      if (result.status !== 200) {
        return sendResponse(res, result.status, result.data, result.message);
      }

      return sendResponse(
        res,
        200,
        result.data,
        "Membership professional fetched successfully"
      );
    } catch (error) {
      return sendResponse(res, 500, null, error.message);
    }
  })
);

export default router;
